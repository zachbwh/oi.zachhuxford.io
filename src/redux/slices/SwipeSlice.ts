import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Profile from 'typescript-types/IProfile';
import { RootState } from 'redux/StateTypes';

export const acceptProfileAsync = createAsyncThunk(
	'swipe/acceptProfile',
	(userId: string) => {
		return new Promise<string>(function(fulfill, reject) {
			setTimeout(function() {
				fulfill(userId);
			}, 1000);
		})
	}
);

export const rejectProfileAsync = createAsyncThunk(
	'swipe/rejectProfile',
	(userId: string) => {
		return new Promise<string>(function(fulfill, reject) {
			setTimeout(function() {
				fulfill(userId);
			}, 1000);
		})
	}
);

interface SwipeState {
	profiles: Profile[]
}

export const swipeSlice = createSlice({
	name: 'swipe',
	initialState: { profiles: [] } as SwipeState,
	reducers: {
		setProfiles: function(state, action) {
			state.profiles = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(acceptProfileAsync.fulfilled, (state, action) => {
			const userId = action.payload;
			const userIndex = state.profiles.findIndex(profile => profile.UserName === userId);
			state.profiles[userIndex].Status = "accepted";
		})

		builder.addCase(rejectProfileAsync.fulfilled, (state, action) => {
			const userId = action.payload;
			const userIndex = state.profiles.findIndex(profile => profile.UserName === userId);
			state.profiles[userIndex].Status = "rejected";
		})
	}
});

export const selectProfiles = (state:RootState) => state.swipe.profiles;

export const { setProfiles } = swipeSlice.actions;

export default swipeSlice.reducer;