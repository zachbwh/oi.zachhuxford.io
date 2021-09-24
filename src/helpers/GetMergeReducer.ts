function getMergeReducer<T>(): (currentState: T, updateData: Partial<T>) => T {
	return (currentState: T, updateData: Partial<T>) => {
        return {...currentState, ...updateData};
    }
}

export default getMergeReducer;