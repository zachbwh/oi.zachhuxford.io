import React, { useRef } from 'react';
import useClickOutside from 'react-hooks/ClickOutside';
import ConversationMessageProps from 'typescript-types/Messages/ConversationMessageProps';

import './DeletedMessage.scss';

const DeletedMessage: React.FunctionComponent<ConversationMessageProps> = props => {
	const bodyRef = useRef(null);

	useClickOutside(bodyRef, props.onClickOutside);

	return (
	<div className="deleted-message">
		<div className="body" onClick={props?.onClick} ref={bodyRef}>
            Message Deleted
		</div>
	</div>
	);
}

export default DeletedMessage;
