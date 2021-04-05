import React from "react";

import './ConversationSettingsNavBar.scss';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { conversationSelectById } from "redux/slices/MessagesSlice";


const ConversationSettingsNavBar: React.FunctionComponent<{conversationId: string}> = props => {
	const conversation = useSelector(conversationSelectById(props.conversationId));

	return (
		<div className="conversation-settings-nav-bar">
			<div className="nav-bar-content">
				<Link to={`/messages/${props.conversationId}`}><FontAwesomeIcon icon={faChevronLeft} /></Link>
		        <div className="conversation-icon"><img src={conversation?.ConversationImage} alt={conversation?.ConversationImageAltText}></img></div>
                <div className="conversation-title">Conversation Settings</div>
			</div>
		</div>
	);
}

export default ConversationSettingsNavBar;
