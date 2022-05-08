import { View, TextInput, Text, Platform, ScrollView, SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import { React, useState, useEffect, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../AppStyle';
import Picture from '../components/Picture';



const EditProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAge, setUserAge] = useState('');
  const [bDayText, setbDayText] = useState('Empty');
  const [userBirthdate, setUserBirthdate] = useState(new Date());

  // Calls function getData every time the page reloads
  useEffect(() => {
    getData()
  }, [])

  //Pick the birthdate
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [chosenDate, setChosenDate] = useState();

  // Select birthdate
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setChosenDate(selectedDate);
    var tempDate = new Date(currentDate);
    var fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setbDayText(fDate);
    // calculate age
    var birthDate = new Date(selectedDate);
    var currentDay = new Date();
    var age = currentDay.getFullYear() - birthDate.getFullYear();
    var month = currentDay.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && currentDay.getDate() < birthDate.getDate()))
      age--;
    setUserAge(age);
    setUserBirthdate(birthDate);
    console.log(age);
    console.log(birthDate);
    setShow(false);
  };

  // Gets all of the data stored in collection 'user' that has the same id with the logged in user
  const getData = async () => {
    const docRef = doc(db, 'user', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserName(docSnap.data().userName);
      setUserDescription(docSnap.data().userDescription);
      setUserAge(docSnap.data().userAge);
      setUserBirthdate(docSnap.data().userBirthdate);
    } else {
      console.log('a true stranger');
    }
  }

  // Overrides anything within the collection: 'user' and id: 'logged in user id'...
  // ...with the stuff inside the '{}' (in this case 'userName: usertName').
  // If the collection does not exsist, then creates a 'user' collection to firestore. If it exists already, then merge.
  const setData = async () => {
    await setDoc(doc(db, 'user', auth.currentUser.uid), {
      userName: userName,
      userDescription: userDescription,
      userAge: userAge,
      userBirthdate: userBirthdate
    }, { merge: true })
    navigation.goBack('Profile');
  }

  const buttonRef = useRef();

  const pickPicture = () => {
    buttonRef.current.method();
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <View >
              <Picture collection="user" id={auth.currentUser.uid} ref={buttonRef} />
              <Button onPress={pickPicture} title="Pick a photo" />
            </View>
            <Text style={styles.label}>NAME</Text>
            <TextInput
              placeholder='Set your first name'
              value={userName}
              onChangeText={text => setUserName(text)}
              style={styles.eventInput}
            />
            <Text style={styles.label}>ABOUT YOU</Text>
            <TextInput
              placeholder='Describe yourself'
              value={userDescription}
              onChangeText={text => setUserDescription(text)}
              style={styles.eventInputMultiline}
              multiline={true}
              maxLength={250}
            />
            <Button buttonStyle={styles.basicButton} title="SELECT INTERESTS" titleStyle={styles.basicTitle} onPress={() => navigation.navigate('Interest')} />

            <Button buttonStyle={styles.basicButton} title="SELECT BIRTHDAY" titleStyle={styles.basicTitle} onPress={() => setShow(true)} />

            <Text>{bDayText}</Text>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <View style={styles.inputContainer}>
            <Button buttonStyle={styles.basicButton} title='VIEW PROFILE' titleStyle={styles.basicTitle} onPress={() => navigation.navigate('Profile')} />
            <Text style={{ color: 'firebrick', textAlign: 'center', textDecorationLine: 'underline', margin: 20 }} onPress={() => navigation.navigate('Delete account')}>Delete account</Text>
          </View>
        </View>
        <Button title='SAVE' onPress={setData} />
      </ScrollView>
    </SafeAreaView>
  );

}
export default EditProfileScreen;