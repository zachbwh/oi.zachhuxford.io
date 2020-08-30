import { createSlice } from '@reduxjs/toolkit'

import { RootState } from 'redux/StateTypes';

export interface SwipeSettingsState {
	swipeRadius: number,
	minAge: number,
	maxAge: number,
	lookingFor: "Everyone" | "Men" | "Zach"
}

export const swipeSettingsSlice = createSlice({
	name: 'swipe',
	initialState: { swipeRadius: 120, minAge: 18, maxAge: 55, lookingFor: "Zach" } as SwipeSettingsState,
	reducers: {
		setSwipeRadius: function(state, action) {
			state.swipeRadius = action.payload.swipeRadius;
		},
		setMinAge: function(state, action) {
			state.minAge = action.payload.minAge;
		},
		setMaxAge: function(state, action) {
			state.maxAge = action.payload.maxAge;
		},
		setLookingFor: function(state, action) {
			state.lookingFor = action.payload.lookingFor;
		},
	}
});

export const selectSwipeSettings = (state:RootState) => state.swipeSettings;

export const { setSwipeRadius, setMinAge, setMaxAge, setLookingFor } = swipeSettingsSlice.actions;

export default swipeSettingsSlice.reducer;