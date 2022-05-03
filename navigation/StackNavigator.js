import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EventScreen from '../screens/EventScreen';
import EventListScreen from '../screens/EventListScreen';
import { TabNavigator } from './TabNavigator';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import InterestScreen from '../screens/InterestScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
            />
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
                options={({ navigation, route }) => ({
                })}
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