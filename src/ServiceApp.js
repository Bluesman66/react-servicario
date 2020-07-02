import { Navbar, Sidebar, Spinner } from 'components';

import React from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';
import { logout } from 'actions';

const ServiceApp = ({ auth, dispatch }) => {
	const handleLogout = () => dispatch(logout());

	const renderApplication = (auth) => (
		<React.Fragment>
			<Navbar logout={handleLogout} auth={auth} />
			<Navbar auth={auth} logout={handleLogout} id="navbar-clone" />
			<Sidebar />
			<Routes />
		</React.Fragment>
	);

	return auth.isAuthResolved ? renderApplication(auth) : <Spinner />;
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(ServiceApp);
