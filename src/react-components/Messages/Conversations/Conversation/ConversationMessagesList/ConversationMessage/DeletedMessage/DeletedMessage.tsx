import React, { useRef } from 'react';
import useClickOutside from 'react-hooks/ClickOutside';
import { useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { userSelectById } from 'redux/slices/MessagesSlice';
import IMessage from 'typescript-types/Messages/IMessage';

import './DeletedMessage.scss';

const TextMessage: React.FunctionComponent<{ message: IMessage, isReply?: boolean, onClick?: () => void, onClickOutside?: () => void }> = props => {

	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username,
		bodyRef = useRef(null);

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
	<div className={"deleted-message " +  alignClassName}>
		<div className="body" onClick={props?.onClick} ref={bodyRef}>
            Message Deleted
		</div>
	</div>
	);
}

export default TextMessage;
