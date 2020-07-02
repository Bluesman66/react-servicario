import React, { useEffect } from 'react';
import { onAuthStateChanged, storeAuthUser } from 'actions';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ServiceApp from './ServiceApp';
import { ToastProvider } from 'react-toast-notifications';
import initStore from 'store';

const store = initStore();

const App = () => {
	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged((authUser) => {
			store.dispatch(storeAuthUser(authUser));
		});
		return () => {
			unsubscribeAuth();
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
