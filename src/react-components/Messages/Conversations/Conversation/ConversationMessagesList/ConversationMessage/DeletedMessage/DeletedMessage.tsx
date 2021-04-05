import React, { useRef } from 'react';
import useClickOutside from 'react-hooks/ClickOutside';
import { useSelector } from 'react-redux';
import { selectUserConversationName } from 'redux/slices/MessagesSlice';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';

import './DeletedMessage.scss';

const DeletedMessage: React.FunctionComponent<ConversationMessageProps> = props => {
	const bodyRef = useRef(null);
	const senderName = useSelector(selectUserConversationName(props.message.ConversationId, props.message.SenderId))

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className="deleted-message">
		<div className="body" onClick={props?.onClick} ref={bodyRef}>
            {senderName} deleted their message
		</div>
	</div>
	);
}

export default DeletedMessage;
