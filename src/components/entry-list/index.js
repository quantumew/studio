import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import { Button, StyleSheet } from 'react-native';
import { ENTRY } from '../../constants';

export default class EntryList extends React.Component {
	openEntry (entryId) {
		const { accountId, changePageType } = this.props;

		changePageType(ENTRY, accountId, entryId);
	}

	renderEntries () {
		return this.props.entryList.map(entry => {
			const { id, name } = entry;

			return (
				<Button key={id} style={styles.groupButton} title={name} onPress={() => this.openEntry(id)}/>
			);
		});
	}

	render () {
		return (
			<Footer />
		);
	}
}

EntryList.propTypes = {
	accountId: PropTypes.string.isRequired,
	changePageType: PropTypes.func.isRequired,
	entryList: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		id: PropTypes.string
	}))
};

const styles = StyleSheet.create({
	groupButton: {
		width: '100%'
	}
});
