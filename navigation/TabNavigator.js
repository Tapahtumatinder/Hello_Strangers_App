import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EventListScreen from '../screens/EventListScreen';
import CreateEventScreen from '../screens/CreateEventScreen';

const Tab = createBottomTabNavigator();

// Screens that need their own tab go here
const TabNavigator = () => {
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
                    } else if (route.name === 'Create Events') {
                        iconName = 'add-circle';
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
                name="Create Events"
                options={{ headerShown: false, tabBarShowLabel: false }}
                component={CreateEventScreen}
            />
            <Tab.Screen
                name="EventListTab"
                options={{ headerShown: false, tabBarShowLabel: false }}
                component={EventListScreen}
            />
        </Tab.Navigator>
    );
}

export { TabNavigator };
