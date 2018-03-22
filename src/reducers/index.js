import { combineReducers } from 'redux';
import accountList from './account-list';
import app from './app';
import entryList from './entry-list';

export default combineReducers({
	app,
	accountList,
	entryList
});
