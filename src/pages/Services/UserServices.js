import React, { useEffect } from 'react';
import { ServiceItem, withAuthorization } from 'components';

import { fetchUserServices } from 'actions';

const UserServices = (props) => {
	const { services } = props.auth.user;

	useEffect(() => {
		const {
			auth: { user },
			dispatch,
		} = props;
		dispatch(fetchUserServices(user.uid));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

export default withAuthorization(UserServices);
