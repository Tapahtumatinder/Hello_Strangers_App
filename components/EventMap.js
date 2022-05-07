import { React, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import { format, isToday } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import styles from '../AppStyle';
import { isEmpty } from '@firebase/util';


const EventMap = (props) => {

    //* Enabling navigation
    const navigation = useNavigation();

    //* Custom style for map
    const mapStyle = [
        { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
        { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
        { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
        { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
        { "featureType": "administrative.land_parcel", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
        { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
        { "featureType": "poi.park", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
        { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] },
        { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
        { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
        { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
        { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] },
        { "featureType": "road.local", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
        { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }
    ];

    const events = props.data;

    const [eventsWithCoords, setEventsWithCoords] = useState([]);

    //* Setting region for map
    const [region, setRegion] = useState({
        latitude: 60.16801,
        longitude: 24.941569,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221
    });

    //* initializing coordinates for markers
    const [coordinates, setCoordinates] = useState({
        latitude: 60.16801,
        longitude: 24.941569
    });

    const [coords, setCoords] = useState({
        latitude: null,
        longitude: null
    });


    const getCoordinates = async (events) => {

        events.map((item, index) => {
            console.log(item.address.replace(' ', ''));

            fetch('http://www.mapquestapi.com/geocoding/v1/address?key=Pba7m8GH0z5Wr7Dbd4AXem7GqTUaujPo&location=' + item.address.replace(' ', ''))
                .then(response => response.json())
                .then(data => {
                    console.log(data.results[0].locations[0].latLng.lat);
                    console.log(data.results[0].locations[0].latLng.lng);
                    setCoords({
                        latitude: data.results[0].locations[0].latLng.lat,
                        longitude: data.results[0].locations[0].latLng.lng
                    })
                })
                .catch(error => { Alert.alert('Error', error.toString()); });
            console.log(coords);
        }
        )

    };

    useEffect(() => {
        console.log(getCoordinates(events));
    }, [])
    /* fuctions to zoom in and out by pressing buttons on the map */
    const onPressZoomIn = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta / 4,
            longitudeDelta: region.longitudeDelta / 4
        })
    }

    const onPressZoomOut = () => {
        setRegion({
            ...region,
            latitudeDelta: region.latitudeDelta * 4,
            longitudeDelta: region.longitudeDelta * 4
        })
    }


    //* return mapview with markers and zoom-buttons
    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                region={region}
                customMapStyle={mapStyle}
            >
                <Marker coordinate={coordinates} style={styles.marker}
                    onPress={() => {
                        navigation.navigate('Create event');
                    }}>
                    <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/hellostrangersapp.appspot.com/o/avatar%2Fk38tgBqsh6NhJbz0VWtBe9EcDTt1?alt=media&token=fb176975-538a-47da-9147-4d5096cb43d4' }}
                        style={styles.markerImage} />
                    <View style={styles.markerTextView}>
                        <Text style={styles.markerText} numberOfLines={1}>Tapahtuman nimi</Text>
                        <Text style={styles.markerText} numberOfLines={1}>Aika</Text>
                    </View>
                </Marker>
            </MapView>
            <View style={styles.zoom}>
                <TouchableOpacity
                    onPress={() => { onPressZoomIn() }}
                >
                    <Ionicons
                        style={styles.icon}
                        name='add-circle-outline'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { onPressZoomOut() }}
                >
                    <Ionicons
                        style={styles.icon}
                        name="remove-circle-outline"
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </View >
    )

}

export default EventMap;