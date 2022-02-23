import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import EventScreen from './screens/EventScreen';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.'])

const Tab = createBottomTabNavigator();

/**
<Stack.Navigator>
  <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Event" component={EventScreen} />
</Stack.Navigator>
*/

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'md-home';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Events') {
              iconName = 'calendar'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        })}>
        <Tab.Screen name='Login'
          options={{ headerShown: false, tabBarStyle: { display: 'none' } }}
          component={LoginScreen} />
        <Tab.Screen name='Events' component={EventScreen} />
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
      </Tab.Navigator>
      <StatusBar hidden />
      {/* ^^^jostain syysta emulaattorilla ilmestyy musta palkki
             mutta puhelimella piilottaa oikein */}
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
