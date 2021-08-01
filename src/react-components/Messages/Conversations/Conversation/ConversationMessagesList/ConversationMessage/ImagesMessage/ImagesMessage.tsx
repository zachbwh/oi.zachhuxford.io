import React, { useRef, useState } from 'react';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import IImagesMessage from 'typescript-types/Messages/IImagesMessage';
import useClickOutside from 'react-hooks/ClickOutside';

import './ImagesMessage.scss';
import useLongPress from 'react-hooks/LongPress';
import Modal from 'react-components/ComponentLibrary/Modal/Modal';

const ImagesMessage: React.FunctionComponent<ConversationMessageProps<IImagesMessage>> = props => {
	const [showImageModal, setShowImageModal] = useState(false);
	let imageView;
	if (showImageModal && props.message.ImageUrls?.length === 1) {
		imageView = (
		<Modal closeModal={() => setShowImageModal(false)} modalRootId="conversation-modal-root">
			<img className="image-view" src={props.message.ImageUrls[0]} alt={props.message.MessageText}></img>
		</Modal>
		);
	} else if (props.message.ImageUrls?.length !== 1) {
		imageView = <div>Test</div>
	}

	const bodyRef = useRef(null),
		messageLongPressHandlers = useLongPress(() => {
			if (props.onLongPress) {
				props.onLongPress();
			}
		});
	let imagesPreview;

	if (props.message.ImageUrls?.length === 1) {
		imagesPreview = <img onClick={() => setShowImageModal(true)} src={props.message.ImageUrls[0]} alt={props.message.MessageText}></img>
	} else {
		imagesPreview = <img alt={props.message.MessageText}></img>
	}

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className="images-message">
		<div className="body" ref={bodyRef} {...messageLongPressHandlers}>
			<div className="images-preview">{imagesPreview}</div>
			<div className="images-text" onClick={props?.onClick}>{props.message.MessageText}</div>
		</div>
		{imageView}
	</div>
	);
}

export default ImagesMessage;
