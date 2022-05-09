import { React } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import styles from '../AppStyle';

const HomeScreen = ({ navigation }) => {

  const handeleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.homeContainer}>
      <StatusBar hidden></StatusBar>
      <ImageBackground
        style={{ width: '100%', height: '105%', marginTop: -20 }}
        source={require('../assets/HomeBackground.jpg')}>
        <Text style={styles.screenText}>Welcome stranger!</Text>
        <TouchableOpacity
          onPress={handeleSignOut}
          style={styles.signoutButton}>
          <Text style={styles.signoutButtonText}>Sign out</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default HomeScreen