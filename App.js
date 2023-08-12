import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';

import { getItemFromAsyncStorage } from './shared/utils';

import { CONSTANTS } from './shared/constants';

const { SCREENS, ASYNC_STORAGE_CONSTANTS } = CONSTANTS;

const Stack = createNativeStackNavigator();

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const isLoggedIn = await getItemFromAsyncStorage(
      ASYNC_STORAGE_CONSTANTS.LOGGED_IN
    );

    if (isLoggedIn === 'true') {
      setLoggedIn(true);
    }

    setShowLoader(false);
  };

  const getInitialRouteName = () => {
    if (loggedIn) {
      return SCREENS.PROFILE;
    } else {
      return SCREENS.ONBOARDING;
    }
  };

  const getUi = () => {
    if (showLoader) {
      return <ActivityIndicator size={'large'} />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={getInitialRouteName()}>
              <Stack.Screen name={SCREENS.ONBOARDING} component={Onboarding} />
              <Stack.Screen
                options={{ headerShown: false }}
                name={SCREENS.PROFILE}
                component={Profile}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      );
    }
  };

  return getUi();
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'gray',
    width: '100%',
    height: '100%',
  },
});
