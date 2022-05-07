import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStack, EventStack, ProfileStack } from './StackNavigator';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventScreen from '../screens/EventScreen';
import EventListScreen from '../screens/EventListScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'HomeTab') {
                        iconName = 'md-home';
                    } else if (route.name === 'ProfileTab') {
                        iconName = 'person';
                    } else if (route.name === 'EventListTab') {
                        iconName = 'md-calendar';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}>
            <Tab.Screen
                name="HomeTab"
                options={{ headerShown: false, tabBarShowLabel: false }}
                component={HomeScreen}
            />
            <Tab.Screen
                name="ProfileTab"
                options={{ headerShown: false, tabBarShowLabel: false }}
                component={ProfileScreen}
            />
            <Tab.Screen
                name="EventListTab"
                options={{ headerShown: false, tabBarShowLabel: false }}
                component={EventListScreen}
            />
        </Tab.Navigator>
    );
}

