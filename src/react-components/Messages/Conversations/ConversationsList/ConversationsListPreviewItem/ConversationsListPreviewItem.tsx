import React from 'react';

import './ConversationsListPreviewItem.scss';
import { useSelector } from "react-redux";
import { conversationSelectById, messageSelectById, userSelectById } from "redux/slices/MessagesSlice";
import ConversationPreviewIcon from "./ConversationPreviewIcon/ConversationPreviewIcon"
import { Link } from 'react-router-dom';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import moment from 'moment';

const ConversationsListPreviewItem: React.FunctionComponent<{ conversationId: string | number }> = props => {

	const conversation = useSelector(conversationSelectById(props.conversationId)),
		lastMessage = useSelector(messageSelectById(conversation?.Messages[0] || "")),
		lastMessageSender = useSelector(userSelectById(lastMessage?.SenderId || "")),
		loggedInUsername = useSelector(selectLoginContext).username;

	let lastMessageText,
		lastMessageDateTime = moment(lastMessage?.DateTime).format("LT");

	if (lastMessageSender?.UserId === loggedInUsername) {
		lastMessageText = `You: ${lastMessage?.MessageText}`;
	} else if (conversation?.Participants?.length !== undefined && conversation?.Participants?.length > 2) {
		lastMessageText = `${lastMessageSender?.FirstName}: ${lastMessage?.MessageText}`;
	} else {
		lastMessageText = lastMessage?.MessageText;
	}

	

	return (
	<Link to={`/messages/${conversation?.ConversationId}`} className="conversation-list-preview-item">
		<ConversationPreviewIcon conversationId={props.conversationId}></ConversationPreviewIcon>
		<div className="conversation-preview-text">
			<h3 className="conversation-preview-header">{conversation?.ConversationName}</h3>
			<div className="conversation-last-message">
				<div className="text">{lastMessageText}</div>
				<div className="date"> · {lastMessageDateTime}</div>
				
			</div>
		</div>
	</Link>
	
	);
}

export default ConversationsListPreviewItem;
