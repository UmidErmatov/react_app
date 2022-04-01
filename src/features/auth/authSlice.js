import { createSlice } from '@reduxjs/toolkit';
import { api } from '../../app/auth';

const initialState = { user: null, token: null, isAuth: false }

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout_clear: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
            if (payload.success) {
                const res = payload.result
                return { ...state, user: res?.user, token: res?.access_token, isAuth: payload?.success }
            }
        })
    },
});
export default slice.reducer;
export const { logout_clear } = slice.actions