import {
	Faq as FaqPage,
	Profile as ProfilePage,
	Services as ServicesPage,
} from 'pages';
import {
	Home as HomePage,
	Login as LoginPage,
	Register as RegisterPage,
} from 'pages';
import { Navbar, NavbarClone } from 'components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import React from 'react';
import { Sidebar } from 'components';

function App() {
	return (
		<div>
			<Router>
				<Navbar id="navbar-clone" />
				<NavbarClone />
				<Sidebar />
				<Switch>
					<Route path="/register" component={RegisterPage} />
					<Route path="/login" component={LoginPage} />
					<Route path="/services" component={ServicesPage} />
					<Route path="/profile" component={ProfilePage} />
					<Route path="/faq" component={FaqPage} />
					<Route exact path="/" component={HomePage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
