import React, { useEffect } from 'react';

import './Conversation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { conversationSelectById, MessagesState, setConversations } from 'redux/slices/MessagesSlice';
import { useParams } from 'react-router-dom';
import ConversationNavBar from './ConversationNavBar/ConversationNavBar';
import ConversationMessagesList from './ConversationMessagesList/ConversationMessagesList';
import ConversationInput from './ConversationInput/ConversationInput';

function Conversation() {
	const dispatch = useDispatch();
	let { conversationId } = useParams<{conversationId: string}>();

	useEffect(() => {
		fetch('/assets/conversations.json')
		.then(response => response.json())
		.then(((messages: MessagesState) => {
			dispatch(setConversations(messages));
		}));
	}, [dispatch]);

	const conversation = useSelector(conversationSelectById(conversationId));
	
	return (
	<div className="conversation">
		<ConversationNavBar conversation={conversation}></ConversationNavBar>
		<ConversationMessagesList conversation={conversation}></ConversationMessagesList>
		<ConversationInput conversation={conversation}></ConversationInput>
	</div>
	);
}

export default Conversation;
