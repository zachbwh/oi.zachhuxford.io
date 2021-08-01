import React from 'react';

import './ReplyDraft.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { conversationSelectById, messageSelectById } from 'redux/slices/MessagesSlice';
import TextMessage from 'react-components/Messages/Conversations/Conversation/ConversationMessagesList/ConversationMessage/TextMessage/TextMessage';
import DeletedMessage from 'react-components/Messages/Conversations/Conversation/ConversationMessagesList/ConversationMessage/DeletedMessage/DeletedMessage';
import ImagesMessage from 'react-components/Messages/Conversations/Conversation/ConversationMessagesList/ConversationMessage/ImagesMessage/ImagesMessage';
import {isTextMessage} from 'typescript-types/Messages/ITextMessage';
import {isReplyMessage} from 'typescript-types/Messages/IReplyMessage';
import {isDeletedMessage} from 'typescript-types/Messages/IDeletedMessage';
import {isImagesMessage} from 'typescript-types/Messages/IImagesMessage';

const ReplyDraft: React.FunctionComponent<{ conversationId: string, replyToMessageId: string, closeReply: () => void}> = props => {
    const conversation = useSelector(conversationSelectById(props.conversationId));
    const replyToMessage = useSelector(messageSelectById(conversation?.DraftMessage?.ReferenceMessageId || ""));

    let replyToComponent;

	if (typeof replyToMessage === "undefined") {
		
	} else if (isTextMessage(replyToMessage) || isReplyMessage(replyToMessage)) {
		replyToComponent = <TextMessage message={replyToMessage}></TextMessage>

	} else if (isDeletedMessage(replyToMessage)) {
		replyToComponent = <DeletedMessage message={replyToMessage}></DeletedMessage>

	} else if (isImagesMessage(replyToMessage)) {
		replyToComponent = <ImagesMessage message={replyToMessage}></ImagesMessage>
	}

	return (
	<div className="reply-draft" style={conversation?.DraftMessage?.MessageType === "reply" ? {} : { height: "0px", marginBottom: "0px"}}>
        {replyToComponent}
        <FontAwesomeIcon icon={faTimesCircle} onClick={props.closeReply}></FontAwesomeIcon>
	</div>
	);
}

export default ReplyDraft;
