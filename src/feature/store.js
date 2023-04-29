import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from "./authSlice";
import { messagePopSlice } from './messagePopSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        messagePop: messagePopSlice.reducer,
    },
});