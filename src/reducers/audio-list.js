import { createSelector } from 'reselect';
import { HYDRATE } from './app';
import { REMOVE_ENTRY } from './entry-list';

export const NEW_AUDIO = 'NEW_AUDIO';
export const REMOVE_AUDIO = 'REMOVE_AUDIO';
export const TOGGLE_AUDIO_EXPANSION = 'TOGGLE_AUDIO_EXPANSION';

export default function reducer (state = [], action) {
	switch (action.type) {
		case HYDRATE:
			return action.audioList;
		case NEW_AUDIO:
			return [
				{
					fileName: action.fileName,
					name: action.name,
					id: action.id,
					entryId: action.entryId,
					creationDate: action.creationDate,
					duration: action.duration,
				},
				...state,
			];
		case REMOVE_AUDIO:
			return state.filter(e => {
				return e.id !== action.id;
			});
		case REMOVE_ENTRY:
			return state.filter(e => {
				return e.entryId !== action.id;
			});
		case TOGGLE_AUDIO_EXPANSION: {
			const expanded = state.find(audio => audio.isExpanded) || {};

			return state.map(audio => {
				const isExpanded = action.id === audio.id && expanded.id !== audio.id;

				return {
					...audio,
					isExpanded
				};
			});
		}
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

export const getIsSelected = state => {
	return state.audioList.find(audio => audio.isExpanded) !== undefined;
};

// Actions
export const newAudio = (entryId, name, fileName, id, duration) => {
	const durationSeconds = Math.round(duration / 1000);
	const displaySecs = durationSeconds % 60;
	const paddedSecs = displaySecs.toString().length === 1 ? `0${displaySecs}` : displaySecs;
	const displayableDuration = `${(durationSeconds - displaySecs) / 60}:${paddedSecs}`;

	const date = new Date();
	const year = new String(date.getFullYear()).slice(2, 4);
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return {
		type: NEW_AUDIO,
		id,
		entryId,
		fileName,
		name,
		duration: displayableDuration,
		durationSeconds,
		creationDate: `${month}/${day}/${year}`,
	};
};

export const removeAudio = id => {
	return {
		type: REMOVE_AUDIO,
		id,
	};
};

export const toggleAudioExpansion = id => {
	return {
		type: TOGGLE_AUDIO_EXPANSION,
		id,
	};
};
