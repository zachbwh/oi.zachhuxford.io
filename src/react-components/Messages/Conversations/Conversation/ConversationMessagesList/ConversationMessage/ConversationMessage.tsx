import moment from 'moment';
import React, { useState } from 'react';
import IMessage from 'typescript-types/Messages/IMessage';
import DeletedMessage from './DeletedMessage/DeletedMessage';
import ImagesMessage from './ImagesMessage/ImagesMessage';
import ReplyMessage from './ReplyMessage/ReplyMessage';
import TextMessage from './TextMessage/TextMessage';
import {isTextMessage} from 'typescript-types/Messages/ITextMessage';
import {isReplyMessage} from 'typescript-types/Messages/IReplyMessage';
import {isImagesMessage} from 'typescript-types/Messages/IImagesMessage';

import './ConversationMessage.scss';
import ReplyableMessage from './ReplyableMessage/ReplyableMessage';
import ReactableMessage from './ReactableMessage/ReactableMessage';
import { useSelector } from 'react-redux';
import { userSelectById } from 'redux/slices/MessagesSlice';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';

interface ConversationMessageProps {
	message: IMessage, 
	showMessageActions: (messageId: string) => void,
	zIndex?: number
}

function ConversationMessage({message, showMessageActions, zIndex}: ConversationMessageProps) {
	const loggedInUser = useSelector(selectLoginContext),
		senderUser = useSelector(userSelectById(message.SenderId));

	let alignClassName : string;
	
	if (senderUser?.UserId === loggedInUser.userId) {
		alignClassName = "right-align"
	} else {
		alignClassName = "left-align"
	}

	const [detailVisible, setDetailVisible] = useState(false);

	const toggleDetailVisible = () => {
		setDetailVisible(!detailVisible);
	}

	let imageComponent;

	if (senderUser?.UserId !== loggedInUser.userId) {
		imageComponent = (
			<img className="sender-img" src={senderUser?.ProfileImage} alt={senderUser?.ProfileImageAltText}></img>
		);
	}

	let messageComponent;

	if (message.IsDeleted) {
		messageComponent = <div className="message-component">
				{imageComponent}
				<DeletedMessage
					message={message}
					onClick={toggleDetailVisible}
					onClickOutside={() => setDetailVisible(false)}
				></DeletedMessage>
			</div>
	} else if (isReplyMessage(message)) {
		messageComponent = (
			<ReplyableMessage message={message}>
				<ReactableMessage message={message}>
					{imageComponent}
					<ReplyMessage
						message={message}
						onClick={toggleDetailVisible}
						onClickOutside={() => setDetailVisible(false)}
						onLongPress={() => showMessageActions(message.MessageId)}
					/>
				</ReactableMessage>
			</ReplyableMessage>
		);
	} else if (isTextMessage(message)) {
		messageComponent = (
			<ReplyableMessage message={message}>
				<ReactableMessage message={message}>
					{imageComponent}
					<TextMessage
						message={message}
						onClick={toggleDetailVisible}
						onClickOutside={() => setDetailVisible(false)}
						onLongPress={() => showMessageActions(message.MessageId)}
					/>
				</ReactableMessage>
			</ReplyableMessage>
		);
	} else if (isImagesMessage(message)) {
		messageComponent = (
			<ReplyableMessage message={message}>
				<ReactableMessage message={message}>
					{imageComponent}
					<ImagesMessage
						message={message}
						onClick={toggleDetailVisible}
						onClickOutside={() => setDetailVisible(false)}
						onLongPress={() => showMessageActions(message.MessageId)}
					/>
				</ReactableMessage>
			</ReplyableMessage>
		);
	}

	return (
	<div className={"conversation-message " + alignClassName} style={{zIndex: zIndex}}>
		<div className={"date " + (!detailVisible ? "hidden" : "")}>{moment(message.DateTime).format('ddd Do MMMM  YY h:mm a')}</div>
		<div className="message-component">
			{messageComponent}
		</div>
	</div>
	);
}

export default ConversationMessage;
