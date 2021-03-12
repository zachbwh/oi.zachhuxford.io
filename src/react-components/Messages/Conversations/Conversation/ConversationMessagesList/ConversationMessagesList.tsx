import React, { useEffect, useRef } from 'react';

import './ConversationMessagesList.scss';
import { useSelector } from 'react-redux';
import { messageSelectEntities } from 'redux/slices/MessagesSlice';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import ConversationMessage from './ConversationMessage/ConversationMessage';
import IConversation from 'typescript-types/Messages/IConversation';
import IMessage from 'typescript-types/Messages/IMessage';

const Conversation: React.FunctionComponent<{ conversation: IConversation | undefined }> = props => {
	let conversationBody;

	const listRef = useRef<Scrollbars>(null);

	useEffect(() => {
		listRef.current?.scrollToBottom();
	});

	var messages : IMessage[] = [];

		Object.values(useSelector(messageSelectEntities())).forEach(message => {
			if (typeof message !== "undefined" && props.conversation?.ConversationId === message.ConversationId) {
				messages.push(message);
			}
		});
	
		messages = messages.sort((a, b) => (new Date(a?.DateTime) || new Date()).getTime()  - (new Date(b?.DateTime) || new Date()).getTime());
	
		var conversationMessages = messages.map(message => <ConversationMessage message={message} key={message.MessageId}></ConversationMessage>)

		conversationBody = conversationMessages;

	if (props.conversation === undefined) {
		conversationBody = <div>404 Conversation Not Found <Link to="/messages"></Link></div>
	}

	return (
	<div className="conversation-messages-list">
		<Scrollbars ref={listRef}>
			{conversationBody}
			<div className="dummy-empty-div"></div>
		</Scrollbars>
	</div>
	);
}

export default Conversation;
