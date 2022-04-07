import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './navigation/StackNavigator'

LogBox.ignoreLogs(
  [
    'AsyncStorage',
    'Remote debugger',
    'Require cycle',
    'Setting a timer'
  ])

export default function App() {

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}