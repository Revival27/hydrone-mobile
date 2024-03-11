import './tools/Localization';

import React from 'react';
import { LogBox } from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@rneui/themed';

import { ErrorHandler } from './components/ErrorFallback/ErrorFallback';
import { toastConfig } from './constants/ToastConfig';
import DarkModeProvider from './context/DarkModeProvider';
import ProjectProvider from './context/ProjectProvider';
import Screens from './navigation/index';
import { store } from './store/store';

const theme = createTheme({
  // Button: {
  //   raised: true,
  // },
});

//? Ignoring warnings caused by react native
//============================================================================
if (__DEV__) {
  const ignoreWarns = ['ViewPropTypes will be removed from React Native', 'AsyncStorage has been extracted from react-native'];
  const warn = console.warn;
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };
  LogBox.ignoreLogs(ignoreWarns);
}
//============================================================================

const App = () => {
  enableLatestRenderer();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <DarkModeProvider>
            <ProjectProvider>
              <ErrorHandler>
                <Screens />
              </ErrorHandler>
              {/* @ts-ignore */}
              <Toast config={toastConfig} />
            </ProjectProvider>
          </DarkModeProvider>
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
