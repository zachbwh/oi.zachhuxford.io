import React, { useEffect, useRef } from 'react';

import './ConversationMessagesList.scss';
import { useSelector } from 'react-redux';
import { messageSelectEntities, selectLastMessageFromConversation } from 'redux/slices/MessagesSlice';
import { Scrollbars } from 'react-custom-scrollbars';
import ConversationMessage from './ConversationMessage/ConversationMessage';
import IMessage from 'typescript-types/Messages/IMessage';

interface ConversationMessagesListProps {
	conversationId: string,
	showMessageActions: (messageId: string) => void
}
function ConversationMessagesList({conversationId, showMessageActions}: ConversationMessagesListProps) {
	const listRef = useRef<Scrollbars>(null);

	const lastConversationMessage = useSelector(selectLastMessageFromConversation(conversationId))
	useEffect(() => {
		listRef.current?.scrollToTop();
	}, [lastConversationMessage?.MessageId]);

	var messages : IMessage[] = [];

	Object.values(useSelector(messageSelectEntities())).forEach(message => {
		if (typeof message !== "undefined" && conversationId === message.ConversationId) {
			messages.push(message);
		}
	});

	// Sort order is reversed as the List is flipped and it's Children are flipped back
	// This is so when the list height it increased, it expands upwards instead of downwards
	messages = messages.sort((a, b) => (new Date(a?.DateTime) || new Date()).getTime()  - (new Date(b?.DateTime) || new Date()).getTime());

	var conversationMessages = messages.map((message, index) => {
		const messageId = message.MessageId;
		return (<ConversationMessage message={message} key={messageId} showMessageActions={showMessageActions} zIndex={index}></ConversationMessage>);
	});

	return (
	<div className="conversation-messages-list">
		<Scrollbars ref={listRef}>
			<div className="messages-wrapper">{conversationMessages}</div>
		</Scrollbars>
	</div>
	);
}

export default ConversationMessagesList;
