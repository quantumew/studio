import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, View } from 'react-native';

export default class Footer extends React.Component {
	render () {
		const { removeEntry } = this.props;

		return (
			<View>
				<Button title="Remove Entry" onPress={() => removeEntry()} style={styles.entryButton}/>
			</View>
		);
	}
}

Footer.propTypes = {
	removeEntry: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	entryButton: {
	}
});

