import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.scss';

import Swipe from 'react-components/Swipe/Swipe'
import SignUp from "react-components/Register/SignUp/SignUp";
import AddDetails from "react-components/Register/AddDetails/AddDetails";
import LoginUser from "react-components/Login/LoginUser/LoginUser";
import SwipeNavBar from "react-components/Swipe/SwipeNavBar/SwipeNavBar";
import SwipeUserProfile from "react-components/Swipe/SwipeUserProfile/SwipeUserProfile";
import SwipeSettings from "react-components/Swipe/SwipeSettings/SwipeSettings";
import SwipeSettingsLookingFor from "react-components/Swipe/SwipeSettings/SwipeSettingsLookingFor/SwipeSettingsLookingFor";
import Conversations from "react-components/Messages/Conversations/Conversations";
import GradientBackground from "react-components/ComponentLibrary/GradientBackground/GradientBackground";

function App() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh-gradient', `${vh}px`);

	return (
		<div className="App">
			<header className="App-header">
				<Router>
					<Switch>
						<Route path="/swipe">
							<SwipeNavBar showMessagesLink={true} />
						</Route>
					</Switch>
					<div className="App-content">
						<Switch>
							<Route path="/swipe/profile">
								<SwipeUserProfile />
							</Route>
							<Route path="/swipe/settings/looking-for">
								<SwipeSettingsLookingFor />
							</Route>
							<Route path="/swipe/settings">
								<SwipeSettings />
							</Route>
							<Route exact path="/">
								<Redirect to="/swipe" />
							</Route>
							<Route path="/swipe">
								<Swipe />
							</Route>
							<Route path="/messages">
								<Conversations />
							</Route>
							<Route path="/register/signup">
								<SignUp />
							</Route>
							<Route path="/register/details">
								<AddDetails />
							</Route>
							<Route path="/login">
								<LoginUser />
							</Route>
						</Switch>
					</div>
				</Router>
			</header>
			<GradientBackground></GradientBackground>
			<div id="modal-root" className="hidden"></div>
		</div>
	);
}

export default App;
