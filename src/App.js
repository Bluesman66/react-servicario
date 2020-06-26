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
import { Navbar, NavbarClone, Sidebar } from 'components';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import React from 'react';
import initStore from 'store';

const store = initStore();

function App() {
	return (
		<div>
			<Provider store={store}>
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
			</Provider>
		</div>
	);
}

export default App;
