import React, { useState, useCallback } from 'react';

export default function useSwipeMove(callback: (referenceTouch: React.Touch, event: React.TouchEvent) => void, swipeTouchEnd? : () => void) {
	const [referenceTouch, setReferenceTouch] = useState<React.Touch | null>(null);

	const start = useCallback((event: React.TouchEvent) => {
        setReferenceTouch(event.targetTouches.item(0));
	}, []);

    const move = useCallback((event: React.TouchEvent) => {
        if (referenceTouch) {
            callback(referenceTouch, event);
        }
    }, [referenceTouch, callback]);

	const stop = useCallback(() => {
        setReferenceTouch(null);
        if (swipeTouchEnd) {
            swipeTouchEnd();
        }
	}, [swipeTouchEnd]);

	return {
		onTouchStart: start,
        onTouchMove: move,
		onTouchEnd: stop,
	};
}