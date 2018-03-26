import React from 'react';
import PropTypes from 'prop-types';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
					<Text style={styles.heading}>New Folder</Text>

					<TextInput
						style={styles.textInput}
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
						placeholder="Name"
					/>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity onPress={() => close()} style={styles.modalButton}>
							<Text style={styles.buttonText}>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.save()} style={styles.modalButton}>
							<Text style={styles.buttonText}>
								Save
							</Text>
						</TouchableOpacity>
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
	buttonText: {
		fontSize: 18,
		color: '#606060',
		textAlign: 'center',
		margin: 5
	},
	buttonWrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '66%',
	},
	heading: {
		fontSize: 20,
		marginBottom: 20
	},
	modalButton: {
		width: '50%',
		borderColor: '#d6d7da',
		borderWidth: 1,
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
