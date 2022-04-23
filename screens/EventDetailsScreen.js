import { React, useState, useLayoutEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, deleteDoc, updateDoc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore/lite";
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    View
} from 'react-native';
import {
    Avatar,
    BottomSheet,
    Button,
    Chip,
    Icon,
    ListItem,
    Text
} from 'react-native-elements';
import { format } from 'date-fns';
import styles from '../AppStyle';

const EventDetailsScreen = ({ route, navigation }) => {
  
    const { event } = route.params;
    const [isVisible, setIsVisible] = useState(false);

    // Add a current users id to the "attendance" array field.
    const addAttendance = async () => {
        const ref = doc(db, 'event', event.id);
        await updateDoc(ref, {
            attending: arrayUnion(auth.currentUser.uid)
        });
    }

    // Remove current users id from the "attendance" array field.
    const removeAttendance = async () => {
        const ref = doc(db, 'event', event.id);
        await updateDoc(ref, {
            attending: arrayRemove(auth.currentUser.uid)
        });
    }

    /*
    const attending = [
        'SN83doHTkSdXAVP67HMWl0oYRpv2',
        'pejQN1GR12ZAiUgLLVKXEwld3Fr1',
        'k38tgBqsh6NhJbz0VWtBe9EcDTt1'
    ];

    const setData = async () => {
        const ref = doc(db, 'event', event.id);
        await setDoc(ref, { attending: attending }, { merge: true })
        console.log(ref)
    }
    */

    // to display button in the right upper corner of the header (three dots)
    useLayoutEffect(() => {
        //addAttendance();
        removeAttendance();
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => setIsVisible(true)}
                    title=''
                    titleStyle={{ color: 'black' }}
                    type='solid'
                    buttonStyle={{ backgroundColor: 'white', borderRadius: 20 }}
                    icon={
                        <Icon
                            name='ellipsis-vertical'
                            type='ionicon'
                            size={25}
                            color="black" />}
                    iconRight />
            ),
        });
    }, [navigation]);

    // removes event from Firestore
    const deleteEvent = async () => {
        if (event.organizer === auth.currentUser.uid) {
            try {
                await deleteDoc(doc(db, 'event', event.id));
            } catch (error) {
                console.log('Something went wrong');
            }
        }
        navigation.goBack('Events');
    }

    // TODO: event image (now hardcoded), 'tags' and 'attending'-chips and bottom sheet's 'Attending' action (doesn't do anything now)
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1625723347040-0fdf78cb3c1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80' }}
                    resizeMode="cover"
                    imageStyle={{ opacity: 0.8 }}
                    style={styles.eventImg}>
                    <View style={styles.eventActionButton}>

                    </View>
                    <View style={styles.avatarOnEventImg}>
                        <Avatar
                            size={64}
                            rounded
                            source={{ uri: event.hostImgUrl ? event.hostImgUrl : 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }}
                        />
                        <View>
                            <Text style={styles.txtOnEventImg}>{`${event.hostName}, ${event.hostAge}`}</Text>
                            <Text style={styles.txtOnEventImg}>{event.eventName}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.eventChips}>
                    <Chip
                        title={`${event.address}, ${event.postalCode} ${event.locality}`}
                        titleStyle={{ color: 'black' }}
                        type='outline'
                        buttonStyle={{ backgroundColor: '#D6D6D6', borderColor: 'white' }}
                        icon={{
                            name: 'compass',
                            type: 'ionicon',
                            size: 20,
                            color: 'black',
                        }}
                        containerStyle={{ marginVertical: 8 }} />
                    <Chip
                        title={format(new Date(event.startDateTime.toDate()), 'EEE d MMM yyyy HH:mm')}
                        titleStyle={{ color: 'black' }}
                        type='outline'
                        buttonStyle={{ backgroundColor: '#D6D6D6', borderColor: 'white' }}
                        icon={{
                            name: 'time',
                            type: 'ionicon',
                            size: 20,
                            color: 'black',
                        }}
                        containerStyle={{ marginVertical: 8 }} />
                    <Chip
                        title="Attending"
                        titleStyle={{ color: 'black' }}
                        type='outline'
                        buttonStyle={{ backgroundColor: '#D6D6D6', borderColor: 'white' }}
                        icon={{
                            name: 'person-circle',
                            type: 'ionicon',
                            size: 20,
                            color: 'black',
                        }}
                        containerStyle={{ marginVertical: 8 }} />
                    <Chip
                        title="Tags"
                        titleStyle={{ color: 'black' }}
                        type='outline'
                        buttonStyle={{ backgroundColor: '#D6D6D6', borderColor: 'white' }}
                        icon={{
                            name: 'checkmark-circle',
                            type: 'ionicon',
                            size: 20,
                            color: 'black',
                        }}
                        containerStyle={{ marginVertical: 8 }} />
                </View>
                <View
                    style={{
                        borderBottomColor: '#D6D6D6',
                        borderBottomWidth: 1,
                        margin: 10
                    }}
                />
                <View style={styles.eventDescription}>
                    <Text style={styles.boldFontWeight}>Description:</Text>
                    <Text style={{ marginTop: 15 }}>{event.description}</Text>
                </View>
                <BottomSheet
                    isVisible={isVisible}>
                    {event.organizer === auth.currentUser.uid ?
                        (<View>
                            <ListItem bottomDivider>
                                <ListItem.Content style={styles.bottomSheetContent}>
                                    <ListItem.Title
                                        onPress={() => navigation.navigate('Edit event', { eventObj: event })}>
                                        <Text>Edit event</Text>
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                            <ListItem bottomDivider>
                                <ListItem.Content style={styles.bottomSheetContent}>
                                    <ListItem.Title
                                        onPress={() => deleteEvent()}>
                                        <Text>Cancel event</Text>
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </View>
                        )
                        :
                        (<ListItem bottomDivider>
                            <ListItem.Content style={styles.bottomSheetContent}>
                                <ListItem.Title>
                                    <Text>Let host know you'd like to attend</Text></ListItem.Title>
                            </ListItem.Content>
                        </ListItem>)
                    }
                    <ListItem bottomDivider>
                        <ListItem.Content style={styles.bottomSheetContent}>
                            <ListItem.Title>
                                <Icon
                                    name='close'
                                    onPress={() => setIsVisible(false)} />
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </BottomSheet>
            </ScrollView>
        </SafeAreaView>
    );
}
export default EventDetailsScreen;