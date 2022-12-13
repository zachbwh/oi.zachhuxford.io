import React, { useState, useEffect, useReducer, useCallback } from 'react';
import zxcvbn from 'zxcvbn';
import getMergeReducer from 'helpers/GetMergeReducer';

import './SignUp.scss';
import FormTextInput from 'react-components/ComponentLibrary/InputComponents/FormTextInput/FormTextInput';
import PasswordInput from 'react-components/ComponentLibrary/InputComponents/PasswordInput/PasswordInput';
import Button from 'react-components/ComponentLibrary/InputComponents/Button/Button';
import { useHistory } from 'react-router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface SignUpForm {
	emailAddress: string,
	password: string
}

function SignUp() {
	const [formState, update] = useReducer(getMergeReducer<SignUpForm>(), {
		emailAddress: '',
		password: ''
	})
	const {emailAddress, password} = formState;

	const [passwordFeedback, setPasswordFeedback] = useState("");
	const [validateMessage, setValidateMessage] = useState("");
	const [loading, setLoading] = useState(false);

	function validateForm(throwError?: boolean) {
		// validate email address
		if (!emailAddress.includes("@")) {
			if (throwError) throw new Error("Invalid Email Address");
			return false;
		}
		if (password.length < 8) {
			if (throwError) throw new Error("Minimum Password Length is 8 Characters");
			return false;
		}

		return true;
	}

	const history = useHistory();
	function signUp() {
		try {
			// validate inputs before posting
			validateForm(true);
			// post details to server
			setLoading(true);
			// cache JWT?
			// load details screen
			setTimeout(() => history.push("/register/details"), 5000);
		} catch (e) {
			setLoading(false);

			if (e instanceof Error) {
				setValidateMessage(e.message);
			}
		}
	}

	useEffect(() => {
		var newPasswordFeedback : string;

		if (!password) {
			newPasswordFeedback = ""
		} else {
			let zxcvbnScore = zxcvbn(password).score,
				passwordStrengthQualifiers = ["Very Weak", "Weak", "Medium", "Good", "Excellent"];

			newPasswordFeedback = `Password Strength: ${passwordStrengthQualifiers[zxcvbnScore]}`;
		}

		setTimeout(() => {
			setPasswordFeedback(newPasswordFeedback);
		}, 200);

	}, [password]);

	return (
	<div className="sign-up">
		<h2>Sign Up</h2>
		<div className="inputs">
			<FormTextInput setValue={(emailAddress) => update({emailAddress})} value={emailAddress} label="Email" inputType="email" classNames="dark" />
			<PasswordInput password={password} setPassword={(password) => update({password})} showStrength={true} label="Password" classNames="dark" />
			<div className="password-feedback" style={{opacity: passwordFeedback ? 1 : 0}}>
				{passwordFeedback}
			</div>
		</div>
		<Button onClick={signUp} disabled={(!emailAddress || !password)}>{loading ? <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" /> : "Register"}</Button>
		<div className="validate-message" style={{opacity: validateMessage ? 1 : 0}}>
			{validateMessage}
		</div>
	</div>
	);
}

export default SignUp;
