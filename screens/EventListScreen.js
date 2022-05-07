import { React, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Button } from 'react-native';
import { format, isToday } from 'date-fns';
import { Avatar, ListItem } from 'react-native-elements';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { db } from '../firebase';
import styles from '../AppStyle';
import { useIsFocused } from "@react-navigation/native";


const EventListScreen = ( {navigation} ) => {
  const [events, setEvents] = useState([]);
  const isFocused= useIsFocused();

  useEffect(() => {
    if(isFocused){
      getData()
    }
  }, [isFocused],[])
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
              <Avatar rounded source={{uri:item.pictureUrl}} />
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