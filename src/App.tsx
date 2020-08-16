import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import Swipe from 'react-components/Swipe/Swipe'
import RegisterUser from "react-components/Login/RegisterUser/RegisterUser";
import SquareIcon from "react-components/BrandingAssets/SquareIcon/SquareIcon";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div className="nav-bar">
					<div className="gradient-wrapper">
						<div className="gradient"></div>
					</div>
					<div className="nav-bar-content">
						<SquareIcon></SquareIcon>
					</div>
				</div>
				<Router>
					<Switch>
						<Route path="/swipe">
							<Swipe />
						</Route>
						<Route path="/register">
							<RegisterUser />
						</Route>
					</Switch>
				</Router>
			</header>
		</div>
	);
}

export default App;
