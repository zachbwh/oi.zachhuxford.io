import React, { useState } from 'react';

import './ReactableMessage.scss';
import Message from 'typescript-types/Messages/IMessage';
import useLongPress from 'react-hooks/LongPress';
import ChooseMessageReaction from './ChooseMessageReaction/ChooseMessageReaction';
import MessageReactionsPreview from './MessageReactionsPreview/MessageReactionsPreview';
import Modal from 'react-components/ComponentLibrary/Modal/Modal';
import MessageReactionsList from './MessageReactionsList/MessageReactionsList';

interface ReactableMessageProps {
	message: Message
}

function ReactableMessage({message, children}: React.PropsWithChildren<ReactableMessageProps>) {	
	const [showReactions, setShowReactions] = useState(false);
	const [showReactionsModal, setShowReactionsModal] = useState(false);

	var longPressHandlers = useLongPress(() => {
		setShowReactions(true);
	});

	const hasReactionsClass = (message.Reactions?.length || 0) > 0 ? " has-reactions" : "";

	let messageReactionsList;
	if (showReactionsModal) {
		messageReactionsList = (
		<Modal closeModal={() => setShowReactionsModal(false)} modalRootId="conversation-modal-root">
			<MessageReactionsList message={message} close={() => setShowReactionsModal(false)}></MessageReactionsList>
		</Modal>);
	}

	return (
	<div className={"reactable-message" + hasReactionsClass} {...longPressHandlers}>
		<ChooseMessageReaction message={message} isVisible={showReactions} close={() => setShowReactions(false)}></ChooseMessageReaction>
		{children}
		<MessageReactionsPreview message={message} onClick={() => setShowReactionsModal(true)}></MessageReactionsPreview>
		{messageReactionsList}
	</div>
	);
}

export default ReactableMessage;
