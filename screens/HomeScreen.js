import { React, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import Picture from '../components/Picture'

const HomeScreen = ({ navigation }) => {

  const buttonRef = useRef();

  const pickPicture = () => {
    buttonRef.current.method();
  };

  const handeleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Picture collection="profile" ref={buttonRef}/>
      <Button onPress={pickPicture} title="Pick a photo" />
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
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782f9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
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