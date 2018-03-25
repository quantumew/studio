import React from 'react';
import PropTypes from 'prop-types';
import Footer from './footer';
import Account from './account';
import { appStyles } from '../app';
import { ScrollView, View } from 'react-native';
import AccountModal from '../../containers/account-modal';

export default class Home extends React.Component {
	renderAccountList () {
		const { accountList, navigation } = this.props;

		return accountList.map(account => {
			const { id, name } = account;
			return (
				<Account key={id} id={id} name={name} navigate={navigation.navigate} />
			);
		});
	}

	render () {
		const { toggleModal } = this.props;

		return (
			<View style={appStyles.container}>
				<AccountModal />
				<ScrollView style={appStyles.content}>
					{this.renderAccountList()}
				</ScrollView>
				<Footer toggleModal={toggleModal}/>
			</View>
		);
	}
}

Home.navigationOptions = {
	title: 'Music Studio'
};

Home.propTypes = {
	accountList: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		id: PropTypes.string
	})),
	toggleModal: PropTypes.func.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired
	}).isRequired
};
