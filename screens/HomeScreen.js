import { React } from 'react';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { React, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signOut } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import { collection, getDocs, doc, setDoc, onSnapshot, getDoc } from 'firebase/firestore/lite';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getData()
  }, [])
=======
import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import Picture from '../components/Picture'
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
>>>>>>> origin/main

  const handeleSignOut = () => {
    signOut(auth)
      .then(() => {
<<<<<<< HEAD
        // navigation.reset ns "tyhjentaa" navigoinnissa auki olevat sivut
        navigation.reset({
          index: 1,
          routes: [{ name: 'Login' }],
        });
      })
      .catch(error => alert(error.message))
  }

  const getData = async () => {
    const docRef = doc(db, 'user', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserName(docSnap.data().userName);
    } else {
      console.log('a true sranger');
    }
  }

  const setData = async () => {
    await setDoc(doc(db, 'user', auth.currentUser.uid), {
      userName: userName
    })

=======
        navigation.replace('Login')
      })
      .catch(error => alert(error.message))
>>>>>>> origin/main
  }

  return (
    <View style={styles.container}>
<<<<<<< HEAD

      <Text>Email: {auth.currentUser?.email}</Text>
      <TextInput
        placeholder='Set your first name'
        value={userName}
        onChangeText={text => setUserName(text)}
        style={styles.input}
      />
      <Button title='Set name' onPress={setData} />
=======
      <Picture></Picture>
>>>>>>> origin/main
      <TouchableOpacity
        onPress={handeleSignOut}
        style={styles.button}
      >
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