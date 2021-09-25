import React, { useRef } from 'react';
import useClickOutside from 'react-hooks/ClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { addReactionToMessage } from 'redux/slices/MessagesSlice';
import IMessage, { IReaction } from 'typescript-types/Messages/IMessage';
import MessageReaction from '../MessageReaction/MessageReaction';

import './ChooseMessageReaction.scss';

interface ChooseMessageReactionProps {
	isVisible: boolean,
	message: IMessage,
	close: () => void
}

function ChooseMessageReaction({isVisible, message, close}: ChooseMessageReactionProps) {
	const loginContext = useSelector(selectLoginContext);
	const dispatch = useDispatch();

	function setReaction(reaction: IReaction) {
		reaction.UserId = loginContext.userId;
		reaction.MessageId = message.MessageId;

		dispatch(addReactionToMessage({newReaction: reaction, currentReactions: message.Reactions || []}));
		close();
	}

	const chooseMessageReactionRef = useRef(null)

	useClickOutside(chooseMessageReactionRef, () => {
		close();
	})

	const reactions: IReaction[] = [
		{ ReactionType: "love" },
		{ ReactionType: "laugh" },
		{ ReactionType: "angry" },
		{ ReactionType: "wow" },
		{ ReactionType: "thumbs-up" },
		{ ReactionType: "thumbs-down" },
	];

	const messageReactions = reactions.map(reaction => <MessageReaction reaction={reaction} key={reaction.ReactionType} onClick={() => setReaction(reaction)}></MessageReaction>)

	return (
	<div className={"choose-message-reaction" + (isVisible ? "" : " hidden")} ref={chooseMessageReactionRef}>
		{messageReactions}
	</div>
	);
}

export default ChooseMessageReaction;
