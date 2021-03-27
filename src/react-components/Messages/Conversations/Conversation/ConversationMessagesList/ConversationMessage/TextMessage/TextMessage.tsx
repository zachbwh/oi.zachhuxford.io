import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { userSelectById } from 'redux/slices/MessagesSlice';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import useClickOutside from 'react-hooks/ClickOutside';

import './TextMessage.scss';
import useLongPress from 'react-hooks/LongPress';

const TextMessage: React.FunctionComponent<ConversationMessageProps> = props => {

	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username,
		bodyRef = useRef(null),
		messageLongPressHandlers = useLongPress(() => {
			if (props.onLongPress) {
				props.onLongPress();
			}
		});
	let alignClassName;
	
	if (props.isReply) {
		alignClassName = ""
	} else if (senderUsername === loggedInUsername) {
		alignClassName = "right-align"
	} else {
		alignClassName = "left-align"
	}

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className={"text-message " +  alignClassName}>
		<div className="body" onClick={props?.onClick} ref={bodyRef} {...messageLongPressHandlers}>
			{props.message.MessageText}
		</div>
	</div>
	);
}

export default TextMessage;
