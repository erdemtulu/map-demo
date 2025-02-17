import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../utils/axios-middleware";

const initialState: { errorMsg: string } = { errorMsg: '' }
export const authState = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        logout() {
            localStorage.removeItem('accessToken')
            window.location.href = '/login';
        },

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.errorMsg = ''
            localStorage.setItem('accessToken', action.payload.data.accessToken);
            window.location.href = '/app';
        })
        builder.addCase(login.rejected, (state, action) => {
            state.errorMsg = action.payload as string
        })

    }
})

export const authActions = authState.actions

export const login = createAsyncThunk(
    'login',
    async (userInfo: { username: string, password: string }, { rejectWithValue }) => {
        if (userInfo.username.trim() === '' || userInfo.password.trim() === '')
            return rejectWithValue("Empty credentials")
        try {
            const tokens: AxiosResponse<{ accessToken: string }> = await api.post<{ accessToken: string }>('login', userInfo);
            return tokens
        }
        catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.message)
        }
    }
)




