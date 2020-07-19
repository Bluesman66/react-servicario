import { Navbar, Sidebar, Spinner } from 'components';

import React from 'react';
import Routes from './Routes';
import { connect } from 'react-redux';

const ServiceApp = ({ auth, dispatch }) => {
	const renderApplication = (auth) => (
		<React.Fragment>
			<Navbar auth={auth} id="navbar-main" loadFresh />
			<Navbar auth={auth} id="navbar-clone" />
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
