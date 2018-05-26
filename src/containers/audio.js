import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Component from '../components/audio';
import { getAudioList, newAudio, toggleAudioExpansion, getIsSelected } from '../reducers/audio-list';

function mapStateToProps (state, props) {
	const { entryId } = props.navigation.state.params;
	return {
		audioList: getAudioList(state, entryId),
		entryId,
		isSelected: getIsSelected(state),
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		newAudio,
		toggleAudioExpansion,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);
