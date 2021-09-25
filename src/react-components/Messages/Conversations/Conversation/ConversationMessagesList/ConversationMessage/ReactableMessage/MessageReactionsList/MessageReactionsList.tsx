import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import IMessage from 'typescript-types/Messages/IMessage';
import MessageReactionsListItem from '../MessageReactionsListItem/MessageReactionsListItem';

import './MessageReactionsList.scss';

interface MessageReactionsListProps {
	message: IMessage,
	close: () => void
}

function MessageReactionsList({message, close}: MessageReactionsListProps) {
	const messageReactions = message.Reactions?.map(reaction => 
		<MessageReactionsListItem reaction={reaction} conversationId={message.ConversationId} key={reaction.UserId}></MessageReactionsListItem>
	)

	return (
	<div className={"message-reactions-list" + (messageReactions ? "" : " hidden")}>
		<div className="heading">Reactions <FontAwesomeIcon icon={faTimesCircle} onClick={close}></FontAwesomeIcon></div>
		<div className="reaction-list-wrapper">
			{messageReactions}
		</div>
	</div>
	);
}

export default MessageReactionsList;
