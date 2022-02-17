import { StyleSheet, View, Button, TextInput } from 'react-native'
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import { React, useState, useEffect } from 'react';

const EventScreen = () => {
    const [eventName, setEventName] = useState('');
  
    // Calls function getData every time the page reloads
    useEffect(() => {
      getData()
    }, [])
  
    // Gets all of the data stored in collection 'event' that has the same id with the logged in user.
    const getData = async () => {
      const docRef = doc(db, 'event', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setEventName(docSnap.data().eventName);
      }
    }

    // Overrides or creates anything within the collection: 'event' and id: 'logged in user id'...
    // ...with the stuff inside the '{}' (in this case 'eventName: eventName').
    // For further development it might be wiser to store an array of events within the '{}'.
    // => so {[{ name: name, location: location,... }, { name: name, location: location,... },...]}
    const setData = async () => {
      await setDoc(doc(db, 'event', auth.currentUser.uid), {
        eventName: eventName
    })
  
    }
  
    return (
      <View style={styles.container}>
        <TextInput
            placeholder='Set event name'
            value={eventName}
            onChangeText={text => setEventName(text)}
            style={styles.input}
        />
        <Button title='Set event name' onPress={setData}/>
      </View>
    )
  }
  
  export default EventScreen

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
  },
})