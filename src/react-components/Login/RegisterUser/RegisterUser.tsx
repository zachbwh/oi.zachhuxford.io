import React, { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn'
import ShortNameIcon from 'react-components/BrandingAssets/ShortNameIcon/ShortNameIcon';

import './RegisterUser.scss';
import PasswordStrength from './PasswordStrength/PasswordStrength';

function RegisterUser() {
	const [emailAddress, setEmailAddress] = useState('');
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordFeedback, setPasswordFeedback] = useState('');
	const [passwordFeedbackVisible, setPasswordFeedbackVisible] = useState(false);

	const [registerStage, setRegisterStage] = useState(1);

	const registerUser = function() {
		// validate inputs before posting
		// post details to server
		// cache JWT?
		// load success scree
	}

	const handleNextButtonClick = function() {
		setRegisterStage(registerStage + 1);
	}

	const handlePreviousButtonClick = function() {
		setRegisterStage(registerStage - 1);
	}

	const handleRegisterButtonClick = function() {
		setRegisterStage(registerStage + 1);
		registerUser();
	}

	useEffect(() => {
		var newPasswordFeedback : string;

		if (!password && !confirmPassword) {
			newPasswordFeedback = ""
		} else if (!password && confirmPassword) {
			newPasswordFeedback = "Please Enter Password"
		} else if (password.length > 0 && password.length < 8) {
			newPasswordFeedback = "Password Minimum Length: 8"
		} else if (!confirmPassword) {
			var zxcvbnScore = zxcvbn(password).score;

			switch(zxcvbnScore) {
				case 0:
					newPasswordFeedback = "Password Strength: Very Weak"
				break;
				case 1:
					newPasswordFeedback = "Password Strength: Weak"
				break;
				case 2:
					newPasswordFeedback = "Password Strength: Medium"
				break;
				case 3:
					newPasswordFeedback = "Password Strength: Good"
				break;
				case 4:
					newPasswordFeedback = "Password Strength: Very Good"
				break;
			}
		} else if (password !== confirmPassword) {
			newPasswordFeedback = "Passwords Must Match"
		} else {
			newPasswordFeedback = "";
		}

		if (passwordFeedback !== newPasswordFeedback) {
			setPasswordFeedbackVisible(false);
		}

		setTimeout(() => {
			setPasswordFeedback(newPasswordFeedback);
			setPasswordFeedbackVisible(true);
		}, 200);

	}, [password, confirmPassword, passwordFeedback]);

	var registerBody,
		previousButton,
		nextButton;

	switch(registerStage) {
		case 1:
			registerBody = (
				<ul>
					<li><span>Name</span><input type="text" onChange={event => setName(event.currentTarget.value)} value={name} placeholder="Zach Huxford"></input></li>
					<li><span>Username</span><input type="text" onChange={event => setUsername(event.currentTarget.value)} value={username} placeholder="zachbwh"></input></li>
					<li><span>Email</span><input type="email" onChange={event => setEmailAddress(event.currentTarget.value)} value={emailAddress} placeholder="me@zachhuxford.io"></input></li>
					<li><span>Phone Number</span><input type="tel" onChange={event => setPhoneNumber(event.currentTarget.value)} value={phoneNumber} placeholder="123456789"></input></li>
				</ul>
			);
			nextButton = (
				<button className="next-button" onClick={handleNextButtonClick}>Next</button>
			);
		break;
		case 2:
			registerBody = (
				<ul>
					<li>
						<span>Password</span>
						<div>
							<input type="password" onChange={event => {setPassword(event.currentTarget.value)}} value={password}></input>
							<PasswordStrength password={password}></PasswordStrength>
						</div>
					</li>
					<li>
						<span>Confirm Password</span>
						<div>
							<input type="password" onChange={event => setConfirmPassword(event.currentTarget.value)} value={confirmPassword}></input>
							<div>
								<span className="passwords-feedback" style={{opacity: passwordFeedbackVisible ? 1 : 0}}>
									{passwordFeedback}
								</span>
							</div>
						</div>
					</li>
				</ul>
			);
			previousButton = (
				<button className="previous-button" onClick={handlePreviousButtonClick}>Previous</button>
			);
			nextButton = (
				<button className="register-button" onClick={handleRegisterButtonClick}>Register</button>
			);
		break;
		default:
			registerBody = (
				<div>You have successfully signed up!</div>
			);
	}

	return (
	<div className="register-user">
		
		<h2>Sign Up for <ShortNameIcon></ShortNameIcon></h2>
		<div className="register-user-body">
			<div>
				{registerBody}
			</div>
			<div className="register-button-container">
				{/* Order Reversed but flex direction: row reverse is applied so a single button is right aligned */}
				{nextButton}
				{previousButton}
			</div>
		</div>
	</div>
	);
}

export default RegisterUser;
