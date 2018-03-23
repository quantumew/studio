import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, View } from 'react-native';

export default class Footer extends React.Component {
	render () {
		const { addEntry } = this.props;

		return (
			<View>
				<Button title="New Entry" onPress={() => addEntry()} style={styles.entryButton}/>
			</View>
		);
	}
}

Footer.propTypes = {
	addEntry: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	entryButton: {
	}
});

