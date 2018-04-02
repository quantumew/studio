import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
	render () {
		const { image, isDisabled, onPress } = this.props;

		return (
			<TouchableOpacity
				onPress={onPress}
				disabled={isDisabled}
				style={styles.btn}
			>
				<Image
					style={styles.btn}
					source={image.module}
				/>
			</TouchableOpacity>
		);
	}
}

Button.propTypes = {
	image: PropTypes.object.isRequired,
	isDisabled: PropTypes.bool,
	onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	btn: {
		maxWidth: 70,
		maxHeight: 70
	}
});
