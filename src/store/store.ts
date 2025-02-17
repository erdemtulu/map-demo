import { configureStore } from "@reduxjs/toolkit";
import { authState } from "./auth-state";
import { appState } from "./app-state";

const store = configureStore({
    reducer: {
        app: appState.reducer,
        auth: authState.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
export default store
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch