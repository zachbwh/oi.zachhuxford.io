import React, { useEffect} from 'react';

import './ConversationsList.scss';
import { useDispatch, useSelector } from "react-redux";
import { conversationSelectIds, setConversations, MessagesState } from "redux/slices/MessagesSlice";
import ConversationsListPreviewItem from './ConversationsListPreviewItem/ConversationsListPreviewItem';

const ConversationsList: React.FunctionComponent<{ searchTerm: string }> = props => {
	const dispatch = useDispatch();
	const conversationIds = useSelector(conversationSelectIds());

	useEffect(() => {
		fetch('/assets/conversations.json')
		.then(response => response.json())
		.then(((messages: MessagesState) => {
			dispatch(setConversations(messages));
		}));
	}, [dispatch]);

	const conversationsList = conversationIds.map(conversationId => {
		return (
			<ConversationsListPreviewItem key={conversationId} conversationId={conversationId}></ConversationsListPreviewItem>
		);
	})

	return (
	<div className="conversation-list-container">
		{conversationsList}
	</div>
	);
}

export default ConversationsList;
