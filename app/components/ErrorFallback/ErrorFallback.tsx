import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

/* eslint-disable @typescript-eslint/no-use-before-define */
import { ScreenHeight, ScreenWidth } from '@rneui/base';

import ErrorIllustration from '../../assets/images/illustrations/errorIllustration.svg';
import { Colors } from '../../constants/colors';
import { failedMessage } from '../../tools/ToastMessages/Messages';
import BlueButton from '../BlueButton/BlueButton';

const myErrorHandler = (error: Error) => {
  // failedMessage(error.message);
  // Do something with the error
};

const ErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <View style={styles.container}>
      <ErrorIllustration width={'100%'} height={'50%'} />
      <Text style={styles.errorTitle}> Something went wrong</Text>
      <Text style={styles.errorDescription}>Let us take you back to the homepage.</Text>
      <View style={styles.buttonContainer}>
        <BlueButton title={'Back to Home'} handleClick={resetErrorBoundary} />
      </View>
    </View>
  );
};

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  errorTitle: {
    fontSize: RFValue(24, ScreenHeight),
    fontFamily: 'Urbanist-SemiBold',
    color: Colors.grey_900,
    marginTop: 10,
  },
  errorDescription: {
    fontSize: RFValue(18, ScreenHeight),
    fontFamily: 'Urbanist-Regular',
    color: Colors.grey_700,
    marginTop: 10,
  },
  buttonContainer: {
    width: ScreenWidth - 40,
  },
});
