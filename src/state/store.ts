import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from './deviceType/deviceTypeSlice'
import fontSizeReducer from "./fontSize/fontSizeSlice";

export const store = configureStore({
    reducer: {
        device : deviceReducer,
        fontSize : fontSizeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;