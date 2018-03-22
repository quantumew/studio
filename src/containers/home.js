import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/home';
import { addAccount, getAccountList } from '../reducers/account-list';
import { changePageType } from '../reducers/app';

function mapStateToProps (state) {
	return {
		accountList: getAccountList(state)
	};
}

function mapDispatchToProps () {
	return bindActionCreators({
		addAccount,
		changePageType
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
