import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from '../app';
import { Button, StyleSheet, View } from 'react-native';
import Swipeout from 'react-native-swipeout';

export default class Account extends React.Component {
	render () {
		const { id, name, navigate, removeAccount } = this.props;
		const swipeBtns = [
			{
				text: 'Delete',
				backgroundColor: '#FF0000',
				onPress: () => removeAccount(id)
			}
		];

		return (
			<View style={styles.container}>
				<Swipeout right={swipeBtns} autoClose={true} backgroundColor="transparent">
					<Button
						key={id} title={name}
						style={appStyles.entryButton}
						onPress={() => navigate('EntryList', { accountId: id, accountName: name })}
					>
					</Button>
				</Swipeout>
			</View>
		);
	}
}

Account.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	navigate: PropTypes.func.isRequired,
	removeAccount: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: '#d6d7da',
		marginTop: 20,
	}
});
