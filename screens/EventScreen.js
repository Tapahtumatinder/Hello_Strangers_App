import { React, useState, useEffect, useRef } from 'react';
import { addDoc, collection, documentId, FieldPath, setDoc, doc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, setISODay } from 'date-fns';
import styles from '../AppStyle';
import EventPicture2 from '../components/EventPicture2'
import { getIdToken } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

const EventScreen = ({ navigation }) => {
  const [eventName, setEventName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [locality, setLocality] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());
  const [maxAttendance, setMaxAttendance] = useState('');
  const [description, setDescription] = useState('');
  const [eventUrlLink, setEventUrlLink] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [tags, setTags] = useState([]);



  const buttonRef = useRef();
  const pickPicture = () => {
    buttonRef.current.method();
  };


  const createId = async () => {
    const newEventRef = doc(collection(db, "event"));
    setId(newEventRef.id);

  }

  const [id, setId] = useState('');



  // TODO: tags and cover image, validation, input fields UI (size etc)...

  // Calls function every time the page reloads
  useEffect(() => {
    createId()
    console.log(id);

  }, []);

  // Creates a new event to the collection: 'event' with an autogenerated id in Firestore
  const setData = async () => {
    try {
      await setDoc(doc(db, 'event', id), {
        eventName: eventName,
        address: address,
        postalCode: postalCode,
        locality: locality,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        maxAttendance: maxAttendance,
        attending: [],
        description: description,
        eventUrlLink: eventUrlLink,
        organizer: auth.currentUser.uid
      }, { merge: true })
      navigation.goBack('Events')

      // TODO: if succeed -> notification to user (e.g toast msg)
      // NB: an event id : docRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  // Handles date and time changes
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    if (isStart) {
      const currentDate = selectedDate || startDateTime;
      setStartDateTime(currentDate);
      setEndDateTime(currentDate);
    } else {
      const currentDate = selectedDate || endDateTime;
      setEndDateTime(currentDate);
    }
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const showDatepicker = () => {
    showMode('date');
  }
  const showTimepicker = () => {
    showMode('time');
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <EventPicture2 collection="event" id={id} ref={buttonRef} />
        <View>
          <Button onPress={pickPicture} title="Pick a photo" buttonStyle={{
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 20,
            marginBottom: 6,
            width: 160,
            alignSelf: 'center'
          }} />
        </View>
        <View style={{ flex: 1, padding: 10 }}>


          <View style={styles.horizontalRight}>

          </View>
        </View>
        <View style={styles.verticalInputs}>
          <Text style={styles.label}>ADDRESS</Text>
          <TextInput
            placeholder='Set an address for your event'
            value={address}
            onChangeText={text => setAddress(text)}
            style={styles.eventInput}
          />
          <View style={styles.horizontalInputs}>
            <View style={styles.horizontalLeft}>
              <Text style={styles.label}>POSTAL CODE</Text>
              <TextInput
                placeholder='Postal code'
                keyboardType='numeric'
                value={postalCode}
                onChangeText={text => setPostalCode(text)}
                style={styles.eventInput}
              />
            </View>
            <View style={styles.horizontalRight}>
              <Text style={styles.label}>CITY</Text>
              <TextInput
                placeholder='Locality'
                value={locality}
                onChangeText={text => setLocality(text)}
                style={styles.eventInput}
              />
            </View>
          </View>
          <View style={styles.horizontalInputs}>
            <View style={styles.horizontalLeft}>
              <Text style={styles.label}>START DATE</Text>
              <TextInput
                placeholder='Start date'
                value={format(new Date(startDateTime), 'd.M.yyyy')}
                onPressIn={() => { showDatepicker(); setIsStart(true); }}
                showSoftInputOnFocus={false}
                style={styles.eventInput}
              />
            </View>
            <View style={styles.horizontalRight}>
              <Text style={styles.label}>START TIME</Text>
              <TextInput
                placeholder='Start time'
                value={format(new Date(startDateTime), 'HH:mm')}
                onPressIn={() => { showTimepicker(); setIsStart(true); }}
                showSoftInputOnFocus={false}
                style={styles.eventInput}
              />
            </View>
          </View>
          <View style={styles.horizontalInputs}>
            <View style={styles.horizontalLeft}>
              <Text style={styles.label}>END DATE</Text>
              <TextInput
                placeholder='Set date'
                value={format(new Date(endDateTime), 'd.M.yyyy')}
                onPressIn={() => { showDatepicker(); setIsStart(false); }}
                showSoftInputOnFocus={false}
                style={styles.eventInput}
              />
            </View>
            <View style={styles.horizontalRight}>
              <Text style={styles.label}>END TIME</Text>
              <TextInput
                label='END TIME'
                placeholder='Set end time'
                value={format(new Date(endDateTime), 'HH:mm')}
                onPressIn={() => { showTimepicker(); setIsStart(false); }}
                showSoftInputOnFocus={false}
                style={styles.eventInput}
              />
            </View>
          </View>
          {isStart && show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={startDateTime}
              mode={mode}
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              onChange={onChange}
            />
          )}
          {!isStart && show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={endDateTime}
              mode={mode}
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              onChange={onChange}
            />
          )}
          <View style={styles.verticalInputs}>
            <Text style={styles.label}>MAX ATTENDANCE</Text>
            <TextInput
              placeholder='How many people can participate in?'
              value={maxAttendance}
              onChangeText={text => setMaxAttendance(text)}
              keyboardType='numeric'
              style={styles.eventInput}
            />
            <Text style={styles.label}>TAGS</Text>
            <Button buttonStyle={styles.basicButton} title="Select tags" titleStyle={styles.basicTitle}
              onPress={() => navigation.navigate('Event tags', { eventId: id })} />
            <Text style={styles.label}>EVENT NAME</Text>
            <TextInput
              placeholder='Set event name, max 40 characters'
              maxLength={40}
              value={eventName}
              onChangeText={text => setEventName(text)}
              style={styles.eventInput}
            />
            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder='Describe your event'
              value={description}
              onChangeText={text => setDescription(text)}
              style={styles.eventInputMultiline}
            />
            <Text style={styles.label}>HTTP LINK</Text>
            <TextInput
              label='HTTP LINK'
              placeholder="Anything you'd like to share?"
              value={eventUrlLink}
              onChangeText={text => setEventUrlLink(text)}
              style={styles.eventInput}
            />
          </View>

        </View>
        <TouchableOpacity>
          <Button title='Publish event' onPress={setData} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
export default EventScreen;
