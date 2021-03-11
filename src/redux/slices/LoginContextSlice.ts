import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'redux/StateTypes';

export interface LoginContextState {
	username: string,
	userId: string
}

export const loginContextSlice = createSlice({
	name: 'login-context',
	initialState: { username: "zachbwh", userId: "12drt" } as LoginContextState,
	reducers: {}
});

export const selectLoginContext = (state:RootState) => state.loginContext;

export default loginContextSlice.reducer;