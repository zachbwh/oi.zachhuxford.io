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
import IReplyMessage, { isReplyMessage } from 'typescript-types/Messages/IReplyMessage';
import { isTextMessage } from 'typescript-types/Messages/ITextMessage';
import { isImagesMessage } from 'typescript-types/Messages/IImagesMessage';

function ReplyMessage({message, onClick, onClickOutside, onLongPress}: ConversationMessageProps<IReplyMessage>) {
	const bodyRef = useRef(null),
		replyToMessage = useSelector(messageSelectById(message.ReferenceMessageId || "")),
		messageLongPressHandlers = useLongPress(() => {
			if (onLongPress) {
				onLongPress();
			}
		}),
		loggedInUser = useSelector(selectLoginContext).userId;
		
	var replyerSenderName = useSelector(selectUserConversationName(message.ConversationId, message.SenderId)),
		replyToSenderName = useSelector(selectUserConversationName(message.ConversationId, replyToMessage?.SenderId || ""));

	if (message.SenderId === loggedInUser) {
		replyerSenderName = "You";
	}

	if (message.SenderId === replyToMessage?.SenderId) {
		replyToSenderName = "themself";

		if (replyToMessage.SenderId === loggedInUser) {
			replyToSenderName = "yourself";
		}
	}

	let replyToComponent;

	if (typeof replyToMessage === "undefined") {
		
	} else if (replyToMessage.IsDeleted) {
		replyToComponent = <DeletedMessage message={replyToMessage}></DeletedMessage>

	} else if (isTextMessage(replyToMessage) || isReplyMessage(replyToMessage)) {
		replyToComponent = <TextMessage message={replyToMessage}></TextMessage>

	} else if (isImagesMessage(replyToMessage)) {
		replyToComponent = <ImagesMessage message={replyToMessage}></ImagesMessage>
	}

	useClickOutside(bodyRef, onClickOutside);

	return (
	<div className="reply-message">
		<div className="reply-to-text"><FontAwesomeIcon icon={faReply} />{`${replyerSenderName} replied to ${replyToSenderName}`}</div>
		<div className="body" onClick={onClick} ref={bodyRef} {...messageLongPressHandlers}>
			<div className="reply-to">{replyToComponent}</div>
			<div className="reply-text">{message.MessageText}</div>
		</div>
	</div>
	);
}

export default ReplyMessage;
