import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const withAuthorization = (Component) => {
	const WithAuthorization = (props) => {
		const { auth } = props;
		return auth.isAuth ? <Component {...props} /> : <Redirect to="/login" />;
	};

	// const mapStateToProps = (state) => ({auth: state.auth}) -->
	// const mapStateToProps = ({auth}) => ({auth}) -->
	// ({auth}) => ({auth})
	return connect(({ auth }) => ({ auth }))(WithAuthorization);
};

export default withAuthorization;
