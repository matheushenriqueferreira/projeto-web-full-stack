import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userEmail: '',
    token: ''
  },
  reducers: {
    login: (state, action) => {
      const { email, token } = action.payload;
      return { userEmail: email, token: token }
    },
    logout: () => {
      return {userEmail: '', token: ''}
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;