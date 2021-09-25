import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn'

import './PasswordStrength.scss';

interface PasswordStrengthProps {
	password: string
}

function PasswordStrength({password}: PasswordStrengthProps) {
	const [passwordStrength, setPasswordStrength] = useState(-1);
	
	useEffect(() => {
		if (password) {
			var result = zxcvbn(password);
			setPasswordStrength(result.score);
		} else {
			setPasswordStrength(-1);
		}
	}, [password]);

	var strengthIndicator = (<div style={{"width": (passwordStrength + 1) * 20 + "%"}}></div>);

	return (
	<div className="password-strength">
		{strengthIndicator}
	</div>
	);
}

export default PasswordStrength;
