import { SwipeState } from './slices/SwipeSlice';
import { SwipeSettingsState } from './slices/SwipeSettingsSlice';

export interface RootState {
	swipe: SwipeState
	swipeSettings: SwipeSettingsState
}