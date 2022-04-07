import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import EventScreen from '../screens/EventScreen';
import EventListScreen from '../screens/EventListScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EditEventScreen from '../screens/EditEventScreen';

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
                component={TabNavigator}
            />
            <Stack.Screen
                name="Create event"
                component={EventScreen}
            />
            <Stack.Screen
                name='Event details'
                component={EventDetailsScreen}
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
        </Stack.Navigator>
    );
}

export { MainStack };