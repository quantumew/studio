import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyleSheet, View } from 'react-native';
import { appStyles } from '../app';

export default class Footer extends React.Component {
	render () {
		const { toggleModal } = this.props;

		return (
			<View style={appStyles.footerContainer}>
				<Button title="New Account" onPress={() => toggleModal()} style={styles.accountButton}/>
			</View>
		);
	}
}

Footer.propTypes = {
	toggleModal: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	accountButton: {
	}
});
