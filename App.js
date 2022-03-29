import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { MainStack } from './navigation/StackNavigator'

LogBox.ignoreLogs(
  [
    'AsyncStorage',
    'Remote debugger',
    'Require cycle'
  ])

export default function App() {

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

    </NavigationContainer>
  );
}
