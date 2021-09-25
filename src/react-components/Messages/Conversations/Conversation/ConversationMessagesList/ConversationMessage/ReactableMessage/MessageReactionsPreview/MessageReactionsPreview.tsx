import React from 'react';
import IMessage, { IReaction } from 'typescript-types/Messages/IMessage';
import MessageReaction from '../MessageReaction/MessageReaction';

import './MessageReactionsPreview.scss';

interface MessageReactionsPreviewProps {
	message: IMessage,
	onClick?: () => void
}

function MessageReactionsPreview({message, onClick}: MessageReactionsPreviewProps) {

	const groupedReactions: any = {};

	message.Reactions?.forEach((reaction: IReaction) => {
		if (!groupedReactions[reaction.ReactionType]) {
			groupedReactions[reaction.ReactionType] = [];
		}

		groupedReactions[reaction.ReactionType].push(reaction);
	});

	const reactionsPreview = Object.values(groupedReactions)
		.map((reactionGroup: any, index: number) => <MessageReaction reaction={reactionGroup[0]} key={index} ></MessageReaction>)

	return (
	<div className="message-reactions-preview" onClick={onClick}>
		{reactionsPreview} {message.Reactions?.length || ""}
	</div>
	);
}

export default MessageReactionsPreview;
