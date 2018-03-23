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
			<View style={appStyles.container}>
				<Text style={appStyles.header}> Studio </Text>
				{this.renderPage()}
			</View>
		);
	}
}

App.propTypes = {
	pageType: PropTypes.string
};

export const appStyles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
	},
	footerContainer: {
		display: 'flex',
		flexShrink: 0,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	content: {
		display: 'flex',
		flexGrow: 1,
		flexShrink: 0,
		flexBasis: 'auto',
		height: '90%'
	},
	entryButton: {
		width: '100%'
	},
	header: {
		fontSize: 20,
		top: 30,
		left: 10,
	},
	flexCenter: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		height: 400,
	},
	flexCenterBottom: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		alignContent: 'center',
		alignItems: 'center',
	}
});
