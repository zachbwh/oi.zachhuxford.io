import React from "react";

import './ConversationNavBar.scss';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { conversationSelectById } from "redux/slices/MessagesSlice";


const ConversationNavBar: React.FunctionComponent<{conversationId: string}> = props => {
	const conversation = useSelector(conversationSelectById(props.conversationId));

	return (
		<div className="conversation-nav-bar">
			<div className="nav-bar-content">
				<Link to="/messages"><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></Link>
		        <div className="conversation-icon"><img src={conversation?.ConversationImage} alt={conversation?.ConversationImageAltText}></img></div>
                <div className="conversation-title">{conversation?.ConversationName}</div>
			</div>
		</div>
	);
}

export default ConversationNavBar;
