import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import Profile from 'typescript-types/IProfile';
import { RootState } from 'redux/StateTypes';

const profiles: Profile[] = [
	{
		UserName: "zachbwh",
		ShortName: "Zach",
		FullName: "Zach Huxford",
		BirthDate: new Date("1998-02-21T11:00:00.148Z"),
		Biography: `Hello

Nice to meet your aquaintance.

My name is Zachariah Huxford`,
		Gender: {
			Gender: "male",
			Pronouns: "he/him"
		},
		InterestedIn: "women",
		Occupation: "software dev",
		Locality: {
			ShortName: "Auckland",
			Longitude: 	174.763336,
			Lattitude: -36.848461
		},
		ProfileImages: [
			{
				ImageUrl: "/assets/swipe-images/isolation-April 03, 2020-9.jpg",
				ImageAltText: "Zach playing backyard cricket in a fashionable striped shirt"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 07, 2020-6.jpg",
				ImageAltText: "Zach relaxing in his dressing gown using his phone on an orange chair after a long day"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 07, 2020-8.jpg",
				ImageAltText: "Zach looking sexy in his dressing gown"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 10, 2020-10.jpg",
				ImageAltText: "Zach having a spiritual moment with no shirt on in the grass"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 13, 2020-9.jpg",
				ImageAltText: "Zach wearing double denim in the dark"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 13, 2020-10.jpg",
				ImageAltText: "Zach wearing double denim in the dark on his bike",
				Offset: -30
			},
		],
		Status: "candidate"
	},
	{
		UserName: "zachbwh2",
		ShortName: "Zach",
		FullName: "Zach Huxford",
		BirthDate: new Date("1998-02-21T11:00:00.148Z"),
		Biography: `Hello

Nice to meet your aquaintance.

My name is Zachariah Huxford`,
		Gender: {
			Gender: "male",
			Pronouns: "he/him"
		},
		InterestedIn: "women",
		Occupation: "software dev",
		Locality: {
			ShortName: "Auckland",
			Longitude: 	174.763336,
			Lattitude: -36.848461
		},
		ProfileImages: [
			{
				ImageUrl: "/assets/swipe-images/isolation-April 03, 2020-9.jpg",
				ImageAltText: "Zach playing backyard cricket in a fashionable striped shirt"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 07, 2020-6.jpg",
				ImageAltText: "Zach relaxing in his dressing gown using his phone on an orange chair after a long day"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 07, 2020-8.jpg",
				ImageAltText: "Zach looking sexy in his dressing gown"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 10, 2020-10.jpg",
				ImageAltText: "Zach having a spiritual moment with no shirt on in the grass"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 13, 2020-9.jpg",
				ImageAltText: "Zach wearing double denim in the dark"
			},
			{
				ImageUrl: "/assets/swipe-images/isolation-April 13, 2020-10.jpg",
				ImageAltText: "Zach wearing double denim in the dark on his bike",
				Offset: -30
			},
		],
		Status: "candidate"
	}
];

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

export const swipeSlice = createSlice({
	name: 'swipe',
	initialState: {
		profiles: profiles
	},
	reducers: {
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

export default swipeSlice.reducer;