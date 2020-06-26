import {
	Faq as FaqPage,
	Profile as ProfilePage,
	Services as ServicesPage,
} from 'pages';
import { Navbar, NavbarClone } from 'components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Home as HomePage } from 'pages';
import React from 'react';
import { Sidebar } from 'components';

function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<NavbarClone />
				<Sidebar />
				<Switch>
					<Route path="/services" component={ServicesPage} />
					<Route path="/profile" component={ProfilePage} />
					<Route path="/faq" component={FaqPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
