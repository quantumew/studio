import React from 'react';
import AppContainer from './src/containers/app';
import { Provider } from 'react-redux';
import makeStore from './src/store';

export default class App extends React.Component {
	render () {
		return (
			<Provider store={makeStore('Music Studio')}>
				<AppContainer />
			</Provider>
		);
	}
}
