import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { userSelectById } from 'redux/slices/MessagesSlice';
import IMessage from 'typescript-types/Messages/IMessage';

import './TextMessage.scss';

const TextMessage: React.FunctionComponent<{ message: IMessage }> = props => {

	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username
	let alignClassName;
	
	if (senderUsername === loggedInUsername) {
		alignClassName = "right-align"
	} else {
		alignClassName = "left-align"
	}

	return (
	<div className={"text-message " +  alignClassName}>
		<div className="body">
			{props.message.MessageText}
		</div>
	</div>
	);
}

export default TextMessage;
