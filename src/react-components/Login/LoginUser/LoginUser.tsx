import React, { useState } from 'react';

import './LoginUser.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function RegisterUser() {
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
	<div className="login-user-container">
		<div className="login-user">
			<h2 className="large-heading">Login</h2>
			<div className="login-user-body">
				<div>
				<ul>
					<li>
						<span>Username</span>
						<div>
							<input type="text" onChange={event => {setUsername(event.currentTarget.value)}} value={username}></input>
						</div>
					</li>
					<li>
						<span>Password</span>
						<div>
							<input type="password" onChange={event => {setPassword(event.currentTarget.value)}} value={password}></input>
						</div>
					</li>
					<li>
						<span>Remember Me</span>
						<div>
							<div>
								<div className="checkbox" onClick={() => setRememberMe(!rememberMe)}>
									<FontAwesomeIcon style={{opacity: rememberMe ? 1 : 0}} icon={faCheck}></FontAwesomeIcon>
								</div>
							</div>
						</div>
					</li>
				</ul>
				</div>
				<div className="login-button-container">
					<button className="login-button" onClick={handleLoginButtonClick}>Login</button>
				</div>
			</div>
		</div>
	</div>
	);
}

export default RegisterUser;
