import React from "react";

import './ConversationNavBar.scss';

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import IConversation from "typescript-types/Messages/IConversation";


const ConversationNavBar: React.FunctionComponent<{conversation: IConversation | undefined}> = props => {
	return (
		<div className="conversation-nav-bar">
			<div className="nav-bar-content">
				<Link to="/messages"><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></Link>
		        <div className="conversation-icon"><img src={props.conversation?.ConversationImage} alt={props.conversation?.ConversationImageAltText}></img></div>
                <div className="conversation-title">{props.conversation?.ConversationName}</div>
			</div>
		</div>
	);
}

export default ConversationNavBar;
