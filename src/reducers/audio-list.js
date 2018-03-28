import { guidGenerator } from '../utils';
import { createSelector } from 'reselect';
import { HYDRATE } from './app';
import { REMOVE_ENTRY } from './entry-list';

export const NEW_AUDIO = 'NEW_AUDIO';
export const REMOVE_AUDIO = 'REMOVE_AUDIO';

export default function reducer (state = [], action) {
	switch (action.type) {
		case HYDRATE:
			return action.audioList;
		case NEW_AUDIO:
			return [
				...state,
				{
					fileName: action.fileName,
					name: action.name,
					id: action.id,
					entryId: action.entryId,
				},
			];
		case REMOVE_AUDIO:
			return state.filter(e => {
				return e.id !== action.id;
			});
		case REMOVE_ENTRY:
			return state.filter(e => {
				return e.entryId !== action.id;
			});
		default:
			return state;
	}
}

// Selectors
export const getAudioList = (state, accountId) => state.audioList;
const getEntryId = (state, entryId) => entryId;

export const getAudioListForEntry = createSelector(
	[getAudioList, getEntryId],
	(audioList, entryId) => {
		return audioList.filter(entry => entry.entryId === entryId);
	}
);

// Actions
export const newAudio = (entryId, name, fileName, id) => {
	if (!id) {
		id = guidGenerator();
	}

	return {
		type: NEW_AUDIO,
		id,
		entryId,
		fileName,
		name,
	};
};

export const removeAudio = id => {
	return {
		type: REMOVE_AUDIO,
		id,
	};
};
