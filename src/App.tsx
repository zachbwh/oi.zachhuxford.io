import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.scss';

import Swipe from 'react-components/Swipe/Swipe'
import AddDetails from "react-components/Register/AddDetails/AddDetails";
import SwipeNavBar from "react-components/Swipe/SwipeNavBar/SwipeNavBar";
import SwipeUserProfile from "react-components/Swipe/SwipeUserProfile/SwipeUserProfile";
import SwipeSettings from "react-components/Swipe/SwipeSettings/SwipeSettings";
import SwipeSettingsLookingFor from "react-components/Swipe/SwipeSettings/SwipeSettingsLookingFor/SwipeSettingsLookingFor";
import Conversations from "react-components/Messages/Conversations/Conversations";
import GradientBackground from "react-components/ComponentLibrary/GradientBackground/GradientBackground";
import ProtectedRoute from "auth/ProtectedRoute";

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
							<ProtectedRoute path="/swipe/profile">
								<SwipeUserProfile />
							</ProtectedRoute>
							<ProtectedRoute path="/swipe/settings/looking-for">
								<SwipeSettingsLookingFor />
							</ProtectedRoute>
							<ProtectedRoute path="/swipe/settings">
								<SwipeSettings />
							</ProtectedRoute>
							<ProtectedRoute exact path="/">
								<Redirect to="/swipe" />
							</ProtectedRoute>
							<ProtectedRoute path="/swipe">
								<Swipe />
							</ProtectedRoute>
							<ProtectedRoute path="/messages">
								<Conversations />
							</ProtectedRoute>
							<Route path="/register/details">
								<AddDetails />
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
