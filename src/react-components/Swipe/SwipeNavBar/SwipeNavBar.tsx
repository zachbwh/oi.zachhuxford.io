import React from "react";

import './SwipeNavBar.scss';

import SquareIcon from "react-components/BrandingAssets/SquareIcon/SquareIcon";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComments } from "@fortawesome/free-solid-svg-icons";

function SwipeNavBar() {
	return (
		<div className="swipe-nav-bar">
			<div className="gradient-wrapper">
				<div className="gradient"></div>
			</div>
			<div className="nav-bar-content">
				<Link to="/swipe/profile"><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></Link>
				<Link to="/swipe"><SquareIcon></SquareIcon></Link>
				<Link to="/messages"><FontAwesomeIcon icon={faComments}></FontAwesomeIcon></Link>
			</div>
		</div>
	);
}

export default SwipeNavBar;
