import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './navigation/StackNavigator'

LogBox.ignoreLogs(
  [
    'AsyncStorage',
    'Remote debugger',
    'Require cycle'
  ])

export default function App() {

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}