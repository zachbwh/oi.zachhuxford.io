import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { userSelectById } from 'redux/slices/MessagesSlice';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import useClickOutside from 'react-hooks/ClickOutside';

import './ImagesMessage.scss';
import useLongPress from 'react-hooks/LongPress';

const ImagesMessage: React.FunctionComponent<ConversationMessageProps> = props => {

	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username,
		bodyRef = useRef(null),
		messageLongPressHandlers = useLongPress(() => {
			if (props.onLongPress) {
				props.onLongPress();
			}
		});
	let alignClassName,
		imagesPreview;
	
	if (props.isReply) {
		alignClassName = ""
	} else if (senderUsername === loggedInUsername) {
		alignClassName = "right-align"
	} else {
		alignClassName = "left-align"
	}

	if (props.message.ImageUrls?.length === 1) {
		imagesPreview = (
			<img src={props.message.ImageUrls[0]} alt={props.message.MessageText}></img>
		);
	} else {
		imagesPreview = (
			<img alt={props.message.MessageText}></img>
		);
	}

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className={"images-message " +  alignClassName}>
		<div className="body" ref={bodyRef} {...messageLongPressHandlers}>
			<div className="images-preview">{imagesPreview}</div>
			<div className="images-text" onClick={props?.onClick}>{props.message.MessageText}</div>
		</div>
	</div>
	);
}

export default ImagesMessage;
