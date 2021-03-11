import moment from 'moment';
import React, { useState } from 'react';
import IMessage from 'typescript-types/Messages/IMessage';

import './ConversationMessage.scss';
import TextMessage from './TextMessage/TextMessage';

const ConversationMessage: React.FunctionComponent<{ message: IMessage }> = props => {

	var messageComponent;

	switch (props.message.MessageType) {
		case "text":
			messageComponent = <TextMessage message={props.message}></TextMessage>
			break;

		default:
			messageComponent = <TextMessage message={props.message}></TextMessage>
			break;
	}

	const [detailVisible, setDetailVisible] = useState(false);

	const toggleDetailVisible = () => {
		setDetailVisible(!detailVisible);
	}

	return (
	<div className="conversation-message" onClick={toggleDetailVisible}>
		<div className={"date " + (!detailVisible ? "hidden" : "")}>{moment(props.message.DateTime).format('ddd Do MMMM  YY h:mm a')}</div>
		{messageComponent}
	</div>
	);
}

export default ConversationMessage;
