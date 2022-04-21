import { View, TextInput, Text, Platform } from 'react-native'
import { Button } from 'react-native-elements';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import { React, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../AppStyle';
import Picture from '../components/Picture';
import DatePicker from 'react-native-date-picker'
import InterestScreen from './InterestScreen';


const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAge, setUserAge] = useState('');
  const [bDayText, setbDayText] = useState('Empty');
  const [userBirthdate, setUserBirthdate] = useState(new Date());

  //Pick the birthdate
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [chosenDate, setChosenDate] = useState();

  // select date
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


  // Calls function getData every time the page reloads
  useEffect(() => {
    getData()
  }, [])

  // Gets all of the data stored in collection 'user' that has the same id with the logged in user.
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
  // If the collection does not exsist, then creates a 'user' collection to firestore.
  const setData = async () => {
    await setDoc(doc(db, 'user', auth.currentUser.uid), {
      userName: userName,
      userDescription: userDescription,
      userAge: userAge,
      userBirthdate: userBirthdate
    })
    navigation.navigate('HomeTab')
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>

        <Button buttonStyle={styles.basicButton} title='ADD PHOTO' titleStyle={styles.basicTitle} />
        <Text>Name</Text>
        <TextInput
          placeholder='Set your first name'
          value={userName}
          onChangeText={text => setUserName(text)}
          style={styles.input}
        />
        <Text>About you</Text>
        <TextInput
          placeholder='Describe yourself'
          value={userDescription}
          onChangeText={text => setUserDescription(text)}
          style={styles.multilineInput}
          multiline={true}
          maxLength={250}
        />
        <View style={styles.mainContainer}>
        <InterestScreen/>
        </View>
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
        
        <Button buttonStyle={styles.basicButton} title='SAVE' titleStyle={styles.basicTitle} onPress={setData} />
        <Text style={{color:'blue', textAlign:'center', textDecorationLine:'underline', marginTop: 40}} onPress={()=> navigation.navigate('Delete account')}>Delete account</Text>

      </View>
    </View>
  );

}
export default ProfileScreen;