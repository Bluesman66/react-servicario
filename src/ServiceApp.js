import { Navbar, Sidebar } from 'components';

import React from 'react';
import Routes from './Routes';

const ServiceApp = () => {
	const renderApplication = () => (
		<React.Fragment>
			<Navbar />
			<Navbar id="navbar-clone" />
			<Sidebar />
			<Routes />
		</React.Fragment>
	);

	return renderApplication();
};

export default ServiceApp;
