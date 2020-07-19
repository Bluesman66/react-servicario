import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { logout } from 'actions';

const Logout = (props) => {
	const { isAuth, user } = props.auth;

	useEffect(() => {
		if (isAuth) {
			props.dispatch(logout(user.uid));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container">
			<div className="content-wrapper">
				{isAuth && <h1 className="title">You are getting logged out...</h1>}
				{!isAuth && <h1 className="title">You are logged out</h1>}
			</div>
		</div>
	);
};

export default connect(({ auth }) => ({ auth }))(Logout);
