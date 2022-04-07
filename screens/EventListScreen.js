import { React, useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView
} from 'react-native';
import { format, isToday } from 'date-fns';
import {
  Avatar,
  FAB,
  Icon,
  ListItem,
  Tab,
  TabView
} from 'react-native-elements';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import styles from '../AppStyle';

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);
  const [index, setIndex] = useState(0);
  const today = new Date();

  useEffect(() => {
    getData();
  }, []);

  /*  In first query, gets data stored in a collection 'event' (not past events) -> mapping and adding event id to event object,
      in second query gets all data stored in a collection 'user' -> mapping and adding host user details to event object */
  const getData = async () => {
    let tempEventList = [];
    let tempEvent = {};

    try {
      const q = query(collection(db, 'event'), where("startDateTime", ">=", today), orderBy('startDateTime'));
      const querySnapshotEvents = await getDocs(q);
      querySnapshotEvents.forEach((doc) => {
        tempEvent = doc.data();
        tempEvent['id'] = doc.id;
        tempEventList.push(tempEvent);
      });

      const querySnapshotUsers = await getDocs(collection(db, 'user'));
      querySnapshotUsers.forEach((doc) => {
        tempEventList.map(event => {
          if (event.organizer === doc.id) {
            event['hostName'] = doc.data().userName;
            event['hostAge'] = doc.data().userAge;
            event['hostImgUrl'] = doc.data().pictureUrl;
          }
        })
      });
      setEvents(tempEventList);
      getHostedEvents(tempEventList);
    } catch (e) {
      console.error("Something went wrong: ", e);
    }
  }
  // maps all events and sets events hosted by signed in user to state 'hostedEvents'
  const getHostedEvents = (eventList) => {
    const tempHostedEventList = [];
    eventList.map((event) => {
      event.organizer == auth.currentUser.uid && tempHostedEventList.push(event);
    });
    setHostedEvents(tempHostedEventList);
  }
  // event items displayed in a flatlist
  const renderItem =
    ({ item }) =>
      <ListItem
        bottomDivider
        onPress={() => {
          navigation.navigate('Event details', { event: item });
        }}>
        <Avatar
          size={58}
          rounded
          source={{ uri: item.hostImgUrl ? item.hostImgUrl : 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }} />
        <ListItem.Content>
          <ListItem.Title style={styles.boldFontWeight}>
            {item.eventName}
          </ListItem.Title>
          <ListItem.Subtitle>
            {`${item.address}, ${item.locality}`}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Title right style={styles.colorBlue}>
            {isToday(item.startDateTime.toDate()) ? 'Today' : format(new Date(item.startDateTime.toDate()), 'MMM d')}
          </ListItem.Title>
          <ListItem.Title right style={styles.colorBlue}>
            {format(new Date(item.startDateTime.toDate()), 'HH:mm')}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>

  /*  returns two tabs 'Events' and 'Hosting'
      Events: lists all events in a flatlist, Hosting: lists all events hosted by signed in user (in a flatlist) */
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Tab value={index} onChange={setIndex}>
        <Tab.Item title="Events" titleStyle={styles.colorBlack} />
        <Tab.Item title="Hosting" titleStyle={styles.colorBlack} />
      </Tab>
      <TabView value={index} onChange={setIndex} >
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={events}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={hostedEvents}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </TabView.Item>
      </TabView>
      <FAB
        title=''
        placement='right'
        color='#1390E0'
        icon={
          <Icon
            name='add-outline'
            type='ionicon'
            size={25}
            color="white" />}
        onPress={() => navigation.navigate('Create event')}
      />
    </SafeAreaView>
  );
}
export default EventListScreen;
