import { applyMiddleware, compose, createStore } from 'redux';

import logger from 'redux-logger';
import serviceApp from 'reducers';
import thunk from 'redux-thunk';

const initStore = () => {
	const middlewares = [thunk];
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(logger);
	}

	const store = createStore(
		serviceApp,
		composeEnhancers(
			applyMiddleware(...middlewares),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__()
				: (f) => f
		)
	);

	return store;
};

export default initStore;
