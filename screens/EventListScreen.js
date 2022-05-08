import { React, useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  TextInput,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { format, isToday } from 'date-fns';
import {
  Avatar,
  FAB,
  Icon,
  ListItem,
  Tab,
  TabView,
  Overlay
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
import DateTimePicker from '@react-native-community/datetimepicker';


const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);
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
        })
      });
      setEvents(tempEventList);
      setHostedEvents(tempHostedEventList);
      setFilteredEvents(tempEventList);
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
        })
      });
      setEvents(tempEventList);
      setHostedEvents(tempHostedEventList);
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


  // event items displayed in a flatlist
  const renderItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => {
          navigation.navigate('Event details', { event: item });
        }}
      >
        { /* Event picture */}
        <Avatar
          size={58}
          rounded
          source={{ uri: item.hostImgUrl ? item.hostImgUrl : 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }} />

        { /* Main content of the list item */}
        <ListItem.Content>
          <ListItem.Title style={styles.boldFontWeight}>
            {item.eventName}
          </ListItem.Title>
          <ListItem.Subtitle>
            {`${item.address}, ${item.locality}`}
          </ListItem.Subtitle>
        </ListItem.Content>

        { /* Right side content of the list item */}
        <ListItem.Content right>
          <ListItem.Title right style={styles.colorBlue}>
            {isToday(item.startDateTime.toDate()) ? 'Today' : format(new Date(item.startDateTime.toDate()), 'MMM d')}
          </ListItem.Title>
          <ListItem.Title right style={styles.colorBlue}>
            {format(new Date(item.startDateTime.toDate()), 'HH:mm')}
          </ListItem.Title>
        </ListItem.Content>

      </ListItem>
    )
  }
  /* returns two tabs 'Events' and 'Hosting'
      Events: lists all events in a flatlist,
      Hosting: lists all events hosted by signed in user (in a flatlist) */

  return (
    <SafeAreaView style={styles.mainContainer}>

      <Tab value={index} onChange={setIndex}>
        <Tab.Item
          title="Events"
          titleStyle={styles.colorBlack}
        />
        <Tab.Item
          title="Hosting"
          titleStyle={styles.colorBlack}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} >

        { /* Events -tab */}
        <TabView.Item style={{ width: '100%' }}>
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
            { /* List of filtered events */}
            <FlatList
              data={filteredEvents}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
            />
          </View>

        </TabView.Item>

        { /* Hosting -tab*/}
        <TabView.Item style={{ width: '100%' }}>
          <FlatList
            data={hostedEvents}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
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
    </SafeAreaView>
  );
}
export default EventListScreen;
