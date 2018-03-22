import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

/* global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */
export default function makeStore (preloadedState, name) {
	let composeEnhancers;

	if (typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
		composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			name
		}) || /* istanbul ignore next */ compose;
	} else {
		composeEnhancers = compose;
	}

	return createStore(
		reducers,
		preloadedState,
		composeEnhancers(applyMiddleware(thunkMiddleware))
	);
}

