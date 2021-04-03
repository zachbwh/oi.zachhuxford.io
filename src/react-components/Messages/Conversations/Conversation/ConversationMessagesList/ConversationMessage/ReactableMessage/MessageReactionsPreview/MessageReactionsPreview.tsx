import React from 'react';
import IMessage, { IReaction } from 'typescript-types/Messages/IMessage';
import MessageReaction from '../MessageReaction/MessageReaction';

import './MessageReactionsPreview.scss';

const MessageReactionsPreview: React.FunctionComponent<{message: IMessage, onClick?: () => void}> = props => {

	const groupedReactions: any = {};

	props.message.Reactions?.forEach((reaction: IReaction) => {
		if (!groupedReactions[reaction.ReactionType]) {
			groupedReactions[reaction.ReactionType] = [];
		}

		groupedReactions[reaction.ReactionType].push(reaction);
	});

	const reactionsPreview = Object.values(groupedReactions).map((reactionGroup: any, index: number) => <MessageReaction reaction={reactionGroup[0]} key={index} ></MessageReaction>)


	return (
	<div className="message-reactions-preview" onClick={props.onClick}>
		{reactionsPreview} {props.message.Reactions?.length || ""}
	</div>
	);
}

export default MessageReactionsPreview;
