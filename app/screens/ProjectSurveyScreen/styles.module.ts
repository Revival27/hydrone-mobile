import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { ScreenHeight, ScreenWidth } from '@rneui/base';

import { Colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 24,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  pageText: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_800,
  },
  mapContainer: {
    height: 200,
    width: ScreenWidth - 40,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 24,
  },
  blueButtonContainer: {
    width: ScreenWidth - 40,
  },
  map: {
    flex: 1,
  },

  coordinatesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  editContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  btnContainer: {
    width: ScreenWidth / 2,
    height: 60,
    justifyContent: 'center',
  },
  deleteBtn: {
    width: ScreenWidth / 3.5,
    height: 60,
    justifyContent: 'center',
  },

  editButton: {
    width: 150,
    height: 38,
  },
  lineStyle: {
    backgroundColor: Colors.grey_200,
    height: 1,
    width: ScreenWidth - 40,
    marginTop: 24,
    marginBottom: 24,
  },
  modalHeader: {
    color: Colors.grey_900,
    fontFamily: 'Urbanist-Bold',
    fontSize: RFValue(24, ScreenHeight),
  },
  modalContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  chipItemsContainer: {
    flexDirection: 'row',
    width: ScreenWidth - 100,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  projectChipsTitle: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    textAlign: 'left',
    width: ScreenWidth - 40,
    marginBottom: 5,
  },
  projectChipItem: {
    paddingHorizontal: 20,
    height: 35,
    borderRadius: 30,
    borderColor: Colors.primary_500,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 2,
  },
  projectChipItemTitle: {
    color: Colors.primary_500,
    textAlign: 'left',
    fontFamily: 'Urbanist-SemiBold',
    fontSize: RFValue(16, ScreenHeight),
  },
  optionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  optionItemText: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_800,
    padding: 10,
  },

  description: {
    fontSize: RFValue(14, ScreenHeight),
    fontFamily: 'Urbanist-Regular',
    color: Colors.grey_900,
    textAlign: 'left',
    marginBottom: 5,
  },
  descriptionHeader: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    textAlign: 'left',
    width: ScreenWidth - 40,
    marginBottom: 10,
  },
  surveyProjectHeader: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    width: '100%',
    marginTop: 20,
  },
  rowElementText: {
    color: Colors.grey_900,
    marginLeft: 10,
  },
  emptyProjectPage: { paddingVertical: 10, height: ScreenHeight / 10, width: ScreenWidth - 40, alignItems: 'center' },
  emptyProjectPageText: { color: Colors.grey_900, fontFamily: 'Urbanist', textAlign: 'center' },
});
