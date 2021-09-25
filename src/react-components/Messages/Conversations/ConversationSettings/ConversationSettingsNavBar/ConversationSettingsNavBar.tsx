import React from "react";

import './ConversationSettingsNavBar.scss';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { conversationSelectById } from "redux/slices/MessagesSlice";


function ConversationSettingsNavBar({conversationId}: {conversationId: string}) {
	const conversation = useSelector(conversationSelectById(conversationId));

	return (
		<div className="conversation-settings-nav-bar">
			<div className="nav-bar-content">
				<Link to={`/messages/${conversationId}`}><FontAwesomeIcon icon={faChevronLeft} /></Link>
		        <div className="conversation-icon"><img src={conversation?.ConversationImage} alt={conversation?.ConversationImageAltText}></img></div>
                <div className="conversation-title">Conversation Settings</div>
			</div>
		</div>
	);
}

export default ConversationSettingsNavBar;
