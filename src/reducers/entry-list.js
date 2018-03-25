import { guidGenerator } from '../utils';
import { createSelector } from 'reselect';
import { HYDRATE } from './app';

export const NEW_ENTRY = 'NEW_ENTRY';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const REMOVE_ENTRY = 'REMOVE_ENTRY';

export default function reducer (state = [], action) {
	switch (action.type) {
		case HYDRATE:
			return action.entryList;
		case NEW_ENTRY:
			return [
				...state,
				{
					id: action.id,
					accountId: action.accountId,
					name: action.name,
					text: action.text,
					timestamp: action.timestamp,
				},
			];
		case EDIT_ENTRY:
			return state.map(e => {
				if (e.id === action.id) {
					return {
						...e,
						text: action.text,
						timestamp: action.timestamp,
					};
				}

				return e;
			});
		case REMOVE_ENTRY:
			return state.filter(e => {
				return e.id !== action.id;
			});
		default:
			return state;
	}
}

// Selectors
export const getEntryList = (state, accountId) => state.entryList;
const getAccountId = (state, accountId) => accountId;
const getEntryId = (state, entryId) => entryId;

export const getEntryListForAccount = createSelector(
	[getEntryList, getAccountId],
	(entryList, accountId) => {
		return entryList.filter(entry => entry.accountId === accountId);
	}
);

export const getEntryForAccountById = createSelector(
	[getEntryList, getEntryId],
	(entryList, entryId) => {
		return entryList.find(entry => entry.id === entryId);
	}
);

// Actions
export const newEntry = (accountId, id, initText = 'New Song') => {
	if (!id) {
		id = guidGenerator();
	}

	return {
		type: NEW_ENTRY,
		id,
		accountId,
		name: initText,
		text: initText,
		timestamp: new Date().toISOString(),
	};
};

export const editEntry = (id, text) => {
	return {
		type: EDIT_ENTRY,
		id,
		text,
		timestamp: new Date().toISOString(),
	};
};

export const removeEntry = id => {
	return {
		type: REMOVE_ENTRY,
		id,
	};
};
