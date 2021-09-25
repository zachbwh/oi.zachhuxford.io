import React, { useRef } from 'react';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import useClickOutside from 'react-hooks/ClickOutside';

import './TextMessage.scss';
import useLongPress from 'react-hooks/LongPress';
import ITextMessage from 'typescript-types/Messages/ITextMessage';

function TextMessage({message, onClick, onClickOutside, onLongPress}: ConversationMessageProps<ITextMessage>) {
	const bodyRef = useRef(null),
		messageLongPressHandlers = useLongPress(() => {
			if (onLongPress) {
				onLongPress();
			}
		});

	useClickOutside(bodyRef, onClickOutside);

	return (
	<div className="text-message">
		<div className="body" onClick={onClick} ref={bodyRef} {...messageLongPressHandlers}>
			{message.MessageText}
		</div>
	</div>
	);
}

export default TextMessage;
