import React, { useState, useEffect, useReducer } from 'react';
import zxcvbn from 'zxcvbn';
import getMergeReducer from 'helpers/GetMergeReducer';

import './RegisterUser.scss';
import PasswordStrength from './PasswordStrength/PasswordStrength';
import TextInput from 'react-components/ComponentLibrary/InputComponents/TextInput/TextInput';
import CustomButton from 'react-components/ComponentLibrary/InputComponents/CustomButton/CustomButton';


interface RegisterUserForm {
	emailAddress: string,
	username: string,
	firstName: string,
	lastName: string,
	phoneNumber: string,
	password: string,
	confirmPassword: string,
}

function RegisterUser() {
	const [formState, update] = useReducer(getMergeReducer<RegisterUserForm>(), {
		emailAddress: '',
		username: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		password: '',
		confirmPassword: ''
	})
	const {emailAddress, username, firstName, lastName, phoneNumber, password, confirmPassword} = formState;
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
				<div className="register-user-inputs">
					<TextInput setValue={(firstName) => update({firstName})} value={firstName} placeholder="First Name" inputType="text" classNames="dark first-name"></TextInput>
					<TextInput setValue={(lastName) => update({lastName})} value={lastName} placeholder="Last Name" inputType="text" classNames="dark last-name"></TextInput>
					<TextInput setValue={(username) => update({username})} value={username} placeholder="Username" inputType="text" spellCheck={false} classNames="dark full-width"></TextInput>
					<TextInput setValue={(emailAddress) => update({emailAddress})} value={emailAddress} placeholder="Email" inputType="email" classNames="dark full-width"></TextInput>
					<TextInput setValue={(phoneNumber) => update({phoneNumber})} value={phoneNumber} placeholder="Phone Number" inputType="tel" classNames="dark full-width"></TextInput>
				</div>
			);
			nextButton = (
				<CustomButton onClick={handleNextButtonClick}>Next</CustomButton>
			);
		break;
		case 2:
			registerBody = (
				<div className="register-user-inputs">
					<div className="full-width">
						<TextInput setValue={(password) => update({password})} value={password} placeholder="Password" inputType="password" classNames="dark"></TextInput>
						<div className="password-strength-container">
							<PasswordStrength password={password}></PasswordStrength>
						</div>
					</div>
					<div className="full-width">
						<TextInput setValue={(confirmPassword) => update({confirmPassword})} value={confirmPassword} placeholder="Confirm Password" inputType="password" classNames="dark"></TextInput>
						<div>
							<span className="passwords-feedback" style={{opacity: passwordFeedbackVisible ? 1 : 0}}>
								{passwordFeedback}
							</span>
						</div>
					</div>
				</div>
			);
			previousButton = (
				<CustomButton onClick={handlePreviousButtonClick}>Previous</CustomButton>
			);
			nextButton = (
				<CustomButton onClick={handleRegisterButtonClick}>Register</CustomButton>
			);
		break;
		default:
			registerBody = (
				<div>You have successfully signed up!</div>
			);
	}

	return (
	<div className="register-user">
		<h2 className="large-heading">Create an account</h2>
		<div>
			{registerBody}
		</div>
		<div className="register-button-container">
			{/* Order Reversed but flex direction: row reverse is applied so a single button is right aligned */}
			{nextButton}
			{previousButton}
		</div>
	</div>
	);
}

export default RegisterUser;
