import { React, useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from "./navigation/TabNavigator";
import { LoginStack, MainStack } from './navigation/StackNavigator';
import { auth } from './firebase'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.', 'Remote debugger'])

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginState = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, [])

  return (
    <NavigationContainer>
      {isLoggedIn == true ? (
        <TabNavigator />
      ) : (
        <MainStack />
      )}
    </NavigationContainer>
  );
}
