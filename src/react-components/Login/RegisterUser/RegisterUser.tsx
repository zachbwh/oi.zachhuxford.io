import React, { useState, useEffect, useReducer } from 'react';
import zxcvbn from 'zxcvbn';
import getMergeReducer from 'helpers/GetMergeReducer';

import './RegisterUser.scss';
import PasswordStrength from './PasswordStrength/PasswordStrength';
import FormTextInput from 'react-components/ComponentLibrary/InputComponents/FormTextInput/FormTextInput';
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
					<FormTextInput setValue={(firstName) => update({firstName})} value={firstName} label="First Name" classNames="dark first-name" />
					<FormTextInput setValue={(lastName) => update({lastName})} value={lastName} label="Last Name" classNames="dark last-name" />
					<FormTextInput setValue={(username) => update({username})} value={username} label="Username" classNames="dark full-width" />
					<FormTextInput setValue={(emailAddress) => update({emailAddress})} value={emailAddress} label="Email" inputType="email" classNames="dark full-width" />
					<FormTextInput setValue={(phoneNumber) => update({phoneNumber})} value={phoneNumber} label="Phone Number" inputType="tel" classNames="dark full-width" />
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
						<FormTextInput setValue={(password) => update({password})} value={password} label="Password" inputType="password" classNames="dark" />
						<div className="password-strength-container">
							<PasswordStrength password={password} />
						</div>
					</div>
					<div className="full-width">
						<FormTextInput setValue={(confirmPassword) => update({confirmPassword})} value={confirmPassword} label="Confirm Password" inputType="password" classNames="dark" />
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
