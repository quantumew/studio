import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import { Button, StyleSheet, View } from 'react-native';

export default class Account extends React.Component {
	render () {
		const { id, name, navigate } = this.props;

		return (
			<View style={styles.container}>
				<Button
					key={id} title={name}
					style={appStyles.entryButton}
					onPress={() => navigate('EntryList', { accountId: id, accountName: name })}
				>
				</Button>
			</View>
		);
	}
}

Account.propTypes = {
	name: PropTypes.string.isRequired,
	navigate: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: '#d6d7da',
		marginTop: 20,
	}
});
