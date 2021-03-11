import { SwipeState } from './slices/SwipeSlice';
import { SwipeSettingsState } from './slices/SwipeSettingsSlice';
import { MessagesState } from './slices/MessagesSlice';
import { LoginContextState } from './slices/LoginContextSlice';

export interface RootState {
	loginContext: LoginContextState
	swipe: SwipeState
	swipeSettings: SwipeSettingsState,
	messages: MessagesState,
}