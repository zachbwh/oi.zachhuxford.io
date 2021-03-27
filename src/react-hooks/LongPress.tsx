import { useState, useEffect, useCallback } from 'react';

export default function useLongPress(callback = () => {}, ms = 750) {
	const [startLongPress, setStartLongPress] = useState(false);

	useEffect(() => {
		let timerId : NodeJS.Timeout;
		if (startLongPress) {
			timerId = setTimeout(() => {
				window.navigator.vibrate(1000);
				callback();
			}, ms);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [callback, ms, startLongPress]);

	const start = useCallback(() => {
		setStartLongPress(true);
	}, []);
	const stop = useCallback(() => {
		setStartLongPress(false);
	}, []);

	return {
		onMouseDown: start,
		onMouseUp: stop,
		onMouseLeave: stop,
		onTouchStart: start,
		onTouchEnd: stop,
	};
}