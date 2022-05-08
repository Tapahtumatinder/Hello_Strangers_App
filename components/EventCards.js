import { React } from 'react';
import { useNavigation, } from '@react-navigation/native';
import { FlatList, ImageBackground, View, Text, Pressable } from 'react-native';
import { format, isToday } from 'date-fns';
import { Avatar, Chip, } from 'react-native-elements';
import styles from '../AppStyle';
import { isEmpty } from '@firebase/util';


const EventCards = (props) => {

    const navigation = useNavigation();

    // event items displayed in a horizontal flatlist as cards
    const renderItem = ({ item }) => {
        return (
            <Pressable style={styles.card}
                onPress={() => {
                    navigation.navigate('Event details', { event: item });
                }}
            >
                <ImageBackground
                    source={{ uri: item.pictureUrl ? item.pictureUrl : 'https://images.unsplash.com/photo-1625723347040-0fdf78cb3c1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80' }}
                    imageStyle={{ opacity: 0.8 }}
                    style={styles.cardBacgroundImg}>


                    { /* Main content of the list item */}
                    <View style={styles.cardInfo}>
                        { /* User Avatar, Name & Age*/}
                        <View style={styles.avatarOnEventCard}>
                            <Avatar
                                size={58}
                                rounded
                                source={{ uri: item.hostImgUrl ? item.hostImgUrl : 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }} />
                            <View>
                                <Text style={styles.txtOnEventCard}>{`${item.hostName}, ${item.hostAge}`}</Text>
                                <Text style={styles.txtOnEventCard}>{item.eventName}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingRight: 60 }}>
                            <Chip
                                title={`${item.address}, ${item.postalCode} ${item.locality}`}
                                titleStyle={styles.cardText}
                                type='flat'
                                buttonStyle={styles.cardChip}
                                icon={{
                                    name: 'compass',
                                    type: 'ionicon',
                                    size: 15,
                                    color: 'white',
                                }} />
                            <Chip
                                title={format(new Date(item.startDateTime.toDate()), 'EEE d MMM yyyy HH:mm')}
                                titleStyle={styles.cardText}
                                type='flat'
                                buttonStyle={styles.cardChip}
                                icon={{
                                    name: 'time',
                                    type: 'ionicon',
                                    size: 15,
                                    color: 'white',
                                }} />
                            {!isEmpty(item.attending) && <Chip
                                title={"Attending " + item.attending.length + (isEmpty(item.maxAttendance) ? '' : "/" + item.maxAttendance)}
                                titleStyle={styles.cardText}
                                type='flat'
                                buttonStyle={styles.cardChip}
                                icon={{
                                    name: 'person-circle',
                                    type: 'ionicon',
                                    size: 15,
                                    color: 'white',
                                }} />}
                        </View>
                        {!isEmpty(item.tags) &&

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {item.tags.map((tag, index) => (
                                    <Chip key={index}
                                        title={tag}
                                        titleStyle={styles.cardText}
                                        type='flat'
                                        buttonStyle={styles.cardChip}
                                        icon={{
                                            name: 'checkmark-circle',
                                            type: 'ionicon',
                                            size: 15,
                                            color: 'white',
                                        }} />
                                ))}
                            </View>
                        }
                    </View>
                </ImageBackground>

            </Pressable>
        )
    }

    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            horizontal
        />
    )

}

export default EventCards;