import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserConversationName, userSelectById } from 'redux/slices/MessagesSlice';
import { IReaction } from 'typescript-types/Messages/IMessage';
import MessageReaction from '../MessageReaction/MessageReaction';

import './MessageReactionsListItem.scss';

interface MessageReactionsListItemProps {
	reaction: IReaction,
	conversationId: string
}

function MessageReactionsListItem({reaction, conversationId}: MessageReactionsListItemProps) {
	const userConversationName = useSelector(selectUserConversationName(conversationId, reaction.UserId || ""));
	const user = useSelector(userSelectById(reaction.UserId || ""));

	return (
	<div className="message-reactions-list-item">
		<div className="reacting-user">
			<img src={user?.ProfileImage} alt={user?.ProfileImageAltText}></img>
			<div className="name">{userConversationName}</div>
		</div>
		<MessageReaction reaction={reaction}></MessageReaction>
	</div>
	);
}

export default MessageReactionsListItem;

