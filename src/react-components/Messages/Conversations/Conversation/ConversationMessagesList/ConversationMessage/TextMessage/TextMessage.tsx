import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { userSelectById } from 'redux/slices/MessagesSlice';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import useClickOutside from 'react-hooks/ClickOutside';

import './TextMessage.scss';
import useLongPress from 'react-hooks/LongPress';

const TextMessage: React.FunctionComponent<ConversationMessageProps> = props => {
	const bodyRef = useRef(null),
		messageLongPressHandlers = useLongPress(() => {
			if (props.onLongPress) {
				props.onLongPress();
			}
		});

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className="text-message">
		<div className="body" onClick={props?.onClick} ref={bodyRef} {...messageLongPressHandlers}>
			{props.message.MessageText}
		</div>
	</div>
	);
}

export default TextMessage;
