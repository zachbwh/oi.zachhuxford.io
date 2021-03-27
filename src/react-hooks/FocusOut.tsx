import { RefObject, useEffect } from "react";

/**
 * Hook that alerts clicks or touches outside of the passed ref
 */
function useFocusOut(ref: RefObject<HTMLElement>, focusOutsideHandler?: () => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleFocusOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (focusOutsideHandler) {
                    focusOutsideHandler();
                }
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleFocusOutside);
        document.addEventListener("touchstart", handleFocusOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleFocusOutside);
            document.removeEventListener("touchstart", handleFocusOutside);
        };
    }, [ref, focusOutsideHandler]);
}

export default useFocusOut;