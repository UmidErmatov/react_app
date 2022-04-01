import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import services from "../../api/services";

const initialState = {
  users: [],
  status: 'idle',
  error: null
}

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async () => {
    const response = await services.getAll('users');
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.users = state.users.concat(action.payload)
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const selectAllUsers = state => state.users.users
export const selectUserById = (state, userId) => state.users.users.find(user => user.id === Number(userId))

export default userSlice.reducer