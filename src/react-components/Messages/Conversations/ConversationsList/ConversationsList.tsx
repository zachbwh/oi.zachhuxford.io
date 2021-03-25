import React, { useEffect} from 'react';

import './ConversationsList.scss';
import { useDispatch, useSelector } from "react-redux";
import { conversationSelectIds, setConversations, MessagesState } from "redux/slices/MessagesSlice";
import ConversationsListPreviewItem from './ConversationsListPreviewItem/ConversationsListPreviewItem';
import { useParams } from 'react-router-dom';

const ConversationsList: React.FunctionComponent<{ searchTerm: string }> = props => {
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

	const conversationsList = conversationIds.map(listConversationId => {
		return (
			<ConversationsListPreviewItem key={listConversationId} conversationId={listConversationId} isSelected={listConversationId === conversationId}></ConversationsListPreviewItem>
		);
	})

	return (
	<div className="conversation-list-container">
		{conversationsList}
	</div>
	);
}

export default ConversationsList;
