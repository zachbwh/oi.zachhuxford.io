import React, { useRef } from 'react';
import useClickOutside from 'react-hooks/ClickOutside';
import { useSelector } from 'react-redux';
import { selectUserConversationName } from 'redux/slices/MessagesSlice';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import IMessage from 'typescript-types/Messages/IMessage';

import './DeletedMessage.scss';

function DeletedMessage({message, onClick, onClickOutside}: ConversationMessageProps<IMessage>) {
	const bodyRef = useRef(null);
	const senderName = useSelector(selectUserConversationName(message.ConversationId, message.SenderId))

	useClickOutside(bodyRef, onClickOutside);

	return (
	<div className="deleted-message">
		<div className="body" onClick={onClick} ref={bodyRef}>
            {senderName} deleted their message
		</div>
	</div>
	);
}

export default DeletedMessage;
