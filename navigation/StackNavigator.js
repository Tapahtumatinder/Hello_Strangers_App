import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EventScreen from '../screens/EventScreen';
import EventListScreen from '../screens/EventListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EditEventScreen from '../screens/EditEventScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import InterestScreen from '../screens/InterestScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HkiEventScreen from '../screens/HkiEventScreen';
import EventTagScreen from '../screens/EventTagScreen';

const Stack = createNativeStackNavigator();

// Screens that don't need tabs go here
const MainStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
            />
            <Stack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={TabNavigator}
            />
            <Stack.Screen
                name="Create event"
                component={EventScreen}
            />
            <Stack.Screen
                name="Delete account"
                component={DeleteAccountScreen}
            />
            <Stack.Screen
                name="Interest"
                component={InterestScreen}
            />
            <Stack.Screen
                name='EditProfile'
                component={EditProfileScreen}
                options={({ navigation, route }) => ({
                })}
            />
            <Stack.Screen
                name='Event details'
                component={EventDetailsScreen}
                options={({ navigation, route }) => ({
                })}
            />
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={({ navigation, route }) => ({
                })}
            />
            <Stack.Screen
                name='Edit event'
                component={EditEventScreen}
            />
            <Stack.Screen
                name='Events'
                component={EventListScreen}
            />
            <Stack.Screen
                name="Event tags"
                component={EventTagScreen}
            />
            <Stack.Screen
                name='Create Helsinki Event'
                component={HkiEventScreen}
            />
        </Stack.Navigator>
    );
}

export { MainStack };