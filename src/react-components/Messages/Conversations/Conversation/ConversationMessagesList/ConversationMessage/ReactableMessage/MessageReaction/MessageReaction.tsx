import React from 'react';
import {IReaction} from 'typescript-types/Messages/IMessage';

import './MessageReaction.scss';

interface MessageReactionProps {
	reaction: IReaction,
	onClick?: () => void
}

function MessageReaction({reaction, onClick}: MessageReactionProps) {

	let reactionEmoji;

	switch(reaction.ReactionType) {
		case "love":
			reactionEmoji = "😘"
		break;
		case "laugh":
			reactionEmoji = "😆"
		break;
		case "angry":
			reactionEmoji = "😠"
		break;
		case "wow":
			reactionEmoji = "😮"
		break;
		case "thumbs-up":
			reactionEmoji = "👍"
		break;
		case "thumbs-down":
			reactionEmoji = "👎"
		break;
	}


	return (
	<div className="message-reaction" onClick={onClick}>
		{reactionEmoji} 
	</div>
	);
}

export default MessageReaction;
