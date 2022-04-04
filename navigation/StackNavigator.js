import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventScreen from '../screens/EventScreen';
import EventListScreen from '../screens/EventListScreen';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

/**
const LoginStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
}
 */

/** 
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
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
}
*/

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
        </Stack.Navigator>
    );
}

/** 
const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
            />
        </Stack.Navigator>
    );
}

const EventStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Events"
                component={EventListScreen}
            />
            <Stack.Screen
                name="Create event"
                component={EventScreen}
            />
        </Stack.Navigator>
    );
}
*/

export { MainStack };