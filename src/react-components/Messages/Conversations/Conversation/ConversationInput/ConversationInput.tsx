import React, { useEffect, useRef, useState } from 'react';

import './ConversationInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setConversationDraftMessage } from 'redux/slices/MessagesSlice';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';
import useDebounce from 'react-hooks/Debounce';
import IDraftMessage from 'typescript-types/Messages/IDraftMessage';

const ConversationInput: React.FunctionComponent<{ conversationId: string}> = props => {
    const [messageDraftTextValue, setMessageDraftTextValue] = useState('');
    const debouncedMessageDraftText = useDebounce<string>(messageDraftTextValue, 500);
	const dispatch = useDispatch();
    const loginContent = useSelector(selectLoginContext);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (debouncedMessageDraftText && debouncedMessageDraftText.trim().length > 0) {
            const draftMessage: IDraftMessage = {
                ConversationId: props.conversationId,
                MessageType: "text",
                MessageText: debouncedMessageDraftText,
            };

            dispatch(setConversationDraftMessage(draftMessage))
        }
    }, [debouncedMessageDraftText, dispatch, props.conversationId]);

    const sendMessage = function() {
        if (messageDraftTextValue && messageDraftTextValue.trim().length > 0) {
            const newMessage = {
                "ConversationId": props.conversationId,
                "MessageType": "text",
                "SenderId": loginContent.userId,
                "MessageText": messageDraftTextValue
            }
            dispatch(addMessage(newMessage));

            setMessageDraftTextValue('');
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

	return (
	<div className="conversation-input">
        <input type="text" placeholder="Send Message" onChange={inputChanged} value={messageDraftTextValue} onKeyDown={handleKeyDown} ref={inputRef}></input>
        <FontAwesomeIcon icon={faArrowRight} onClick={sendMessage}></FontAwesomeIcon>
	</div>
	);
}

export default ConversationInput;
