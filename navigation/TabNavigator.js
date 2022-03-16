import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainStack, EventStack, ProfileStack } from './StackNavigator';
import { Ionicons } from '@expo/vector-icons';

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
                component={MainStack}
            />
            <Tab.Screen
                name="ProfileTab"
                options={{ headerShown: false, tabBarShowLabel: false }}
                component={ProfileStack}
            />
            <Tab.Screen
                name="EventListTab"
                options={{ headerShown: false, tabBarShowLabel: false }}
                component={EventStack}
            />
        </Tab.Navigator>
    );
}

