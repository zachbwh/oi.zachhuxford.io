import React from 'react';

import './ConversationsListPreviewItem.scss';
import { useSelector } from "react-redux";
import { conversationSelectById, selectLastMessageFromConversation, userSelectById } from "redux/slices/MessagesSlice";
import ConversationPreviewIcon from "./ConversationPreviewIcon/ConversationPreviewIcon"
import { Link } from 'react-router-dom';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import moment from 'moment';

interface ConversationsListPreviewItemProps {
	conversationId: string | number,
	isSelected: boolean
}

function ConversationsListPreviewItem({conversationId, isSelected}: ConversationsListPreviewItemProps) {
	const conversation = useSelector(conversationSelectById(conversationId)),
		lastMessage = useSelector(selectLastMessageFromConversation(conversation?.ConversationId || "")),
		lastMessageSender = useSelector(userSelectById(lastMessage?.SenderId || "")),
		loggedInUsername = useSelector(selectLoginContext).username;

	let textPreview,
		textPreviewText;

	if (conversation?.DraftMessage?.MessageText) {
		// Display Draft Message Text
		textPreviewText = `Draft: ${conversation?.DraftMessage?.MessageText}`;
		textPreview = (
			<div className="conversation-text-preview">
				<div className="text">{textPreviewText}</div>
			</div>
		);

	} else if (conversation?.DraftMessage) {
		// Display that there is a Draft
		textPreview = (
			<div className="conversation-text-preview">
				<div className="text">Draft Message</div>
			</div>
		);

	} else {
		// Display the most recent sent message
		let lastMessageText,
		lastMessageDateTime = moment(lastMessage?.DateTime).format("LT");

		if (lastMessageSender?.UserId === loggedInUsername) {
			lastMessageText = `You: ${lastMessage?.MessageText}`;
		} else if (conversation?.Participants?.length !== undefined && conversation?.Participants?.length > 2) {
			lastMessageText = `${lastMessageSender?.FirstName}: ${lastMessage?.MessageText}`;
		} else {
			lastMessageText = lastMessage?.MessageText;
		}

		textPreview = (
			<div className="conversation-text-preview">
				<div className="text">{lastMessageText}</div>
				<div className="date"> · {lastMessageDateTime}</div>
			</div>
		)
	}

	return (
	<Link to={`/messages/${conversation?.ConversationId}`} className={"conversation-list-preview-item" + (isSelected ? " selected" : "")}>
		<ConversationPreviewIcon conversationId={conversationId}></ConversationPreviewIcon>
		<div className="conversation-preview-text">
			<h3 className="conversation-preview-header">{conversation?.ConversationName}</h3>
			{textPreview}
		</div>
	</Link>
	
	);
}

export default ConversationsListPreviewItem;
