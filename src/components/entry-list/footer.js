import React from 'react';
import PropTypes from 'prop-types';
import { Button, View } from 'react-native';
import { appStyles } from '../app';

export default class Footer extends React.Component {
	render () {
		const { newEntry } = this.props;

		return (
			<View style={appStyles.footerContainer}>
				<Button title="New Entry" onPress={() => newEntry()}/>
			</View>
		);
	}
}

Footer.propTypes = {
	newEntry: PropTypes.func.isRequired,
};

