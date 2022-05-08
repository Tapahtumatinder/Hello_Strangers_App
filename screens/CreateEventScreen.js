import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from 'react-native';
import { Chip, Divider } from "react-native-elements";
import styles from '../AppStyle';
import ApiEventsList from "../components/ApiEventsList";
import { addDays, compareAsc, isAfter, isToday, isTomorrow, startOfTomorrow } from 'date-fns';

const CreateEventScreen = ({ navigation }) => {
    const [hkiApiEvents, setHkiApiEvents] = useState([]);
    const [eventsToday, setEventsToday] = useState([]);
    const [eventsTomorrow, setEventsTomorrow] = useState([]);
    const [eventsLater, setEventsLater] = useState([]);
    const [showEvents, setShowEvents] = useState([]);

    useEffect(() => { getAllEvents(); }, [])

    const getAllEvents = () => {
        let tempAfterDay = addDays(startOfTomorrow(), 1);

        try {
            fetch('https://open-api.myhelsinki.fi/v1/events/')
                .then(response => response.json())
                .then(json => {
                    let tempEventList = json.data.filter(event => isAfter(new Date(event.event_dates.starting_day), new Date()));
                    tempEventList = tempEventList.sort((a, b) => compareAsc(new Date(a.event_dates.starting_day), new Date(b.event_dates.starting_day)));
                    setHkiApiEvents(tempEventList);
                    
                    const tempEventsToday = tempEventList.filter(event => isToday(new Date(event.event_dates.starting_day)));
                    setEventsToday(tempEventsToday);
                    setShowEvents(tempEventsToday);
                    
                    const tempEventsTomorrow = tempEventList.filter(event => isTomorrow(new Date(event.event_dates.starting_day)));
                    setEventsTomorrow(tempEventsTomorrow);

                    const tempEventsAfter = tempEventList.filter(event => isAfter(new Date(event.event_dates.starting_day), tempAfterDay));
                    setEventsLater(tempEventsAfter);
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.showHkiEventsChipGroup}>
                <Chip
                    title='Today'
                    onPress={() => setShowEvents(eventsToday)}
                    buttonStyle={styles.showHkiEventsChip}
                />
                <Chip
                    title='Tomorrow'
                    onPress={() => setShowEvents(eventsTomorrow)}
                    buttonStyle={styles.showHkiEventsChip}
                />
                <Chip
                    title='Later'
                    onPress={() => setShowEvents(eventsLater)}
                    buttonStyle={styles.showHkiEventsChip}
                />
                <Divider />
            </View>
            <View style={styles.apiEventsListView}>
                <ApiEventsList events={showEvents} navigation={navigation} />
            </View>
        </SafeAreaView>
    );
}
export default CreateEventScreen;
