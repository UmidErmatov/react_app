import { combineReducers } from "@reduxjs/toolkit";
import { api } from "../app/auth";
import authReducer from '../features/auth/authSlice'

export const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
})