import React from 'react';
import {IReaction} from 'typescript-types/Messages/IMessage';

import './MessageReaction.scss';

const MessageReaction: React.FunctionComponent<{reaction: IReaction, onClick?: () => void}> = props => {

	let reactionEmoji;

	switch(props.reaction.ReactionType) {
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
	<div className="message-reaction" onClick={props.onClick}>
		{reactionEmoji} 
	</div>
	);
}

export default MessageReaction;
