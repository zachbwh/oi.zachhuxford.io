import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import useHistoryStatePop from 'react-hooks/HistoryStatePop';

import './Modal.scss';

interface ModalProps {
    modalRootId: string,
    closeModal: () => void
}

function Modal({modalRootId, closeModal, children}: React.PropsWithChildren<ModalProps>) {
    const modalRoot: Element = document.getElementById(modalRootId) || document.createElement("div") as HTMLElement;

    const closeClick = useCallback((event: any) => {
        if (event.target === modalRoot) {
            closeModal();
        }
    }, [modalRoot, closeModal]);

    useHotkeys("esc", () => closeModal());
    useHistoryStatePop(() => closeModal());

    useEffect(() => {
        modalRoot.classList.remove("hidden");
        modalRoot.addEventListener("click", closeClick);

        return function cleanUp() {
            modalRoot.classList.add("hidden");
            modalRoot.removeEventListener("click", closeClick);
        }
    }, [children, modalRoot, modalRoot.classList, closeClick]);

	return ReactDOM.createPortal(children, modalRoot);;
}

export default Modal;