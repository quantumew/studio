import React from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import PropTypes from 'prop-types';
import { ENTRY, ENTRY_LIST } from '../constants';
import Home from '../containers/home';
import EntryList from '../containers/entry-list';
import Entry from '../containers/entry';

export default class App extends React.Component {
	renderPage () {
		switch (this.props.pageType) {
			case ENTRY_LIST:
				return <EntryList />;
			case ENTRY:
				return <Entry />;
			default:
				return <Home />;
		}
	}

	render () {
		return (
			<View style={styles.container}>
				<Text style={styles.header}> Studio </Text>
				{this.renderPage()}
			</View>
		);
	}
}

App.propTypes = {
	pageType: PropTypes.string
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff'
	},
	groupButton: {
		width: '100%'
	},
	header: {
		fontSize: 20,
		top: 30,
		left: 10
	}
});
