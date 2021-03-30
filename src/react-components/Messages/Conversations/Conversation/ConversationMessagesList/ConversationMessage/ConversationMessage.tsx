import moment from 'moment';
import React, { useState } from 'react';
import IMessage from 'typescript-types/Messages/IMessage';
import DeletedMessage from './DeletedMessage/DeletedMessage';
import ImagesMessage from './ImagesMessage/ImagesMessage';
import ReplyMessage from './ReplyMessage/ReplyMessage';
import TextMessage from './TextMessage/TextMessage';

import './ConversationMessage.scss';
import ReplyableMessage from './ReplyableMessage/ReplyableMessage';

const ConversationMessage: React.FunctionComponent<{ message: IMessage, showMessageActions: (messageId: string) => void }> = props => {
	function showMessageActions() {
		props.showMessageActions(props.message.MessageId)
	}

	const [detailVisible, setDetailVisible] = useState(false);

	const toggleDetailVisible = () => {
		setDetailVisible(!detailVisible);
	}

	let messageComponent;

	switch (props.message.MessageType) {
		case "reply":
			messageComponent = <ReplyableMessage message={props.message}><ReplyMessage
				message={props.message}
				onClick={toggleDetailVisible}
				onClickOutside={() => setDetailVisible(false)}
				onLongPress={showMessageActions}
			></ReplyMessage></ReplyableMessage>
			break;

		case "text":
			messageComponent = <ReplyableMessage message={props.message}><TextMessage
				message={props.message}
				onClick={toggleDetailVisible}
				onClickOutside={() => setDetailVisible(false)}
				onLongPress={showMessageActions}
			></TextMessage></ReplyableMessage>
			break;

		case "images":
			messageComponent = <ReplyableMessage message={props.message}><ImagesMessage
				message={props.message}
				onClick={toggleDetailVisible}
				onClickOutside={() => setDetailVisible(false)}
				onLongPress={showMessageActions}
			></ImagesMessage></ReplyableMessage>
			break;
			
		default:
			messageComponent = <DeletedMessage
				message={props.message}
				onClick={toggleDetailVisible}
				onClickOutside={() => setDetailVisible(false)}
			></DeletedMessage>
			break;
	}

	return (
	<div className="conversation-message" >
		<div className={"date " + (!detailVisible ? "hidden" : "")}>{moment(props.message.DateTime).format('ddd Do MMMM  YY h:mm a')}</div>
		{messageComponent}
	</div>
	);
}

export default ConversationMessage;
