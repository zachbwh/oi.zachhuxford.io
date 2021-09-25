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

interface ReplyableMessageProps {
	message: Message
}

function ReplyableMessage({ message, children }: React.PropsWithChildren<ReplyableMessageProps>) {
	const loggedInUsername = useSelector(selectLoginContext).username,
		senderUsername = useSelector(userSelectById(message.SenderId))?.Username,
    	conversation = useSelector(conversationSelectById(message.ConversationId || "")),
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
			newDeltaX = Math.max(newDeltaX, -200);
			newDeltaX = Math.min(newDeltaX, 0);
		} else {
			// must be between 0 and 110
			newDeltaX = Math.min(newDeltaX, 200);
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
					ReferenceMessageId: message.MessageId
				};
			dispatch(setConversationDraftMessage(newDraftMessage));
		}
	}
	

	function swipeTouchEnd() {
		if (Math.abs(replyProgress) > 100) {
			setReplyMessage();
		}
		setReplyProgress(0);
	}

	let replyProgressTranslateValue;
	if (replyProgress < 10 && replyProgress > -10) {
		replyProgressTranslateValue = 0
	} else if (replyProgress < -100) {
		replyProgressTranslateValue = -100 + (0.1 * replyProgress)
	} else if (replyProgress > 100) {
		replyProgressTranslateValue = 100 + (0.1 * replyProgress)
	} else {
		replyProgressTranslateValue = replyProgress;
	}

	const replyTouchHandlers = useSwipeMove(swipeTouchMove, swipeTouchEnd)

	return (
	<div className={"replyable-message " +  alignClassName + (replyProgress < -100 && replyProgress > 100 ? " slow" : "")}  {...replyTouchHandlers} style={{transform: `translateX(${replyProgressTranslateValue * 1}px)` }}>
		<FontAwesomeIcon icon={faReply} className={"reply-to-icon" + (Math.abs(replyProgress) > 100 ? " animate" : "")} style={{opacity: 0.01 * Math.abs(replyProgress)}}></FontAwesomeIcon>
		{children}
	</div>
	);
}

export default ReplyableMessage;
