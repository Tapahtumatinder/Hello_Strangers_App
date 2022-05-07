import { React } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { format, isToday } from 'date-fns';
import { Avatar, ListItem } from 'react-native-elements';
import styles from '../AppStyle';


const EventList = (props) => {

    const navigation = useNavigation();

    // event items displayed in a flatlist
    const renderItem = ({ item }) => {
        return (
            <ListItem
                topDivider
                onPress={() => {
                    navigation.navigate('Event details', { event: item });
                }}
                bottomDivider
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

    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
        />
    )

}

export default EventList;