import moment from 'moment';
import React, { useState } from 'react';
import IMessage from 'typescript-types/Messages/IMessage';
import DeletedMessage from './DeletedMessage/DeletedMessage';
import ImagesMessage from './ImagesMessage/ImagesMessage';
import ReplyMessage from './ReplyMessage/ReplyMessage';
import TextMessage from './TextMessage/TextMessage';
import {isTextMessage} from 'typescript-types/Messages/ITextMessage';
import {isReplyMessage} from 'typescript-types/Messages/IReplyMessage';
import {isDeletedMessage} from 'typescript-types/Messages/IDeletedMessage';
import {isImagesMessage} from 'typescript-types/Messages/IImagesMessage';

import './ConversationMessage.scss';
import ReplyableMessage from './ReplyableMessage/ReplyableMessage';
import ReactableMessage from './ReactableMessage/ReactableMessage';
import { useSelector } from 'react-redux';
import { userSelectById } from 'redux/slices/MessagesSlice';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';

const ConversationMessage: React.FunctionComponent<{ message: IMessage, showMessageActions: (messageId: string) => void, zIndex?: number }> = props => {
	const loggedInUser = useSelector(selectLoginContext),
		senderUser = useSelector(userSelectById(props.message.SenderId));

	let alignClassName : string;
	
	if (senderUser?.UserId === loggedInUser.userId) {
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

	let imageComponent;

	if (senderUser?.UserId !== loggedInUser.userId) {
		imageComponent = (
			<img className="sender-img" src={senderUser?.ProfileImage} alt={senderUser?.ProfileImageAltText}></img>
		);
	}

	let messageComponent;

	if (isReplyMessage(props.message)) {
		messageComponent = (
			<ReplyableMessage message={props.message}>
				<ReactableMessage message={props.message}>
					{imageComponent}
					<ReplyMessage
						message={props.message}
						onClick={toggleDetailVisible}
						onClickOutside={() => setDetailVisible(false)}
						onLongPress={showMessageActions}>
					</ReplyMessage>
				</ReactableMessage>
			</ReplyableMessage>
		);
	} else if (isTextMessage(props.message)) {
		messageComponent = (
			<ReplyableMessage message={props.message}>
				<ReactableMessage message={props.message}>
					{imageComponent}
					<TextMessage
						message={props.message}
						onClick={toggleDetailVisible}
						onClickOutside={() => setDetailVisible(false)}
						onLongPress={showMessageActions}>
					</TextMessage>
				</ReactableMessage>
			</ReplyableMessage>
		);
	} else if (isImagesMessage(props.message)) {
		messageComponent = (
			<ReplyableMessage message={props.message}>
				<ReactableMessage message={props.message}>
					{imageComponent}
					<ImagesMessage
						message={props.message}
						onClick={toggleDetailVisible}
						onClickOutside={() => setDetailVisible(false)}
						onLongPress={showMessageActions}>
					</ImagesMessage>
				</ReactableMessage>
			</ReplyableMessage>
		);
	} else if (isDeletedMessage(props.message)) {
		messageComponent = <div className="message-component">
				{imageComponent}
				<DeletedMessage
					message={props.message}
					onClick={toggleDetailVisible}
					onClickOutside={() => setDetailVisible(false)}
				></DeletedMessage>
			</div>
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
