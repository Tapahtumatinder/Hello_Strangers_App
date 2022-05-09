import React, { useEffect, useState } from 'react';
import { addDoc, collection, documentId, FieldPath, setDoc, doc } from 'firebase/firestore/lite'
import { auth, db } from '../firebase';
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
import { format } from 'date-fns';
import styles from '../AppStyle';

const HkiEventScreen = ({ navigation, route }) => {
    const { event } = route.params;
    const [description, setDescription] = useState(event.description.intro);
    const [maxAttendance, setMaxAttendance] = useState('');
    const [tags, setTags] = useState([]);
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [eventId, setEventId] = useState(doc(collection(db, "event")).id);

    useEffect(() => {
        console.log(eventId);
    }, []);

    useEffect(() => {
        handleTags();
        handleDates();
    }, [event]);

    const setData = async () => {
        try {
            await setDoc(doc(db, 'event', eventId), {
                pictureUrl: event.description.images[0].url,
                eventName: event.name.fi,
                address: event.location.address.street_address,
                postalCode: event.location.address.postal_code,
                locality: event.location.address.locality,
                startDateTime: startDateTime,
                endDateTime: endDateTime,
                maxAttendance: maxAttendance,
                attending: [],
                description: description,
                tags: tags,
                eventUrlLink: event.info_url,
                organizer: auth.currentUser.uid
            }, { merge: true })
            navigation.navigate('EventListTab');

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleTags = () => {
        let tempTags = []
        event.tags.forEach(tag => {
            tempTags.push(tag.name)
        });
        setTags(tempTags);
    }

    const handleTagChange = (item) => {
        const newTags = tags.filter((tag) => tag !== item);
        setTags(newTags);
    }

    const handleDates = () => {
        if (event.event_dates.starting_day != null) setStartDateTime(new Date(event.event_dates.starting_day));
        event.event_dates.ending_day != null ? setEndDateTime(new Date(event.event_dates.ending_day)) : setEndDateTime(startDateTime);
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={{ uri: event.description.images[0].url ? event.description.images[0].url : 'https://images.unsplash.com/photo-1625723347040-0fdf78cb3c1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80' }}
                    resizeMode="cover"
                    style={styles.eventImg}>
                </ImageBackground>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={styles.verticalInputs}>
                        <Text style={styles.label}>ADDRESS</Text>
                        <TextInput
                            value={event.location.address.street_address}
                            editable={false}
                            style={styles.eventInput}
                        />
                        <View style={styles.horizontalInputs}>
                            <View style={styles.horizontalLeft}>
                                <Text style={styles.label}>POSTAL CODE</Text>
                                <TextInput
                                    value={event.location.address.postal_code}
                                    editable={false}
                                    style={styles.eventInput}
                                />
                            </View>
                            <View style={styles.horizontalRight}>
                                <Text style={styles.label}>CITY</Text>
                                <TextInput
                                    value={event.location.address.locality}
                                    editable={false}
                                    style={styles.eventInput}
                                />
                            </View>
                        </View>
                        <View style={styles.horizontalInputs}>
                            <View style={styles.horizontalLeft}>
                                <Text style={styles.label}>START DATE</Text>
                                <TextInput
                                    value={format(startDateTime, 'd.M.yyyy')}
                                    editable={false}
                                    style={styles.eventInput}
                                />
                            </View>
                            <View style={styles.horizontalRight}>
                                <Text style={styles.label}>START TIME</Text>
                                <TextInput
                                    value={format(startDateTime, 'HH:mm')}
                                    editable={false}
                                    style={styles.eventInput}
                                />
                            </View>
                        </View>
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
                            <View style={styles.hkiEventTagGroup}>
                                {tags.map((tag, index) => (
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
                                        onPress={() => handleTagChange(tag)}
                                    />
                                ))}
                            </View>
                            <Button buttonStyle={styles.basicButton} title="Select more tags" titleStyle={styles.basicTitle}
                                onPress={() => navigation.navigate('Event tags', {
                                    eventId: eventId
                                })} />
                            <Text style={styles.label}>EVENT NAME</Text>
                            <TextInput
                                value={event.name.fi}
                                editable={false}
                                maxLength={40}
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
                                value={event.info_url}
                                editable={false}
                                style={styles.eventInput}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <Button title='Publish event' onPress={setData} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}
export default HkiEventScreen;