import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { messageSelectById, selectUserConversationName } from 'redux/slices/MessagesSlice';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import useClickOutside from 'react-hooks/ClickOutside';

import './ReplyMessage.scss';
import TextMessage from '../TextMessage/TextMessage';
import DeletedMessage from '../DeletedMessage/DeletedMessage';
import useLongPress from 'react-hooks/LongPress';
import ImagesMessage from '../ImagesMessage/ImagesMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';

const ReplyMessage: React.FunctionComponent<ConversationMessageProps> = props => {
	const bodyRef = useRef(null),
		replyToMessage = useSelector(messageSelectById(props.message.ReferenceMessageId || "")),
		messageLongPressHandlers = useLongPress(() => {
			if (props.onLongPress) {
				props.onLongPress();
			}
		}),
		loggedInUser = useSelector(selectLoginContext).userId;
		
	var replyerSenderName = useSelector(selectUserConversationName(props.message.ConversationId, props.message.SenderId)),
		replyToSenderName = useSelector(selectUserConversationName(props.message.ConversationId, replyToMessage?.SenderId || ""));

	if (props.message.SenderId === loggedInUser) {
		replyerSenderName = "You";
	}

	if (props.message.SenderId === replyToMessage?.SenderId) {
		replyToSenderName = "themself";

		if (replyToMessage.SenderId === loggedInUser) {
			replyToSenderName = "yourself";
		}
	}

	let replyToComponent;

	switch (replyToMessage?.MessageType) {
		case "text":
		case "reply":
			replyToComponent = <TextMessage message={replyToMessage}></TextMessage>
			break;
		case "deleted":
			replyToComponent = <DeletedMessage message={replyToMessage}></DeletedMessage>
		break;
		case "images":
			replyToComponent = <ImagesMessage message={replyToMessage}></ImagesMessage>
		break;

	}

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className="reply-message">
		<div className="reply-to-text"><FontAwesomeIcon icon={faReply} />{`${replyerSenderName} replied to ${replyToSenderName}`}</div>
		<div className="body" onClick={props?.onClick} ref={bodyRef} {...messageLongPressHandlers}>
			<div className="reply-to">{replyToComponent}</div>
			<div className="reply-text">{props.message.MessageText}</div>
		</div>
	</div>
	);
}

export default ReplyMessage;
