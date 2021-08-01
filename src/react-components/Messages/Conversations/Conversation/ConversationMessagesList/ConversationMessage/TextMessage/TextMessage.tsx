import React, { useRef } from 'react';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';
import useClickOutside from 'react-hooks/ClickOutside';

import './TextMessage.scss';
import useLongPress from 'react-hooks/LongPress';
import ITextMessage from 'typescript-types/Messages/ITextMessage';

const TextMessage: React.FunctionComponent<ConversationMessageProps<ITextMessage>> = props => {
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
