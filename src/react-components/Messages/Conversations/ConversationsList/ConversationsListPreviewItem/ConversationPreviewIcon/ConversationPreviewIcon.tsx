import React from 'react';

import './ConversationPreviewIcon.scss';
import { useSelector } from 'react-redux';
import { conversationSelectById } from 'redux/slices/MessagesSlice';

const ConversationPreviewIcon: React.FunctionComponent<{ conversationId: string | number }> = props => {

	const conversation = useSelector(conversationSelectById(props.conversationId));


	return (
	<div className="conversation-preview-icon">
		<img src={conversation?.ConversationImage} alt={conversation?.ConversationImageAltText}></img>
	</div>
	);
}

export default ConversationPreviewIcon;
