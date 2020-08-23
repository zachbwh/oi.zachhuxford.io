import React from "react";

import './LoginNavBar.scss';

import ShortNameIcon from "react-components/BrandingAssets/ShortNameIcon/ShortNameIcon";

function LoginNavBar() {
	return (
		<div className="login-nav-bar">
			<div className="gradient-wrapper">
				<div className="gradient"></div>
			</div>
			<div className="nav-bar-content">
				<ShortNameIcon></ShortNameIcon>
			</div>
		</div>
	);
}

export default LoginNavBar;
