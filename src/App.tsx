import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import Swipe from 'react-components/Swipe/Swipe'
import RegisterUser from "react-components/Login/RegisterUser/RegisterUser";
import SwipeNavBar from "react-components/Swipe/SwipeNavBar/SwipeNavBar";
import LoginNavBar from "react-components/Login/LoginNavBar/LoginNavBar";
import SwipeSettings from "react-components/Swipe/SwipeSettings/SwipeSettings";
import SwipeUserProfile from "react-components/Swipe/SwipeUserProfile/SwipeUserProfile";

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
					</Switch>
					<div className="App-content">
						<Switch>
							<Route path="/swipe/profile">
								<SwipeUserProfile />
							</Route>
							<Route path="/swipe/settings">
								<SwipeSettings />
							</Route>
							<Route path="/swipe">
								<Swipe />
							</Route>
							<Route path="/register">
								<RegisterUser />
							</Route>
						</Switch>
					</div>
				</Router>
			</header>
		</div>
	);
}

export default App;
