import { useState, useEffect, useCallback } from 'react';

export default function useLongPress(callback = () => {}, ms = 750) {
	const [startLongPress, setStartLongPress] = useState(false);
	const [referenceTouch, setReferenceTouch] = useState<React.Touch | null>(null);

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

	const start = useCallback((event: any) => {
		if (event.targetTouches) {
			// if a touch event
			setReferenceTouch(event.targetTouches.item(0));
		}
		setStartLongPress(true);
	}, []);
	const move = useCallback((event: React.TouchEvent) => {
		// if distance moved since long press started is sufficiently large
		const magicNumber = 5;
		// then cancel long press
		// user is probably scrolling or doing some other gesture
		if (referenceTouch) {
			const refX = referenceTouch.pageX,
			refY = referenceTouch.pageY,
			newTouch = event.targetTouches.item(0),
			newX = newTouch.pageX,
			newY = newTouch.pageY,
			deltaX = Math.abs(refX - newX),
			deltaY = Math.abs(refY - newY);
			
			if (Math.sqrt((deltaX ^ 2) + (deltaY ^ 2)) > magicNumber) {
				setStartLongPress(false);
			}
		}
		
	}, [referenceTouch]);
	const stop = useCallback(() => {
		setReferenceTouch(null);
		setStartLongPress(false);
		
	}, []);

	return {
		onMouseDown: start,
		onMouseUp: stop,
		onMouseLeave: stop,
		onTouchStart: start,
		onTouchMove: move,
		onTouchEnd: stop,
	};
}