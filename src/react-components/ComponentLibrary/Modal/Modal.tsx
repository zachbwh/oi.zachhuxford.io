import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import useHistoryStatePop from 'react-hooks/HistoryStatePop';

import './Modal.scss';

const Modal: React.FunctionComponent<{children: React.ReactNode, modalRootId: string, closeModal: () => void}> = props => {
    const modalRoot: Element = document.getElementById(props.modalRootId) || document.createElement("div") as HTMLElement;
    let close: () => void;
    const stateFlagKey = useHistoryStatePop(() => close());

    close = useCallback(() => {
        // make sure to always hide modal root before closing
        modalRoot.classList.add("hidden");

        props.closeModal();

        // if the modal is closed from something other than pressing back
        if (window.history.state && window.history.state[stateFlagKey]) {
            // then pop state to ensure back button has expected behaviour
            window.history.back();
        }

    }, [modalRoot, props, stateFlagKey]);

    const closeClick = useCallback((event: any) => {
        if (event.target === modalRoot) {
            close();
        }
    }, [modalRoot, close]);

    useHotkeys("esc", () => close());

    useEffect(() => {
        if (!props.children) {
            modalRoot.classList.add("hidden");
            modalRoot.removeEventListener("click", closeClick);

        } else {
            modalRoot.classList.remove("hidden");
            modalRoot.addEventListener("click", closeClick);

        }

        return function cleanUp() {
            modalRoot.classList.add("hidden");
        }
    }, [props.children, modalRoot, modalRoot.classList, closeClick]);

	return ReactDOM.createPortal(props.children, modalRoot);;
}

export default Modal;