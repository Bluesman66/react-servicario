import {
	CollaborationDetail as CollaborationDetailPage,
	Faq as FaqPage,
	Home as HomePage,
	Login as LoginPage,
	Logout as LogoutPage,
	Profile as ProfilePage,
	ReceivedCollaborations as ReceivedCollaborationsPage,
	ReceivedOffers as ReceivedOffersPage,
	Register as RegisterPage,
	Secret as SecretPage,
	SentOffers as SentOffersPage,
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
		<Route path="/logout" component={LogoutPage} />
		<Route path="/collaborations/me" component={ReceivedCollaborationsPage} />
		<Route path="/collaborations/:id" component={CollaborationDetailPage} />
		<Route path="/offers/sent" component={SentOffersPage} />
		<Route path="/offers/received" component={ReceivedOffersPage} />
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
