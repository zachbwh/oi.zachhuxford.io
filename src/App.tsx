import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import Swipe from 'react-components/Swipe/Swipe'
import RegisterUser from "react-components/Login/RegisterUser/RegisterUser";
import LoginUser from "react-components/Login/LoginUser/LoginUser";
import SwipeNavBar from "react-components/Swipe/SwipeNavBar/SwipeNavBar";
import LoginNavBar from "react-components/Login/LoginNavBar/LoginNavBar";
import SwipeUserProfile from "react-components/Swipe/SwipeUserProfile/SwipeUserProfile";
import SwipeSettings from "react-components/Swipe/SwipeSettings/SwipeSettings";
import SwipeSettingsLookingFor from "react-components/Swipe/SwipeSettings/SwipeSettingsLookingFor/SwipeSettingsLookingFor";
import Conversations from "react-components/Messages/Conversations/Conversations";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Router>
					<Switch>
						<Route path="/swipe">
							<SwipeNavBar />
						</Route>
						<Route path="/register">
							<LoginNavBar />
						</Route>
						<Route path="/login">
							<LoginNavBar />
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
							<Route path="/swipe">
								<Swipe />
							</Route>
							<Route path="/messages">
								<Conversations />
							</Route>
							<Route path="/register">
								<RegisterUser />
							</Route>
							<Route path="/login">
								<LoginUser />
							</Route>
						</Switch>
					</div>
				</Router>
			</header>
		</div>
	);
}

export default App;
