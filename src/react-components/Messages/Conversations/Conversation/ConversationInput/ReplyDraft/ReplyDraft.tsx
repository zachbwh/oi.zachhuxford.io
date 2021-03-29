import React from 'react';

import './ReplyDraft.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { conversationSelectById, messageSelectById } from 'redux/slices/MessagesSlice';
import TextMessage from 'react-components/Messages/Conversations/Conversation/ConversationMessagesList/ConversationMessage/TextMessage/TextMessage';
import DeletedMessage from 'react-components/Messages/Conversations/Conversation/ConversationMessagesList/ConversationMessage/DeletedMessage/DeletedMessage';
import ImagesMessage from 'react-components/Messages/Conversations/Conversation/ConversationMessagesList/ConversationMessage/ImagesMessage/ImagesMessage';

const ReplyDraft: React.FunctionComponent<{ conversationId: string, replyToMessageId: string, closeReply: () => void}> = props => {
    const conversation = useSelector(conversationSelectById(props.conversationId));
    const replyToMessage = useSelector(messageSelectById(conversation?.DraftMessage?.ReferenceMessageId || ""));

    let replyToComponent;

	switch (replyToMessage?.MessageType) {
		case "text":
		case "reply":
			replyToComponent = <TextMessage message={replyToMessage} isReply={true}></TextMessage>
			break;
		case "deleted":
			replyToComponent = <DeletedMessage message={replyToMessage} isReply={true}></DeletedMessage>
		break;
		case "images":
			replyToComponent = <ImagesMessage message={replyToMessage} isReply={true}></ImagesMessage>
		break;
	}

	return (
	<div className="reply-draft" style={conversation?.DraftMessage?.MessageType === "reply" ? {} : { height: "0px", marginBottom: "0px"}}>
        {replyToComponent}
        <FontAwesomeIcon icon={faTimesCircle} onClick={props.closeReply}></FontAwesomeIcon>
	</div>
	);
}

export default ReplyDraft;
