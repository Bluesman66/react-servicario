import React from 'react';
import { withAuthorization } from 'components';

const Secret = (props) => {
	return <h1>I am SECRET Page, ONLY Auth USER can see me!</h1>;
};

export default withAuthorization(Secret);
