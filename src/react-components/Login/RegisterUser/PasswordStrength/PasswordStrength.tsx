import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn'

import './PasswordStrength.scss';

interface PasswordStrengthProps {
	password: string
}

const PasswordStrength : React.FunctionComponent<PasswordStrengthProps> = props => {
	const [passwordStrength, setPasswordStrength] = useState(-1);
	
	useEffect(() => {
		if (props.password) {
			var result = zxcvbn(props.password);
			setPasswordStrength(result.score);
		} else {
			setPasswordStrength(-1);
		}
	}, [props.password]);

	var strengthColour;

	switch (passwordStrength) {
		case -1:
		case 0:
		case 1:
			strengthColour = "red";
		break;
		case 2:
			strengthColour = "orange";
		break;
		case 3:
			strengthColour = "yellow";
		break;
		case 4:
			strengthColour = "green"
		break;
	}

	var strengthIndicator = (<div className={`${strengthColour}`} style={{"width": (passwordStrength + 1) * 20 + "%"}}></div>);

	return (
	<div className="password-strength">
		{strengthIndicator}
	</div>
	);
}

export default PasswordStrength;
