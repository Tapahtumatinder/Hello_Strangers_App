import { React, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Button } from 'react-native';
import { format, isToday } from 'date-fns';
import { Avatar, ListItem } from 'react-native-elements';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { db } from '../firebase';
import styles from '../AppStyle';

const EventListScreen = ( {navigation} ) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  // Gets all of the data stored in collection 'event' and sets it in state 'events'
  const getData = async () => {
    let tempEventList = [];
    let tempEvent = {};
    try {
      const q = query(collection(db, 'event'), orderBy('startDateTime'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempEvent = doc.data();
        tempEvent['id'] = doc.id;
        tempEventList.push(tempEvent);
      });
      setEvents(tempEventList);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  // TODO : Block events from the past (and much more todo)
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <Button title='Create an event' onPress={() => navigation.navigate('Create event')} />
        {
          events.map((item, index) => (
            <ListItem key={index} bottomDivider>
              <Avatar rounded source={{ uri: 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }} />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {item.eventName}
                </ListItem.Title>
                <ListItem.Subtitle>
                  {`${item.address}, ${item.locality}`}
                </ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content right>
                <ListItem.Title right style={{ color: '#1390E0' }}>
                  {isToday(item.startDateTime.toDate()) ? 'Today' : format(new Date(item.startDateTime.toDate()), 'MMM dd')}
                </ListItem.Title>
                <ListItem.Title right style={{ color: '#1390E0' }}>
                  {format(new Date(item.startDateTime.toDate()), 'HH:mm')}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}
export default EventListScreen;