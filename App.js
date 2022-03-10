import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import EventScreen from './screens/EventScreen';
import EventListScreen from './screens/EventListScreen';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.', 'Remote debugger'])

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="EventList" component={EventListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
