import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Urbanist',
    padding: 24,
    paddingBottom: 0,
    marginBottom: 0,
  },
  logo: {
    marginRight: 16,
    marginBottom: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  header_left: {
    flexDirection: 'row',
  },
  headerText: {
    fontSize: RFValue(16, ScreenHeight),
  },
  nameText: {
    width: '80%',
    fontSize: RFValue(20, ScreenHeight),
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  cardWrapper: {
    alignItems: 'center',
  },
  card: {
    maxWidth: 380,
    resizeMode: 'contain',
  },
  allProjectsContainer: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectsText: {
    fontSize: RFValue(20, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
  },
  allProjectsText: {
    color: Colors.primary_500,
    fontSize: RFValue(16, ScreenHeight),
    fontFamily: 'Urbanist-Bold',
  },
  project: {
    marginTop: 15,
    width: '100%',
  },

  buttonCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    height: 52,
    backgroundColor: '#E9F0FF',
    borderRadius: 100,
  },
});
