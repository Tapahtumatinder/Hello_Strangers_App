import { React, useState, useEffect } from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { format, isToday } from 'date-fns';
import {
  Avatar,
  FAB,
  Icon,
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
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import EventList from '../components/EventList';
import EventCards from '../components/EventCards';
import EventMap from '../components/EventMap'

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [index, setIndex] = useState(0);
  const today = new Date();

  useEffect(() => {
    getData();
  }, []);

  /*  In first query, gets data stored in a collection 'event' (not past events)
          -> mapping and adding event id to event object,

      in second query gets all data stored in a collection 'user'
          -> mapping and adding host user details to event object */
  const getData = async () => {
    let tempEventList = [];
    let tempHostedEventList = [];
    let tempAttendingEventList = [];
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
            event.organizer === auth.currentUser.uid && tempHostedEventList.push(event);     // if event's organizer is signed in user, adds event to hostedEvents 
          }
          if (event.attending.includes(auth.currentUser.uid) && !tempAttendingEventList.includes(event)) {
            tempAttendingEventList.push(event);
          }
        })
      });
      setEvents(tempEventList);
      setHostedEvents(tempHostedEventList);
      setAttendingEvents(tempAttendingEventList);
      setFilteredEvents(tempEventList);
    }
    catch (e) {
      console.error("Something went wrong: ", e);
    }

  }

  // UseState for the search keyword
  const [search, setSearch] = useState('');

  // Filtering of events
  const filterSearch = (text) => {
    if (text) {
      const newData = events.filter((item) => {
        const itemData = item.eventName ? item.eventName.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredEvents(newData);
      setSearch(text);
    } else {
      setFilteredEvents(events);
      setSearch(text);
    }
  }

  const [view, setView] = useState(1);

  const changeView = (events) => {
    if (view == 1) {
      return (
        <EventList data={events} />
      )
    } else if (view == 2) {
      return (
        <EventCards data={events} />
      )
    } else {
      return (
        <EventMap data={events} />
      )
    }
  }

  /* returns tre tabs 'Events', 'Hosting' and 'Attending'
      Events: lists all events,
      Hosting: lists all events hosted by signed in user  
      Attending: lists all events current user is attending */
  return (
    <SafeAreaView style={styles.mainContainer}>

      <Tab value={index} onChange={setIndex}>
        <Tab.Item
          title="Events"
          titleStyle={styles.eventLists}
        />
        <Tab.Item
          title="Hosting"
          titleStyle={styles.eventLists}
        />
        <Tab.Item
          title="Attending"
          titleStyle={styles.eventLists}
        />
      </Tab>

      <View style={styles.horizontalInputs}>
        { /* Search bar */}
        <View style={styles.horizontalLeft}>
          <TextInput
            placeholder='Search event...'
            onChangeText={(text) => filterSearch(text)}
            value={search}
            style={styles.eventInput}
          />
        </View>
        { /* Refresh button */}
        <View style={styles.horizontalRight}>
          <TouchableOpacity
            onPress={getData}
            style={{ alignItems: 'center' }}
          >
            <Text
              style={{ textAlign: 'center', textAlignVertical: 'center', height: 40, width: 80 }}>
              REFRESH
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.views}>
        <Pressable id="1"
          style={[(view === 1) ? styles.viewOptions2 : styles.viewOptions]}
          onPress={() => setView(1)} >
          <Text><Ionicons name="list-outline"></Ionicons> List</Text>
        </Pressable>
        <Pressable id="2"
          style={[(view === 2) ? styles.viewOptions2 : styles.viewOptions]}
          onPress={() => setView(2)}>
          <Text><Ionicons name="copy-outline"></Ionicons> Card</Text>
        </Pressable>
        <Pressable id="3"
          style={[(view === 3) ? styles.viewOptions2 : styles.viewOptions]}
          onPress={() => setView(3)}>
          <Text><Ionicons name="navigate-circle-outline"></Ionicons> Map</Text>
        </Pressable>
      </View>

      <TabView value={index} onChange={setIndex} >

        { /* All events */}
        <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          {changeView(filteredEvents)}
        </TabView.Item>

        { /* Hosting events */}
        <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          {changeView(hostedEvents)}
        </TabView.Item>

        { /* Attending events */}
        <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          {changeView(attendingEvents)}
        </TabView.Item>
      </TabView>

      { /* Button that navigates to event creation screen */}
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
    </SafeAreaView >
  );
}
export default EventListScreen;