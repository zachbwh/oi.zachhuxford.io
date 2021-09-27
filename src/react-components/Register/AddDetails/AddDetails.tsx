import React, { useEffect, useReducer, useState } from 'react';
import getMergeReducer from 'helpers/GetMergeReducer';

import './AddDetails.scss';
import FormTextInput from 'react-components/ComponentLibrary/InputComponents/FormTextInput/FormTextInput';
import Button from 'react-components/ComponentLibrary/InputComponents/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router';


interface AddDetailsForm {
	username: string,
	firstName: string,
	lastName: string,
	phoneNumber: string
}

function AddDetails() {
	const [formState, update] = useReducer(getMergeReducer<AddDetailsForm>(), {
		firstName: '',
		lastName: '',
		username: '',
		phoneNumber: ''
	})
	const {firstName, lastName, username, phoneNumber} = formState;

	const [generatedUsername, setGeneratedUsername] = useState(true);
	const [validateMessage, setValidateMessage] = useState("");
	const [loading, setLoading] = useState(false);

	function validateForm(throwError?: boolean) {
		// validate email address
		if (!firstName || !lastName) {
			if (throwError) throw new Error("Please Enter Name");
			return false;
		}
		if (!username) {
			if (throwError) throw new Error("Please Enter a Username");
			return false;
		}
		if (phoneNumber.length < 3) { // shortest phone number is 3 digits
			if (throwError) throw new Error("Please Enter a Phone Number");
			return false;
		}

		return true;
	}

	const history = useHistory();
	const addDetails = function() {
		try {
			// validate inputs before posting
			validateForm(true);
			// post details to server
			setLoading(true);
			// load create profile screen
			setTimeout(() => history.push("/register/profile"), 5000);
		} catch (e) {
			setLoading(false);

			if (e instanceof Error) {
				setValidateMessage(e.message);
			}
		}
		// validate inputs before posting
	}

	function updateUsername(username: string) {
		setGeneratedUsername(false);
		update({username});
	}

	useEffect(() => {
		if (generatedUsername) {
			update({username: [firstName, lastName].filter(s => s).map(s => s.toLowerCase()).join(".")})
		}
	}, [firstName, lastName, generatedUsername]);

	return (
	<div className="details">
		<h2 className="large-heading">Add Details</h2>
		<div className="inputs">
			<FormTextInput setValue={(firstName) => update({firstName})} value={firstName} label="First Name" classNames="dark first-name" />
			<FormTextInput setValue={(lastName) => update({lastName})} value={lastName} label="Last Name" classNames="dark last-name" />
			<FormTextInput setValue={updateUsername} value={username} label="Username" classNames="dark full-width" />
			<FormTextInput setValue={(phoneNumber) => update({phoneNumber})} value={phoneNumber} label="Phone Number" inputType="tel" classNames="dark full-width" />
		</div>
		<Button onClick={addDetails} disabled={(!firstName || !lastName || !username || !phoneNumber)}>
			{loading ? <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" /> : "Continue"}
		</Button>
		<div className="validate-message" style={{opacity: validateMessage ? 1 : 0}}>
			{validateMessage}
		</div>
	</div>
	);
}

export default AddDetails;
