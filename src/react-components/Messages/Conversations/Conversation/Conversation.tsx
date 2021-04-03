import React, { useEffect, useState } from 'react';

import './Conversation.scss';
import { useDispatch, useSelector } from 'react-redux';
import { conversationSelectIds, MessagesState, setConversations } from 'redux/slices/MessagesSlice';
import { useParams } from 'react-router-dom';
import ConversationNavBar from './ConversationNavBar/ConversationNavBar';
import ConversationMessagesList from './ConversationMessagesList/ConversationMessagesList';
import ConversationInput from './ConversationInput/ConversationInput';
import MessageActions from './ConversationMessagesList/ConversationMessage/MessageActions/MessageActions';

function Conversation() {
	const dispatch = useDispatch();
	const conversationIds = useSelector(conversationSelectIds());
	const [actionsMessageId, setActionsMessageId] = useState('');
	let messageActions;
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

	if (actionsMessageId !== null) {
		messageActions = <MessageActions messageId={actionsMessageId} close={() => {setActionsMessageId('')}}></MessageActions>
	} else {
		messageActions = null;
	}

	return (
	<div className="conversation">
		<ConversationNavBar conversationId={conversationId}></ConversationNavBar>
		<ConversationMessagesList conversationId={conversationId} showMessageActions={(messageId: string) => {setActionsMessageId(messageId)}}></ConversationMessagesList>
		<ConversationInput conversationId={conversationId}></ConversationInput>
		{messageActions}
		<div id="conversation-modal-root" className="modal-root hidden"></div>
	</div>
	);
}

export default Conversation;
