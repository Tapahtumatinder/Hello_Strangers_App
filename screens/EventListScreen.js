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
  ListItem,
  Tab,
  TabView,
  Overlay,
  Icon
} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from "@react-navigation/native";
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
  const [eventByid, setEventByid] = useState({ attending: [] });
  const isFocused = useIsFocused();

  /*  In first query, gets data stored in a collection 'event' (not past events)
          -> mapping and adding event id to event object,

      in second query gets all data stored in a collection 'user'
          -> mapping and adding host user details to event object */

  useEffect(() => {
    if (isFocused) {
      getData()
    }
  }, [isFocused], [])

  // Gets all of the data stored in collection 'event' and sets it in state 'events'
  const getData = async () => {
    setSearch('');
    const today = new Date();
    let tempEventList = [];
    let tempHostedEventList = [];
    let tempAttendingEventList = [];

    try {
      const q = query(collection(db, 'event'), where("startDateTime", ">=", today), orderBy('startDateTime'));
      const querySnapshotEvents = await getDocs(q);
      querySnapshotEvents.forEach((doc) => {
        let tempEvent = {};
        tempEvent = doc.data();
        tempEvent.id = doc.id;
        tempEventList.push(tempEvent);
      });

      const querySnapshotUsers = await getDocs(collection(db, 'user'));
      querySnapshotUsers.forEach((doc) => {
        tempEventList.filter(event => event.organizer === doc.id).forEach(event => {
          event.hostName = doc.data().userName;
          event.hostAge = doc.data().userAge;
          event.hostImgUrl = doc.data().pictureUrl;
          if (event.organizer === auth.currentUser.uid) { tempHostedEventList.push(event) }
          if (event.attending.includes(auth.currentUser.uid) && !tempAttendingEventList.includes(event)) {
            tempAttendingEventList.push(event);
          }
        })
      });
      setEvents(tempEventList);
      setHostedEvents(tempHostedEventList);
      setFilteredEvents(tempEventList);
      setAttendingEvents(tempAttendingEventList);
    }
    catch (e) {
      console.error("Something went wrong: ", e);
    }

  }


  // FILTER OVERLAY, SEARCHING BY DATE

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // overlay visibility
  const [visible, setVisible] = useState(false);

  // date related states
  const [pickedDate, setPickedDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChangeDate = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    const currentDate = selectedDate || pickedDate;
    setPickedDate(currentDate);
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

  const getSearchData = async () => {
    let tempEventList = [];
    let tempHostedEventList = [];
    let tempAttendingEventList = [];
    let tempEvent = {};

    try {
      const q = query(collection(db, 'event'), where("startDateTime", ">=", pickedDate), orderBy('startDateTime'));
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
            event.organizer === auth.currentUser.uid && tempHostedEventList.push(event);
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
      setVisible(false);
    }
    catch (e) {
      console.error("Something went wrong: ", e);
    }

  }


  // SEARCH BY KEYWORD

  const [search, setSearch] = useState('');

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

  /* Changing views between list, cards and map */
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

        { /* Events -tab */}
        <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          <View style={{ flex: 1 }}>
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
              { /* Filter button, opens overlay */}
              <View style={styles.horizontalCenter}>
                <TouchableOpacity
                  onPress={toggleOverlay}
                >
                  <Icon
                    name='filter-outline'
                    type='ionicon'
                    size={25}
                  />
                </TouchableOpacity>
                { /* Overlay with datepicker */}
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                  <View>
                    <View>
                      <Text style={styles.label}>START DATE</Text>
                      <TextInput
                        placeholder='Start date'
                        value={format(new Date(pickedDate), 'd.M.yyyy')}
                        onPressIn={() => showDatepicker()}
                        showSoftInputOnFocus={false}
                        style={styles.eventInput}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>START TIME</Text>
                      <TextInput
                        placeholder='Start time'
                        value={format(new Date(pickedDate), 'HH:mm')}
                        onPressIn={() => showTimepicker()}
                        showSoftInputOnFocus={false}
                        style={styles.eventInput}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={getSearchData}
                    >
                      <Icon
                        name='search-circle'
                        type='ionicon'
                        size={40}
                        color='#1390E0'
                      />
                    </TouchableOpacity>
                  </View>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={pickedDate}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      minimumDate={new Date()}
                      onChange={onChangeDate}
                    />
                  )}
                </Overlay>
              </View>
              { /* Refresh/show all button */}
              <View style={styles.horizontalRight}>
                <TouchableOpacity
                  onPress={getData}
                >
                  <Text
                    style={{ textAlign: 'center', textAlignVertical: 'center', height: 40, width: 80 }}>
                    SHOW ALL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {changeView(filteredEvents)}
          </View>

        </TabView.Item>

        { /* Hosting -tab*/}
        <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          {changeView(hostedEvents)}
        </TabView.Item>

        <TabView.Item style={{ width: '100%' }} onMoveShouldSetResponder={(e) => e.stopPropagation()}>
          {changeView(attendingEvents)}
        </TabView.Item>
      </TabView>
    </SafeAreaView>
  );
}
export default EventListScreen;