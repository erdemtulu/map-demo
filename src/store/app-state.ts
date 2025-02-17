import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../utils/axios-middleware";
import { Feature } from "../models/feature.model";
import { Point } from "../models/point.model";

const initialState: { mapData: Point[] } = { mapData: [] }
export const appState = createSlice({
    name: 'appState',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMapData.fulfilled, (state, action) => {
            state.mapData = action.payload.data.features.map((feature) => ({
                position: feature.geometry.coordinates,
                id: feature.properties.id,
                name: feature.properties.name,
            }));
        })

        builder.addCase(getHeavyMapData.fulfilled, (state, action) => {
            state.mapData = action.payload.data.features.map((feature) => ({
                position: feature.geometry.coordinates,
                id: feature.properties.id,
                name: feature.properties.name,
            }));
        })

    }
})

export const getMapData = createAsyncThunk(
    'getMapData',
    async (_, { rejectWithValue }) => {
        try {
            const mapData: AxiosResponse<{ type: string, features: Feature[] }> = await api.get<{ type: string, features: Feature[] }>('data');
            return mapData
        }
        catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.message)
        }
    }
)

export const getHeavyMapData = createAsyncThunk(
    'getHeavyMapData',
    async (_, { rejectWithValue }) => {
        try {
            const mapData: AxiosResponse<{ type: string, features: Feature[] }> = await api.get<{ type: string, features: Feature[] }>('heavy_data');
            return mapData
        }
        catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.message)
        }
    }
)