import React, { useEffect } from 'react';

import { fetchUserServices } from 'actions';
import { withAuthorization } from 'components';

const UserServices = (props) => {
	useEffect(() => {
		const {
			auth: { user },
		} = props;

		fetchUserServices(user.uid).then((services) => {
			alert(JSON.stringify(services));
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="container">
			<div className="content-wrapper">
				<div className="columns">I am UserServices PAGE!</div>
			</div>
		</div>
	);
};

export default withAuthorization(UserServices);
