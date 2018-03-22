import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/app';
import { changePageType, getPageType } from '../reducers/app';

function mapStateToProps (state) {
	return {
		pageType: getPageType(state),
	};
}

function mapDispatchToProps () {
	return bindActionCreators({
		changePageType
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
