import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
<<<<<<< HEAD
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import EventScreen from './screens/EventScreen';
=======
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { MainStack } from './navigation/StackNavigator'
// muutos
>>>>>>> origin/main

LogBox.ignoreLogs(
  [
    'AsyncStorage',
    'Remote debugger',
    'Require cycle'
  ])

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

<<<<<<< HEAD
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
=======
  /** 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginState = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
  }, [])
  */

  return (
    <NavigationContainer>
      <MainStack />
      {
        /**
      {isLoggedIn == true ? (
        <TabNavigator />
      ) : (
        <MainStack />
      )}
       */
      }

>>>>>>> origin/main
    </NavigationContainer>

  );
}
