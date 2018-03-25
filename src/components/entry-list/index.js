import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import { ScrollView, StyleSheet, View } from 'react-native';
import { appStyles } from '../app';
import Entry from './entry';
import { guidGenerator } from '../../utils';

export default class EntryList extends React.Component {
	createNewEntry () {
		const { accountId, navigation, newEntry } = this.props;
		const id = guidGenerator();

		newEntry(accountId, id);
		navigation.navigate('Entry', { accountId, id });
	}

	renderEntries () {
		const { accountId, entryList, navigation } = this.props;

		return entryList.map(entry => {
			const { id } = entry;

			return (
				<Entry {...entry} accountId={accountId} key={id} navigate={navigation.navigate} />
			);
		});
	}

	render () {
		return (
			<View style={appStyles.container}>
				<ScrollView style={appStyles.content}>
					{ this.renderEntries() }
				</ScrollView>
				<Footer newEntry={() => this.createNewEntry()} />
			</View>
		);
	}
}

EntryList.navigationOptions = {
	title: 'Music Studio'
};

EntryList.defaultProps = {
	entryList: []
};

EntryList.propTypes = {
	accountId: PropTypes.string.isRequired,
	accountName: PropTypes.string.isRequired,
	entryList: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		id: PropTypes.string,
		timestamp: PropTypes.string.isRequired,
	})),
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}),
	newEntry: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	groupButton: {
		width: '100%'
	}
});
