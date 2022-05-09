import React from "react";
import { FlatList, SafeAreaView, View } from 'react-native';
import { Avatar, Icon, ListItem } from "react-native-elements";
import styles from '../AppStyle';
import { format, isToday } from 'date-fns';
import { isEmpty } from '@firebase/util';

const ApiEventsList = (props) => {
    const { events, navigation } = props;

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.hkiApiEventsFlatList}>
                <FlatList
                    data={events}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        if (isEmpty(events[0])) {
                            return (
                                <ListItem bottomDivider>
                                    <Avatar
                                        size={58}
                                        rounded
                                        source={{ uri: 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }}
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.boldFontWeight}>Create event from scratch</ListItem.Title>
                                        <ListItem.Subtitle>In my location</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <Icon
                                        reverse
                                        name='add-outline'
                                        type='ionicon'
                                        color='#1390E0'
                                        onPress={() => navigation.navigate('Create event')}
                                    />
                                </ListItem>)
                        } else {
                            if (index == 0) {
                                return (
                                    <ListItem bottomDivider>
                                        <Avatar
                                            size={58}
                                            rounded
                                            source={{ uri: 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }}
                                        />
                                        <ListItem.Content>
                                            <ListItem.Title style={styles.boldFontWeight}>Create event from scratch</ListItem.Title>
                                            <ListItem.Subtitle>In my location</ListItem.Subtitle>
                                        </ListItem.Content>
                                        <Icon
                                            reverse
                                            name='add-outline'
                                            type='ionicon'
                                            color='#1390E0'
                                            onPress={() => navigation.navigate('Create event')}
                                        />
                                    </ListItem>)
                            } return (
                                <ListItem bottomDivider onPress={() => navigation.navigate('Create Helsinki Event', { event: item })}>
                                    <Avatar
                                        size={58}
                                        rounded
                                        source={{ uri: 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80' }} />
                                    <ListItem.Content>
                                        <ListItem.Title style={styles.boldFontWeight}>{item.name.fi} (go together)</ListItem.Title>
                                        <ListItem.Subtitle>{item.location.address.street_address}, {item.location.address.locality}</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Content right>
                                        <ListItem.Title style={styles.colorBlue}>
                                            {isToday(new Date(item.event_dates.starting_day)) ? 'Today' : format(new Date(item.event_dates.starting_day), 'MMM d')}
                                        </ListItem.Title>
                                        <ListItem.Subtitle style={styles.colorBlue}>
                                            {format(new Date(item.event_dates.starting_day), 'HH:mm')}
                                        </ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        }

                    }}
                />
            </View>
        </SafeAreaView>
    );
}
export default ApiEventsList;
