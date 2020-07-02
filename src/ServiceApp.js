import { Navbar, Sidebar, Spinner } from 'components';

import React from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';

const ServiceApp = ({ auth }) => {
	const renderApplication = (auth) => (
		<React.Fragment>
			<Navbar auth={auth} />
			<Navbar auth={auth} id="navbar-clone" />
			<Sidebar />
			<Routes />
		</React.Fragment>
	);

	return auth.isAuthResolved ? renderApplication(auth) : <Spinner />;
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(ServiceApp);
