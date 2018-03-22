import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/home';
import { toggleModal, getAccountList, removeAccount } from '../reducers/account-list';

function mapStateToProps (state) {
	return {
		accountList: getAccountList(state)
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		removeAccount,
		toggleModal,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
