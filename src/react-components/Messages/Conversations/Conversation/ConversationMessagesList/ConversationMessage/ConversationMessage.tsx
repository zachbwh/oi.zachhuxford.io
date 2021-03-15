import moment from 'moment';
import React, { useState } from 'react';
import IMessage from 'typescript-types/Messages/IMessage';

import './ConversationMessage.scss';
import TextMessage from './TextMessage/TextMessage';

const ConversationMessage: React.FunctionComponent<{ message: IMessage }> = props => {

	let messageComponent;
	const [detailVisible, setDetailVisible] = useState(false);

	const toggleDetailVisible = () => {
		setDetailVisible(!detailVisible);
	}

	switch (props.message.MessageType) {
		case "text":
			messageComponent = <TextMessage message={props.message} onClick={toggleDetailVisible} onClickOutside={() => setDetailVisible(false)}></TextMessage>
			break;

		default:
			messageComponent = <TextMessage message={props.message} onClick={toggleDetailVisible}></TextMessage>
			break;
	}

	return (
	<div className="conversation-message">
		<div className={"date " + (!detailVisible ? "hidden" : "")}>{moment(props.message.DateTime).format('ddd Do MMMM  YY h:mm a')}</div>
		{messageComponent}
	</div>
	);
}

export default ConversationMessage;
