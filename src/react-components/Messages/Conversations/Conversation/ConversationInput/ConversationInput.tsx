import React, { useState } from 'react';

import './ConversationInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from 'redux/slices/MessagesSlice';
import IConversation from 'typescript-types/Messages/IConversation';
import { selectLoginContext } from 'redux/slices/LoginContextSlice';

const ConversationInput: React.FunctionComponent<{ conversation: IConversation | undefined}> = props => {
    const [messageDraftValue, setMessageDraftValue] = useState('');
	const dispatch = useDispatch();
    const loginContent = useSelector(selectLoginContext);

    const sendMessage = function() {
        if (messageDraftValue) {
            const newMessage = {
                "ConversationId": props.conversation?.ConversationId || "",
                "MessageType": "text",
                "SenderId": loginContent.userId,
                "MessageText": messageDraftValue
            }
            dispatch(addMessage(newMessage))
        }
        setMessageDraftValue('');
    }

    const inputChanged = function(inputChangedEvent: React.ChangeEvent<HTMLInputElement>) {
        setMessageDraftValue(inputChangedEvent.target.value);
    }

    const handleKeyDown = function(keyDownEvent: React.KeyboardEvent<HTMLInputElement>) {
        if (keyDownEvent.nativeEvent.code === "Enter") {
            sendMessage()
        } else {
            setMessageDraftValue(keyDownEvent.nativeEvent.code);
            sendMessage()
        }
    }

	return (
	<div className="conversation-input">
        <input type="text" placeholder="Send Message" onChange={inputChanged} value={messageDraftValue} onKeyDown={handleKeyDown}></input>
        <FontAwesomeIcon icon={faArrowRight} onClick={sendMessage}></FontAwesomeIcon>
	</div>
	);
}

export default ConversationInput;
