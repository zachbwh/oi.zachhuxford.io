import React, { useRef, useState } from 'react';

import './ConversationInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from 'redux/slices/MessagesSlice';
import IConversation from 'typescript-types/Messages/IConversation';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';

const ConversationInput: React.FunctionComponent<{ conversationId: string}> = props => {
const ConversationInput: React.FunctionComponent<{ conversation: IConversation | undefined}> = props => {
    const [messageDraftValue, setMessageDraftValue] = useState('');
	const dispatch = useDispatch();
    const loginContent = useSelector(selectLoginContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const sendMessage = function() {
        if (messageDraftValue && messageDraftValue.trim().length > 0) {
            const newMessage = {
                "ConversationId": props.conversationId,
                "MessageType": "text",
                "SenderId": loginContent.userId,
                "MessageText": messageDraftValue
            }
            dispatch(addMessage(newMessage));

            setMessageDraftValue('');
            inputRef.current?.focus();
        }
    }

    const inputChanged = function(inputChangedEvent: React.ChangeEvent<HTMLInputElement>) {
        setMessageDraftValue(inputChangedEvent.target.value);
    }

    const handleKeyDown = function(keyDownEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyDownEvent.nativeEvent.code === "Enter" || keyDownEvent.keyCode === 13) {
            sendMessage()
        }
    }

	return (
	<div className="conversation-input">
        <input type="text" placeholder="Send Message" onChange={inputChanged} value={messageDraftValue} onKeyDown={handleKeyDown} ref={inputRef}></input>
        <FontAwesomeIcon icon={faArrowRight} onClick={sendMessage}></FontAwesomeIcon>
	</div>
	);
}

export default ConversationInput;
