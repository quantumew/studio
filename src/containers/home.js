import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/home';
import { toggleModal, getAccountList } from '../reducers/account-list';

function mapStateToProps (state) {
	return {
		accountList: getAccountList(state)
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		toggleModal,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
