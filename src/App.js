import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ServiceApp from './ServiceApp';
import { ToastProvider } from 'react-toast-notifications';
import initStore from 'store';

const store = initStore();

function App() {
	return (
		<Provider store={store}>
			<ToastProvider>
				<Router>
					<ServiceApp />
				</Router>
			</ToastProvider>
		</Provider>
	);
}

export default App;
