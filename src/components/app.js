import { StyleSheet } from 'react-native';
import Home from '../containers/home';
import EntryList from '../containers/entry-list';
import Entry from '../containers/entry';
import Audio from '../containers/audio';
import { StackNavigator } from 'react-navigation';

// Create app structure with basic navigation structure.
export default StackNavigator({
	Home: { screen: Home },
	Audio: { screen: Audio }, // Per entry audio page
	Entry: { screen: Entry },
	EntryList: { screen: EntryList },
});

export const appStyles = StyleSheet.create({
	container: {
		height: '100%'
	},
	footerContainer: {
		display: 'flex',
		flexShrink: 0,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	content: {
		flex: 1,
		flexBasis: 'auto',
	},
	entryButton: {
		width: '100%',
		justifyContent: 'flex-start'
	},
	header: {
		fontSize: 20,
		top: 70,
		left: 10,
	},
	flexCenter: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	flexCenterBottom: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		alignContent: 'center',
		alignItems: 'center',
	}
});
