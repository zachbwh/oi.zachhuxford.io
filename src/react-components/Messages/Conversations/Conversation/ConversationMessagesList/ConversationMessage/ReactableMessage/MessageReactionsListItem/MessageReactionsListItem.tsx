import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserConversationName, userSelectById } from 'redux/slices/MessagesSlice';
import { IReaction } from 'typescript-types/Messages/IMessage';
import MessageReaction from '../MessageReaction/MessageReaction';

import './MessageReactionsListItem.scss';

const MessageReactionsListItem: React.FunctionComponent<{reaction: IReaction, conversationId: string}> = props => {
	const userConversationName = useSelector(selectUserConversationName(props.conversationId, props.reaction.UserId || ""));
	const user = useSelector(userSelectById(props.reaction.UserId || ""));

	return (
	<div className="message-reactions-list-item" key={props.reaction.UserId}>
		<div className="reacting-user">
			<img src={user?.ProfileImage} alt={user?.ProfileImageAltText}></img>
			<div className="name">{userConversationName}</div>
		</div>
		<MessageReaction reaction={props.reaction}></MessageReaction>
	</div>
	);
}

export default MessageReactionsListItem;

