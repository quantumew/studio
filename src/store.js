import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { hydrate } from './reducers/app';

/* global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */
export default function makeStore (name) {
	let composeEnhancers;

	if (typeof __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
		composeEnhancers = __REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			name
		}) || /* istanbul ignore next */ compose;
	} else {
		composeEnhancers = compose;
	}

	const store = createStore(
		reducers,
		{},
		composeEnhancers(applyMiddleware(thunkMiddleware))
	);
	hydrate(store.dispatch);

	return store;
}

