import React, { useEffect } from 'react';
import { ServiceItem, withAuthorization } from 'components';

import { connect } from 'react-redux';
import { fetchUserServices } from 'actions';

const UserServices = (props) => {
	useEffect(() => {
		const {
			auth: { user },
			dispatch,
		} = props;
		dispatch(fetchUserServices(user.uid));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { services } = props;
	return (
		<div className="container">
			<div className="content-wrapper">
				<h1 className="title">Your Services</h1>
				<div className="columns is-multiline">
					{services.map((s) => (
						<div key={s.id} className="column">
							<ServiceItem service={s} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ user }) => ({ services: user.services });

export default withAuthorization(connect(mapStateToProps)(UserServices));
