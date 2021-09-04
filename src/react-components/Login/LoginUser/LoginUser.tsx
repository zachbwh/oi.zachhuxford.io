import React, { useState } from 'react';

import './LoginUser.scss';
import TextInput from 'react-components/ComponentLibrary/InputComponents/TextInput/TextInput';
import Checkbox from 'react-components/ComponentLibrary/InputComponents/Checkbox/Checkbox';

function LoginUser() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const loginUser = function() {
		// validate inputs before posting
		// post details to server
		// cache JWT?
		// redirect to messages
	}

	const handleLoginButtonClick = function() {
		loginUser();
	}

	return (
	<div className="login-user">
		<h2 className="large-heading">Login</h2>
		<div className="login-inputs">
			<TextInput setValue={setUsername} value={username} placeholder="Username" inputType="text" classNames="dark"></TextInput>
			<TextInput setValue={setPassword} value={password} placeholder="Password" inputType="password" classNames="dark"></TextInput>
		</div>
		<div className="login-button-container">
			<div className="remember-me">
				<div>Remember Me</div>
				<Checkbox setValue={setRememberMe} value={rememberMe}></Checkbox>
			</div>
			<div className="login-button" onClick={handleLoginButtonClick}>Login</div>
		</div>
	</div>
	);
}

export default LoginUser;
