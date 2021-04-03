import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss';

const Modal: React.FunctionComponent<{children: React.ReactNode, modalRootId: string, closeModal: () => void}> = props => {
    const modalRoot: Element = document.getElementById(props.modalRootId) || document.createElement("div") as HTMLElement;

    const close = useCallback((event: any) => {
        if (event.target === modalRoot) {
            props.closeModal();
        }
    }, [modalRoot, props]);

    useEffect(() => {
        if (!props.children) {
            modalRoot.classList.add("hidden");
            modalRoot.removeEventListener("click", close);

        } else {
            modalRoot.classList.remove("hidden");
            modalRoot.addEventListener("click", close);

        }
    }, [props.children, modalRoot, modalRoot.classList, close]);

	return ReactDOM.createPortal(props.children, modalRoot);;
}

export default Modal;