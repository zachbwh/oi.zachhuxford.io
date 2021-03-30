import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import { conversationSelectById, setConversationDraftMessage, userSelectById } from 'redux/slices/MessagesSlice';

import './ReplyableMessage.scss';
import useSwipeMove from 'react-hooks/SwipeMove';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import Message from 'typescript-types/Messages/IMessage';
import IDraftMessage from 'typescript-types/Messages/IDraftMessage';

const ReplyableMessage: React.FunctionComponent<{message: Message, children: React.ReactNode}> = props => {
	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(props.message.SenderId))?.Username,
    	conversation = useSelector(conversationSelectById(props.message.ConversationId || "")),
		dispatch = useDispatch();

	let alignClassName : string;
	
	if (senderUsername === loggedInUsername) {
		alignClassName = "right-align"
	} else {
		alignClassName = "left-align"
	}

	const [replyProgress, setReplyProgress] = useState(0);

	function swipeTouchMove(referenceTouch: React.Touch, event: React.TouchEvent) {
		var newDeltaX = event.targetTouches[0].pageX - (referenceTouch?.pageX ?? 0);

		if (alignClassName === "right-align") {
			// must be between -110 and 0
			newDeltaX = Math.max(newDeltaX, -70);
			newDeltaX = Math.min(newDeltaX, 0);
		} else {
			// must be between 0 and 110
			newDeltaX = Math.min(newDeltaX, 70);
			newDeltaX = Math.max(newDeltaX, 0);
		}

		setReplyProgress(newDeltaX);
	}

	function setReplyMessage() {
		if (conversation) {
			const oldDraftMessage = conversation.DraftMessage,
				newDraftMessage: IDraftMessage = {
					ConversationId: conversation.ConversationId,
					MessageType: "reply",
					MessageText: oldDraftMessage?.MessageText,
					ImageUrls: oldDraftMessage?.ImageUrls,
					ReferenceMessageId: props.message.MessageId
				};
			dispatch(setConversationDraftMessage(newDraftMessage));
		}
	}
	

	function swipeTouchEnd() {
		if (Math.abs(replyProgress) > 60) {
			setReplyMessage();
		}
		setReplyProgress(0);
	}

	const replyTouchHandlers = useSwipeMove(swipeTouchMove, swipeTouchEnd)

	return (
	<div className={"replyable-message " +  alignClassName}  {...replyTouchHandlers} style={{transform: `translateX(${replyProgress * 1}px)` }}>
		<FontAwesomeIcon icon={faReply} className="reply-to-icon" style={{opacity: 0.01 * Math.abs(replyProgress)}}></FontAwesomeIcon>
		{props.children}
	</div>
	);
}

export default ReplyableMessage;
