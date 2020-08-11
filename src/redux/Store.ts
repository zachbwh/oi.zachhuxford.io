import { configureStore } from '@reduxjs/toolkit'
import swipeReducer from './slices/SwipeSlice'

export default configureStore({
  reducer: {
    swipe: swipeReducer
  }
})