import React from 'react';
import { withAuthorization } from 'components';

const Faq = () => <h1>I am FAQ Page</h1>;

export default withAuthorization(Faq);
