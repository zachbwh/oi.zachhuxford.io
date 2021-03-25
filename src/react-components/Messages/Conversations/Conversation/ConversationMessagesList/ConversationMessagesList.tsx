import React, { useEffect, useRef } from 'react';

import './ConversationMessagesList.scss';
import { useSelector } from 'react-redux';
import { messageSelectEntities } from 'redux/slices/MessagesSlice';
import { Scrollbars } from 'react-custom-scrollbars';
import ConversationMessage from './ConversationMessage/ConversationMessage';
import IMessage from 'typescript-types/Messages/IMessage';

const Conversation: React.FunctionComponent<{ conversationId: string }> = props => {
	let conversationBody;

	const listRef = useRef<Scrollbars>(null);

	useEffect(() => {
		listRef.current?.scrollToTop();
	});

	var messages : IMessage[] = [];

	Object.values(useSelector(messageSelectEntities())).forEach(message => {
		if (typeof message !== "undefined" && props.conversationId === message.ConversationId) {
			messages.push(message);
		}
	});

	// Sort order is reversed as the List is flipped and it's Children are flipped back
	// This is so when the list height it increased, it expands upwards instead of downwards
	messages = messages.sort((b, a) => (new Date(a?.DateTime) || new Date()).getTime()  - (new Date(b?.DateTime) || new Date()).getTime());

	var conversationMessages = messages.map(message => <ConversationMessage message={message} key={message.MessageId}></ConversationMessage>)

	conversationBody = conversationMessages;

	return (
	<div className="conversation-messages-list">
		<Scrollbars ref={listRef}>
			{conversationBody}
		</Scrollbars>
	</div>
	);
}

export default Conversation;
