import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { messageSelectById, userSelectById } from 'redux/slices/MessagesSlice';
import IMessage from 'typescript-types/Messages/IMessage';
import useClickOutside from 'react-hooks/ClickOutside';

import './ReplyMessage.scss';
import TextMessage from '../TextMessage/TextMessage';
import DeletedMessage from '../DeletedMessage/DeletedMessage';

const ReplyMessage: React.FunctionComponent<{ message: IMessage, onClick?: () => void, onClickOutside?: () => void }> = props => {

	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username,
		bodyRef = useRef(null),
		replyToMessage = useSelector(messageSelectById(props.message.ReferenceMessageId || ""))

	let alignClassName,
		replyToComponent;

	
	if (senderUsername === loggedInUsername) {
		alignClassName = "right-align"
	} else {
		alignClassName = "left-align"
	}

	switch (replyToMessage?.MessageType) {
		case "text":
		case "reply":
			replyToComponent = <TextMessage message={replyToMessage} isReply={true}></TextMessage>
			break;
		case "deleted":
			replyToComponent = <DeletedMessage message={replyToMessage} isReply={true}></DeletedMessage>
		break;
	}

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className={"reply-message " +  alignClassName}>
		<div className="body" onClick={props?.onClick} ref={bodyRef}>
			<div className="reply-to">{replyToComponent}</div>
			<div className="reply-text">{props.message.MessageText}</div>
		</div>
	</div>
	);
}

export default ReplyMessage;
