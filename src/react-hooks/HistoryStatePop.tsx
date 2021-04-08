import { useEffect, useState } from "react";
import { nanoid } from '@reduxjs/toolkit'
import { useHistory } from "react-router";

/**
 * Hook that sets a random history state flag
 * Fires a callback when that state flag is popped
 * 
 * Useful if you want something to respond to the back button being pressed
 */
function useHistoryStatePop(historyStateFlagPopped: () => void, newTitle? :string) {
    const [stateFlagKey, setStateFlagKey] = useState(nanoid());
    const [popStateFired, setPopStateFired] = useState(false);
    const history = useHistory()

    useEffect(() => {
        /**
         * fire the callback if the state flag key is no longer set
         */
        function handlePopState(location: any) {
            if (!location.state || !location.state[stateFlagKey]) {
                setPopStateFired(true);
                historyStateFlagPopped();
            }
        }

        if (popStateFired) {
            return
        }

        // push to window state
        const stateFlagObject: any = {};
        stateFlagObject[stateFlagKey] = true;
        window.history.pushState(stateFlagObject, newTitle || document.title);

        history.listen(location => {
            if (history.action === "POP") {
                handlePopState(location);
            }
        });
    }, [historyStateFlagPopped, newTitle, stateFlagKey]);
}

export default useHistoryStatePop;