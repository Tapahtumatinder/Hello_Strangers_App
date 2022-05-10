import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from '../firebase';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    View
} from 'react-native';
import { Button, Chip } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import styles from '../AppStyle';

const EditEventScreen = ({ route, navigation }) => {
    const { eventObj } = route.params;
    const [event, setEvent] = useState({
        eventName: eventObj.eventName,
        address: eventObj.address,
        postalCode: eventObj.postalCode,
        locality: eventObj.locality,
        startDateTime: eventObj.startDateTime.toDate(),
        endDateTime: eventObj.endDateTime.toDate(),
        maxAttendance: eventObj.maxAttendance,
        tags: eventObj.tags,
        ourTags: eventObj.ourTags,
        description: eventObj.description,
        eventUrlLink: eventObj.eventUrlLink,
        pictureUrl: eventObj.pictureUrl,
        id: eventObj.id
    });
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [isStart, setIsStart] = useState(true);

    // Updates event details to Firestore
    const updateEvent = async () => {
        const eventRef = doc(db, 'event', event.id);
        try {
            await updateDoc(eventRef, {
                eventName: event.eventName,
                address: event.address,
                postalCode: event.postalCode,
                locality: event.locality,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                maxAttendance: event.maxAttendance,
                description: event.description,
                eventUrlLink: event.eventUrlLink,
                // pictureUrl: eventObj.pictureUrl,

            });
            navigation.goBack(null);

        } catch (error) {
            console.log(error.toString());
        }
    }

    const updateEventWithTags = async () => {
        const eventRef = doc(db, 'event', event.id);
        try {
            await updateDoc(eventRef, {
                eventName: event.eventName,
                address: event.address,
                postalCode: event.postalCode,
                locality: event.locality,
                startDateTime: event.startDateTime,
                endDateTime: event.endDateTime,
                maxAttendance: event.maxAttendance,
                description: event.description,
                eventUrlLink: event.eventUrlLink,
                tags: event.tags
                // pictureUrl: eventObj.pictureUrl,

            });
            navigation.goBack(null);

        } catch (error) {
            console.log(error.toString());
        }
    }
    // Handles date and time changes
    const onChange = (e, selectedDate) => {
        setShow(Platform.OS === 'ios');
        if (isStart) {
            const currentDate = selectedDate || event.startDateTime;
            if (event.endDateTime.getDate() < selectedDate) {
                setEvent({ ...event, startDateTime: currentDate, endDateTime: currentDate })
            } else {
                setEvent({ ...event, startDateTime: currentDate })
            }
        } else {
            const currentDate = selectedDate || event.endDateTime;
            setEvent({ ...event, endDateTime: currentDate })
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
    const handleTagChange = (item) => {
        const newTags = event.tags.filter((tag) => tag !== item);
        setEvent({ ...event, tags: newTags });
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={{ uri: event.pictureUrl }}
                    resizeMode="cover"
                    style={styles.eventImg}>
                </ImageBackground>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={styles.horizontalInputs}>
                    </View>
                    <View style={styles.verticalInputs}>
                        <Text style={styles.label}>ADDRESS</Text>
                        <TextInput
                            placeholder='Set an address for your event'
                            value={event.address}
                            onChangeText={text => setEvent({ ...event, address: text })}
                            style={styles.eventInput}
                        />
                        <View style={styles.horizontalInputs}>
                            <View style={styles.horizontalLeft}>
                                <Text style={styles.label}>POSTAL CODE</Text>
                                <TextInput
                                    placeholder='Postal code'
                                    keyboardType='numeric'
                                    value={event.postalCode}
                                    onChangeText={text => setEvent({ ...event, postalCode: text })}
                                    style={styles.eventInput}
                                />
                            </View>
                            <View style={styles.horizontalRight}>
                                <Text style={styles.label}>CITY</Text>
                                <TextInput
                                    placeholder='Locality'
                                    value={event.locality}
                                    onChangeText={text => setEvent({ ...event, locality: text })}
                                    style={styles.eventInput}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.horizontalInputs}>
                        <View style={styles.horizontalLeft}>
                            <Text style={styles.label}>START DATE</Text>
                            <TextInput
                                placeholder='Start date'
                                value={format(new Date(event.startDateTime), 'd.M.yyyy')}
                                onPressIn={() => { showDatepicker(); setIsStart(true); }}
                                showSoftInputOnFocus={false}
                                style={styles.eventInput}
                            />
                        </View>
                        <View style={styles.horizontalRight}>
                            <Text style={styles.label}>START TIME</Text>
                            <TextInput
                                placeholder='Start time'
                                value={format(new Date(event.startDateTime), 'HH:mm')}
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
                                value={format(new Date(event.endDateTime), 'd.M.yyyy')}
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
                                value={format(new Date(event.endDateTime), 'HH:mm')}
                                onPressIn={() => { showTimepicker(); setIsStart(false); }}
                                showSoftInputOnFocus={false}
                                style={styles.eventInput}
                            />
                        </View>
                    </View>
                    {isStart && show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={event.startDateTime}
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
                            value={event.endDateTime}
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
                            value={event.maxAttendance}
                            onChangeText={text => setEvent({ ...event, maxAttendance: text })}
                            keyboardType='numeric'
                            style={styles.eventInput}
                        />
                        <Text style={styles.label}>TAGS</Text>
                        <Button buttonStyle={styles.basicButton2} title="Select tags" titleStyle={styles.basicTitle}
                            onPress={() => navigation.navigate('Event tags', {
                                eventId: event.id,
                                eventTags: event.tags
                            })} />
                        <View style={styles.hkiEventTagGroup}>
                            {event.tags != undefined &&
                                event.tags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        title={tag}
                                        buttonStyle={styles.hkiEventTag}
                                        icon={{
                                            name: "close",
                                            type: "font-awesome",
                                            size: 20,
                                            color: "white",
                                        }}
                                        iconRight
                                        onPress={() => handleTagChange(tag)} />
                                ))
                            }
                        </View>
                        <Text style={styles.label}>EVENT NAME</Text>
                        <TextInput
                            placeholder='Set event name, max 30 characters'
                            value={event.eventName}
                            onChangeText={text => setEvent({ ...event, eventName: text })}
                            style={styles.eventInput}
                        />
                        <Text style={styles.label}>DESCRIPTION</Text>
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder='Describe your event'
                            value={event.description}
                            onChangeText={text => setEvent({ ...event, description: text })}
                            style={styles.eventInputMultiline}
                        />
                        <Text style={styles.label}>HTTP LINK</Text>
                        <TextInput
                            label='HTTP LINK'
                            placeholder="Anything you'd like to share?"
                            value={event.eventUrlLink}
                            onChangeText={text => setEvent({ ...event, eventUrlLink: text })}
                            style={styles.eventInput}
                        />
                    </View>
                </View>
                <TouchableOpacity>
                    <Button title='Update event' onPress={event.tags ? () => updateEventWithTags() : () => updateEvent()} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
export default EditEventScreen;
