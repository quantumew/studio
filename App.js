import React from 'react';
import AppContainer from './src/containers/app';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App () {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
}
