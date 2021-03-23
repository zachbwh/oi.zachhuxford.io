import React, { useEffect } from 'react';

import './Conversation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { conversationSelectIds, MessagesState, setConversations } from 'redux/slices/MessagesSlice';
import { useParams } from 'react-router-dom';
import ConversationNavBar from './ConversationNavBar/ConversationNavBar';
import ConversationMessagesList from './ConversationMessagesList/ConversationMessagesList';
import ConversationInput from './ConversationInput/ConversationInput';

function Conversation() {
	const dispatch = useDispatch();
	const conversationIds = useSelector(conversationSelectIds());
	let { conversationId } = useParams<{conversationId: string}>();

	useEffect(() => {
		fetch('/assets/conversations.json')
		.then(response => response.json())
		.then(((messages: MessagesState) => {
			if (conversationIds.length === 0) {
				dispatch(setConversations(messages));
			}
		}));
	}, [dispatch, conversationIds]);

	return (
	<div className="conversation">
		<ConversationNavBar conversationId={conversationId}></ConversationNavBar>
		<ConversationMessagesList conversationId={conversationId}></ConversationMessagesList>
		<ConversationInput conversationId={conversationId}></ConversationInput>
	</div>
	);
}

export default Conversation;
