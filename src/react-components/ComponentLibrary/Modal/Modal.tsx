import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import useHistoryStatePop from 'react-hooks/HistoryStatePop';

import './Modal.scss';

const Modal: React.FunctionComponent<{children: React.ReactNode, modalRootId: string, closeModal: () => void}> = props => {
    const modalRoot: Element = document.getElementById(props.modalRootId) || document.createElement("div") as HTMLElement;

    const closeClick = useCallback((event: any) => {
        if (event.target === modalRoot) {
            props.closeModal();
        }
    }, [modalRoot, props]);

    useHotkeys("esc", () => props.closeModal());
    useHistoryStatePop(() => props.closeModal());

    useEffect(() => {
        modalRoot.classList.remove("hidden");
        modalRoot.addEventListener("click", closeClick);

        return function cleanUp() {
            modalRoot.classList.add("hidden");
            modalRoot.removeEventListener("click", closeClick);
        }
    }, [props.children, modalRoot, modalRoot.classList, closeClick]);

	return ReactDOM.createPortal(props.children, modalRoot);;
}

export default Modal;