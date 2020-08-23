import React from "react";

import './NavBar.scss';

import SquareIcon from "react-components/BrandingAssets/SquareIcon/SquareIcon";

function NavBar() {
	return (
		<div className="nav-bar">
			<div className="gradient-wrapper">
				<div className="gradient"></div>
			</div>
			<div className="nav-bar-content">
				<SquareIcon></SquareIcon>
			</div>
		</div>
	);
}

export default NavBar;
