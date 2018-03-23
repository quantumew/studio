import { guidGenerator } from '../utils';
import { createSelector } from 'reselect';
import { HYDRATE } from './app';

export const ADD_ENTRY = 'ADD_ENTRY';

export default function reducer (state = [], action) {
	switch (action.type) {
		case HYDRATE:
			return action.entryList;
		case ADD_ENTRY:
			return [
				...state,
				action.entry,
			];
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
export const addEntry = (name, accountId) => {
	return {
		type: ADD_ENTRY,
		entry: {
			id: guidGenerator(),
			accountId,
			name
		}
	};
};
