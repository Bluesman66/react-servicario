import { Navbar, Sidebar, Spinner } from 'components';

import React from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';
import { logout } from 'actions';

const ServiceApp = ({ auth, dispatch }) => {
	const handleLogout = () => dispatch(logout());

	const renderApplication = (auth) => (
		<React.Fragment>
			<Navbar auth={auth} logout={handleLogout} id="navbar-main" loadFresh />
			<Navbar auth={auth} logout={handleLogout} id="navbar-clone" />
			<Sidebar />
			<Routes />
		</React.Fragment>
	);

	return auth.isAuthResolved ? renderApplication(auth) : <Spinner />;
};

// const mapStateToProps = (state) => ({ auth: state.auth }); -->
// const mapStateToProps = ({ auth }) => ({ auth }); -->
// ({ auth }) => ({ auth })
export default connect(({ auth }) => ({ auth }))(ServiceApp);
