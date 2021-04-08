import React from "react";

import './SwipeNavBar.scss';

import SquareIcon from "react-components/BrandingAssets/SquareIcon/SquareIcon";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComments } from "@fortawesome/free-solid-svg-icons";

const SwipeNavBar: React.FunctionComponent<{showMessagesLink?: boolean}> = props =>  {
	let messagesLink;

	if (props.showMessagesLink) {
		messagesLink = <Link to="/messages"><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></Link>
	}
	return (
		<div className="swipe-nav-bar">
			<div className="nav-bar-content">
				<Link to="/swipe"><SquareIcon></SquareIcon></Link>
				<Link to="/swipe/profile"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></Link>
				{messagesLink}
			</div>
		</div>
	);
}

export default SwipeNavBar;
