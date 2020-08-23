import React from "react";

import './SwipeNavBar.scss';

import SquareIcon from "react-components/BrandingAssets/SquareIcon/SquareIcon";

function SwipeNavBar() {
	return (
		<div className="swipe-nav-bar">
			<div className="gradient-wrapper">
				<div className="gradient"></div>
			</div>
			<div className="nav-bar-content">
				<SquareIcon></SquareIcon>
			</div>
		</div>
	);
}

export default SwipeNavBar;
