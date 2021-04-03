import React, { useRef } from 'react';
import useClickOutside from 'react-hooks/ClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { addReactionToMessage } from 'redux/slices/MessagesSlice';
import IMessage, { IReaction } from 'typescript-types/Messages/IMessage';
import MessageReaction from '../MessageReaction/MessageReaction';

import './ChooseMessageReaction.scss';

const ChooseMessageReaction: React.FunctionComponent<{isVisible: boolean, message: IMessage, close: () => void}> = props => {
	const loginContext = useSelector(selectLoginContext);
	const dispatch = useDispatch();

	function setReaction(reaction: IReaction) {
		reaction.UserId = loginContext.userId;
		reaction.MessageId = props.message.MessageId;

		dispatch(addReactionToMessage({newReaction: reaction, currentReactions: props.message.Reactions || []}));
		props.close();
	}

	const chooseMessageReactionRef = useRef(null)

	useClickOutside(chooseMessageReactionRef, () => {
		props.close();
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
	<div className={"choose-message-reaction" + (props.isVisible ? "" : " hidden")} ref={chooseMessageReactionRef}>
		{messageReactions}
	</div>
	);
}

export default ChooseMessageReaction;
