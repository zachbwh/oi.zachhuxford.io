import React from 'react';

import './ConversationPreviewIcon.scss';
import { useSelector } from 'react-redux';
import { conversationSelectById } from 'redux/slices/MessagesSlice';

function ConversationPreviewIcon({ conversationId }: { conversationId: string | number }) {
	const conversation = useSelector(conversationSelectById(conversationId));

	return (
	<div className="conversation-preview-icon">
		<img src={conversation?.ConversationImage} alt={conversation?.ConversationImageAltText}></img>
	</div>
	);
}

export default ConversationPreviewIcon;
