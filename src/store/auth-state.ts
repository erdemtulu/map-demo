import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { api } from "../utils/axios-middleware";


export const authState = createSlice({
    name: 'authState',
    initialState: {},
    reducers: {
        logout() {
            localStorage.removeItem('accessToken')
            window.location.href = '/login';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem('accessToken', action.payload.data.accessToken);
            window.location.href = '/app';
        })

    }
})

export const authActions = authState.actions

export const login = createAsyncThunk(
    'login',
    async (userInfo: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const tokens: AxiosResponse<{ accessToken: string }> = await api.post<{ accessToken: string }>('login', userInfo);
            return tokens
        }
        catch (error) {
            return rejectWithValue(error)
        }
    }
)




