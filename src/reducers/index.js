import { combineReducers } from 'redux';
import accountList from './account-list';
import app from './app';
import audioList from './audio-list';
import entryList from './entry-list';

export default combineReducers({
	app,
	accountList,
	audioList,
	entryList
});
