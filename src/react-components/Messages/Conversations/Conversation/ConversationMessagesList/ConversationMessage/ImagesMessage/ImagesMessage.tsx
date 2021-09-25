import React, { useRef, useState } from 'react';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import IImagesMessage from 'typescript-types/Messages/IImagesMessage';
import useClickOutside from 'react-hooks/ClickOutside';

import './ImagesMessage.scss';
import useLongPress from 'react-hooks/LongPress';
import Modal from 'react-components/ComponentLibrary/Modal/Modal';

function ImagesMessage({message, onLongPress, onClick, onClickOutside}: ConversationMessageProps<IImagesMessage>) {
	const [showImageModal, setShowImageModal] = useState(false);
	let imageView;
	if (showImageModal && message.ImageUrls?.length === 1) {
		imageView = (
		<Modal closeModal={() => setShowImageModal(false)} modalRootId="conversation-modal-root">
			<img className="image-view" src={message.ImageUrls[0]} alt={message.MessageText}></img>
		</Modal>
		);
	} else if (message.ImageUrls?.length !== 1) {
		imageView = <div>Test</div>
	}

	const bodyRef = useRef(null),
		messageLongPressHandlers = useLongPress(() => {
			if (onLongPress) {
				onLongPress();
			}
		});
	let imagesPreview;

	if (message.ImageUrls?.length === 1) {
		imagesPreview = <img onClick={() => setShowImageModal(true)} src={message.ImageUrls[0]} alt={message.MessageText}></img>
	} else {
		imagesPreview = <img alt={message.MessageText}></img>
	}

	useClickOutside(bodyRef, onClickOutside);

	return (
	<div className="images-message">
		<div className="body" ref={bodyRef} {...messageLongPressHandlers}>
			<div className="images-preview">{imagesPreview}</div>
			<div className="images-text" onClick={onClick}>{message.MessageText}</div>
		</div>
		{imageView}
	</div>
	);
}

export default ImagesMessage;
