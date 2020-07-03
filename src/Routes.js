import {
	Faq as FaqPage,
	Home as HomePage,
	Login as LoginPage,
	Profile as ProfilePage,
	Register as RegisterPage,
	Secret as SecretPage,
	ServiceCreate as ServiceCreatePage,
	ServiceDetail as ServiceDetailPage,
	Services as ServicesPage,
	UserServices as UserServicesPage,
} from 'pages';
import { Route, Switch } from 'react-router-dom';

import React from 'react';

const Routes = () => (
	<Switch>
		<Route path="/secret" component={SecretPage} />
		<Route path="/register" component={RegisterPage} />
		<Route path="/login" component={LoginPage} />
		<Route path="/services/me" component={UserServicesPage} />
		<Route path="/services/new" component={ServiceCreatePage} />
		<Route path="/services/:serviceId" component={ServiceDetailPage} />
		<Route path="/services" component={ServicesPage} />
		<Route path="/profile" component={ProfilePage} />
		<Route path="/faq" component={FaqPage} />
		<Route exact path="/" component={HomePage} />
	</Switch>
);

export default Routes;
