import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import { appStyles } from '../app';
import { Button, ScrollView, View } from 'react-native';

export default class Home extends React.Component {
	renderAccountList () {
		const { accountList } = this.props;

		return accountList.map(account => {
			const { id, name } = account;
			return (
				<Button key={id} title={name} style={appStyles.entryButton}>

				</Button>
			);
		});
	}

	render () {
		const { addAccount } = this.props;

		return (
			<View>
				<ScrollView style={appStyles.content}>
					{this.renderAccountList()}
				</ScrollView>
				<Footer addAccount={addAccount}/>
			</View>
		);
	}
}

Home.propTypes = {
	accountList: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		id: PropTypes.string
	})),
	addAccount: PropTypes.func.isRequired
};
