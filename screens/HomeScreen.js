import { React } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {

  const handeleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden></StatusBar>
      <TouchableOpacity
        onPress={handeleSignOut}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    backgroundColor: '#0782f9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
})