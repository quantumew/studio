import { guidGenerator } from '../utils';
import { HYDRATE } from './app';

export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
export const REMOVE_ACCOUNT = 'REMOVE_ACCOUNT';
export const TOGGLE_ACCOUNT_MODAL = 'TOGGLE_ACCOUNT_MODAL';

export default function reducer (state = [], action) {
	switch (action.type) {
		case HYDRATE:
			return action.accountList;
		case ADD_ACCOUNT:
			return [
				...state,
				{
					id: action.id,
					name: action.name
				}
			];
		case REMOVE_ACCOUNT:
			return state.filter(acct => {
				return acct.id !== action.id;
			});
		default:
			return state;
	}
}

// Selectors
export const getAccountList = (state) => state.accountList;

// Actions
export const addAccount = (name) => {
	return {
		type: ADD_ACCOUNT,
		id: guidGenerator(),
		name
	};
};

export const removeAccount = (id) => {
	return {
		type: REMOVE_ACCOUNT,
		id
	};
};

export const toggleModal = () => {
	return {
		type: TOGGLE_ACCOUNT_MODAL,
	};
};
