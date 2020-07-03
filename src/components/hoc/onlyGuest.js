import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const onlyGuest = (Component) => {
	const OnlyGuest = ({ auth, dispatch, ...rest }) => {
		return auth.isAuth ? <Redirect to="/" /> : <Component {...rest} />;
	};

	// const mapStateToProps = (state) => ({auth: state.auth}) -->
	// const mapStateToProps = ({auth}) => ({auth}) -->
	// ({auth}) => ({auth})
	return connect(({ auth }) => ({ auth }))(OnlyGuest);
};

export default onlyGuest;
