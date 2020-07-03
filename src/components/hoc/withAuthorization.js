import React, { useState } from 'react';

const withAuthorization = (Component) => {
	const WithAuthorization = () => {
		const [state, setState] = useState({
			secretData: 'Hello World SECRET!!!!',
			secretNumber: 98777967,
		});

		const someSuperFunctionality = () => {
			alert('I AM SUPER');
		};

		return (
			<Component {...state} someSuperFunctionality={someSuperFunctionality} />
		);
	};

	return WithAuthorization;
};

export default withAuthorization;
