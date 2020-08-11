import Profile from 'typescript-types/IProfile';

export interface RootState {
	swipe: SwipeSliceState
}

export interface SwipeSliceState {
	profiles: Profile[]
}