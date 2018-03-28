import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { hydrate, stateHasDiff } from './reducers/app';
import { save } from './services/storage';

/* global __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ */
export default function makeStore (name, preloadedState = {}) {
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
		preloadedState,
		composeEnhancers(applyMiddleware(thunkMiddleware))
	);

	// Need to hydrate from local storage.
	hydrate(store.dispatch);
	let prevState;
	setInterval(() => {
		const newState = store.getState();
		if (stateHasDiff(newState, prevState)) {
			console.log('save')
			prevState = newState;
			save(newState);
		}
	}, 500);

	return store;
}

