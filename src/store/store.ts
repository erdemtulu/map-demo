import { configureStore } from "@reduxjs/toolkit";
import { authState } from "./auth-state";

const store = configureStore({
    reducer: {
        auth: authState.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})
export default store
export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch