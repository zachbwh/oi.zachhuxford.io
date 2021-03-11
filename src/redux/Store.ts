import { configureStore } from '@reduxjs/toolkit'
import loginContextReducer from './slices/LoginContextSlice'
import swipeReducer from './slices/SwipeSlice'
import swipeSettingsReducer from './slices/SwipeSettingsSlice'
import messagesReducer from './slices/MessagesSlice'

export default configureStore({
	reducer: {
		loginContext: loginContextReducer,
		swipe: swipeReducer,
		swipeSettings: swipeSettingsReducer,
		messages: messagesReducer
	},
})