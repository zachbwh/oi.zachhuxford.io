import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { userSelectById } from 'redux/slices/MessagesSlice';
import IMessage from 'typescript-types/Messages/IMessage';
import useClickOutside from 'react-hooks/ClickOutside';

import './ImagesMessage.scss';

const ImagesMessage: React.FunctionComponent<{ message: IMessage, isReply?: boolean, onClick?: () => void, onClickOutside?: () => void }> = props => {

	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username,
		bodyRef = useRef(null);
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
		<div className="body" ref={bodyRef}>
			<div className="images-preview">{imagesPreview}</div>
			<div className="images-text" onClick={props?.onClick}>{props.message.MessageText}</div>
		</div>
	</div>
	);
}

export default ImagesMessage;
