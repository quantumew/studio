import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/home/account-modal';
import { getIsAccountModalOpen } from '../reducers/app';
import { toggleModal, addAccount } from '../reducers/account-list';

function mapStateToProps (state) {
	return {
		isOpen: getIsAccountModalOpen(state)
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		close: toggleModal,
		save: addAccount
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
