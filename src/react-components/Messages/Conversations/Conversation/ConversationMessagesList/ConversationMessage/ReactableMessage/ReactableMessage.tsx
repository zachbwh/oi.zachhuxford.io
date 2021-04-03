import React, { useState } from 'react';

import './ReactableMessage.scss';
import Message from 'typescript-types/Messages/IMessage';
import useLongPress from 'react-hooks/LongPress';
import ChooseMessageReaction from './ChooseMessageReaction/ChooseMessageReaction';
import MessageReactionsPreview from './MessageReactionsPreview/MessageReactionsPreview';
import Modal from 'react-components/ComponentLibrary/Modal/Modal';
import MessageReactionsList from './MessageReactionsList/MessageReactionsList';

const ReactableMessage: React.FunctionComponent<{message: Message, children: React.ReactNode}> = props => {	
	const [showReactions, setShowReactions] = useState(false);
	const [showReactionsModal, setShowReactionsModal] = useState(false);

	var longPressHandlers = useLongPress(() => {
		setShowReactions(true);
	});

	const hasReactionsClass = (props.message.Reactions?.length || 0) > 0 ? " has-reactions" : "";

	let messageReactionsList;
	if (showReactionsModal) {
		messageReactionsList = <MessageReactionsList message={props.message} close={() => setShowReactionsModal(false)}></MessageReactionsList>;
	}

	return (
	<div className={"reactable-message" + hasReactionsClass} {...longPressHandlers}>
		<ChooseMessageReaction message={props.message} isVisible={showReactions} close={() => setShowReactions(false)}></ChooseMessageReaction>
		{props.children}
		<MessageReactionsPreview message={props.message} onClick={() => setShowReactionsModal(true)}></MessageReactionsPreview>
		<Modal closeModal={() => setShowReactionsModal(false)} modalRootId="conversation-modal-root">{messageReactionsList}</Modal>
	</div>
	);
}

export default ReactableMessage;
