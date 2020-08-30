import { configureStore } from '@reduxjs/toolkit'
import swipeReducer from './slices/SwipeSlice'
import swipeSettingsReducer from './slices/SwipeSettingsSlice'

export default configureStore({
	reducer: {
		swipe: swipeReducer,
		swipeSettings: swipeSettingsReducer
	},
})