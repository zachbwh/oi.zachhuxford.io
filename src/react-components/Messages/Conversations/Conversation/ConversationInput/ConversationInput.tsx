import React, { useEffect, useRef, useState } from 'react';

import './ConversationInput.scss';
import ReplyDraft from './ReplyDraft/ReplyDraft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, conversationSelectById, setConversationDraftMessage } from 'redux/slices/MessagesSlice';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import useDebounce from 'react-hooks/Debounce';
import IDraftMessage from 'typescript-types/Messages/IDraftMessage';

const ConversationInput: React.FunctionComponent<{ conversationId: string}> = props => {
    const conversation = useSelector(conversationSelectById(props.conversationId));
    const replyToMessageId = conversation?.DraftMessage?.ReferenceMessageId || "";
    const [messageDraftTextValue, setMessageDraftTextValue] = useState(conversation?.DraftMessage?.MessageText || "");
    const debouncedMessageDraftText = useDebounce<string>(messageDraftTextValue, 500);
	const dispatch = useDispatch();
    const loginContent = useSelector(selectLoginContext);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let draftMessage: IDraftMessage;
        if (debouncedMessageDraftText && debouncedMessageDraftText.trim().length > 0) {
            draftMessage = {
                ConversationId: props.conversationId,
                MessageType: conversation?.DraftMessage?.MessageType || "text",
                MessageText: debouncedMessageDraftText,
                ReferenceMessageId: conversation?.DraftMessage?.ReferenceMessageId
            };

            dispatch(setConversationDraftMessage(draftMessage));
        }
    }, [debouncedMessageDraftText, dispatch, props.conversationId, conversation?.DraftMessage?.MessageType, conversation?.DraftMessage?.ReferenceMessageId]);

    const sendMessage = function() {
        if (messageDraftTextValue && messageDraftTextValue.trim().length > 0) {
            const newMessage = {
                ConversationId: props.conversationId,
                MessageType: conversation?.DraftMessage?.MessageType || "text",
                SenderId: loginContent.userId,
                MessageText: messageDraftTextValue,
                ReferenceMessageId: conversation?.DraftMessage?.ReferenceMessageId
            };

            dispatch(addMessage(newMessage));

            setMessageDraftTextValue('');
            removeConversationDraftReplyToMessage();
            inputRef.current?.focus();
        }
    }

    const inputChanged = function(inputChangedEvent: React.ChangeEvent<HTMLInputElement>) {
        setMessageDraftTextValue(inputChangedEvent.target.value);
    }

    const handleKeyDown = function(keyDownEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyDownEvent.nativeEvent.code === "Enter" || keyDownEvent.keyCode === 13) {
            sendMessage()
        }
    }

    function removeConversationDraftReplyToMessage() {
		const draftMessage = conversation?.DraftMessage;
		if (draftMessage) {
			var newDraftMessage: IDraftMessage = {
				ConversationId: draftMessage.ConversationId,
				MessageType: "text",
				MessageText: draftMessage.MessageText,
				ReferenceMessageId: draftMessage.ReferenceMessageId
			};

			dispatch(setConversationDraftMessage(newDraftMessage));

			setTimeout(() => {
				newDraftMessage = {
					ConversationId: draftMessage.ConversationId,
					MessageType: "text",
					MessageText: draftMessage.MessageText,
				};

				dispatch(setConversationDraftMessage(newDraftMessage));
			}, 500)
		}
	}

	return (
	<div className="conversation-input">
        <div className="input-wrapper">
            <ReplyDraft conversationId={props.conversationId} replyToMessageId={replyToMessageId} closeReply={removeConversationDraftReplyToMessage}></ReplyDraft>
            <input type="text" placeholder="Send Message" onChange={inputChanged} value={messageDraftTextValue} onKeyDown={handleKeyDown} ref={inputRef}></input>
        </div>
        <FontAwesomeIcon icon={faArrowRight} onClick={sendMessage}></FontAwesomeIcon>
	</div>
	);
}

export default ConversationInput;
