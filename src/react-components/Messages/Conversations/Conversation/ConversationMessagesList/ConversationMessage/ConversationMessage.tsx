import moment from 'moment';
import React, { useState } from 'react';
import IMessage from 'typescript-types/Messages/IMessage';
import DeletedMessage from './DeletedMessage/DeletedMessage';
import ImagesMessage from './ImagesMessage/ImagesMessage';
import ReplyMessage from './ReplyMessage/ReplyMessage';
import TextMessage from './TextMessage/TextMessage';

import './ConversationMessage.scss';
import ReplyableMessage from './ReplyableMessage/ReplyableMessage';
import ReactableMessage from './ReactableMessage/ReactableMessage';
import { useSelector } from 'react-redux';
import { userSelectById } from 'redux/slices/MessagesSlice';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';

const ConversationMessage: React.FunctionComponent<{ message: IMessage, showMessageActions: (messageId: string) => void, zIndex?: number }> = props => {
	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username;

	let alignClassName : string;
	
	if (senderUsername === loggedInUsername) {
		alignClassName = "right-align"
	} else {
		alignClassName = "left-align"
	}

	function showMessageActions() {
		props.showMessageActions(props.message.MessageId)
	}

	const [detailVisible, setDetailVisible] = useState(false);

	const toggleDetailVisible = () => {
		setDetailVisible(!detailVisible);
	}

	let messageComponent;

	switch (props.message.MessageType) {
		case "reply":
			messageComponent = (
				<ReplyableMessage message={props.message}>
					<ReactableMessage message={props.message}>
						<ReplyMessage
							message={props.message}
							onClick={toggleDetailVisible}
							onClickOutside={() => setDetailVisible(false)}
							onLongPress={showMessageActions}>
						</ReplyMessage>
					</ReactableMessage>
				</ReplyableMessage>
			);
			break;

		case "text":
			messageComponent = (
				<ReplyableMessage message={props.message}>
					<ReactableMessage message={props.message}>
						<TextMessage
							message={props.message}
							onClick={toggleDetailVisible}
							onClickOutside={() => setDetailVisible(false)}
							onLongPress={showMessageActions}>
						</TextMessage>
					</ReactableMessage>
				</ReplyableMessage>
			);
			break;

		case "images":
			messageComponent = (
				<ReplyableMessage message={props.message}>
					<ReactableMessage message={props.message}>
						<ImagesMessage
							message={props.message}
							onClick={toggleDetailVisible}
							onClickOutside={() => setDetailVisible(false)}
							onLongPress={showMessageActions}>
						</ImagesMessage>
					</ReactableMessage>
				</ReplyableMessage>
			);
			break;
			
		default:
			messageComponent = <DeletedMessage
				message={props.message}
				onClick={toggleDetailVisible}
				onClickOutside={() => setDetailVisible(false)}
			></DeletedMessage>
			break;
	}

	return (
	<div className={"conversation-message " + alignClassName} style={{zIndex: props.zIndex}}>
		<div className={"date " + (!detailVisible ? "hidden" : "")}>{moment(props.message.DateTime).format('ddd Do MMMM  YY h:mm a')}</div>
		<div className="message-component">
			{messageComponent}
		</div>
	</div>
	);
}

export default ConversationMessage;
