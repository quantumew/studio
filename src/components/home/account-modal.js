import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

export default class Footer extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			name: ''
		};
	}

	save () {
		this.props.save(this.state.name);
		this.setState({ name: '' });
	}

	render () {
		const { close, isOpen } = this.props;

		if (!isOpen) {
			return null;
		}

		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={isOpen}
				onRequestClose={() => close()}
			>
				<View style={styles.outsideContainer}>
					<Text>New Folder</Text>

					<TextInput
						style={styles.textInput}
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
					/>
					<View style={styles.buttonWrapper}>
						<Button onPress={() => close()} title="Cancel" style={styles.button}/>
						<Button onPress={() => this.save()} title="Save" style={styles.button}/>
					</View>
				</View>
			</Modal>
		);
	}
}

Footer.propTypes = {
	close: PropTypes.func.isRequired,
	isOpen: PropTypes.bool,
	save: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	button: {},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	outsideContainer: {
		marginTop: 100,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textInput: {
		width: '66%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
	}
});
