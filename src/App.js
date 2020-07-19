import React, { useEffect, useRef } from 'react';
import {
	checkUserConnection,
	onAuthStateChanged,
	storeAuthUser,
	subscribeToMessages,
} from 'actions';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ServiceApp from './ServiceApp';
import { ToastProvider } from 'react-toast-notifications';
import initStore from 'store';

const store = initStore();

const App = () => {
	const unsubscribeAuth = useRef(null);
	const unsubscribeMessages = useRef(null);

	useEffect(() => {
		unsubscribeAuth.current = onAuthStateChanged((authUser) => {
			store.dispatch(storeAuthUser(authUser));
			if (authUser) {
				checkUserConnection(authUser.uid);
				unsubscribeMessages.current = store.dispatch(
					subscribeToMessages(authUser.uid)
				);
			}
			if (!authUser) {
				unsubscribeMessages.current && unsubscribeMessages.current();
			}
		});
		return () => {
			unsubscribeAuth.current();
			if (unsubscribeMessages.current) {
				unsubscribeMessages.current();
			}
		};
	}, []);

	return (
		<Provider store={store}>
			<ToastProvider>
				<Router>
					<ServiceApp />
				</Router>
			</ToastProvider>
		</Provider>
	);
};

export default App;
