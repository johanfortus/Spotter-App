import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import AccountInfo from '../screens/AccountInfo';
import Messages from '../screens/Messages';
import GymHub from '../screens/GymHub';
import Match from '../screens/Match';
import COLORS from '../utils/theme';

const Tab = createBottomTabNavigator();

const BlankScreen = ({ title }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    </View>
);

export default function NavigationTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: { 
                    backgroundColor: '#141417',
                    height: 80,
                    borderTopWidth: 0 
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: COLORS.accent,
                tabBarInactiveTintColor: '#888',
                tabBarIconStyle: { marginTop: 10 },
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    switch (route.name) {
                        case 'Matching':
                            iconName = 'barbell';
                            break;
                        case 'Explore':
                            iconName = 'compass';
                            break;
                        case 'Messages':
                            iconName = 'chatbox';
                            break;
                        case 'Profile':
                            iconName = 'person';
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Matching" component={Match} />
            <Tab.Screen name="Explore" component={GymHub} />
            <Tab.Screen name="Messages" component={Messages} />
            <Tab.Screen name="Profile" component={AccountInfo} />
        </Tab.Navigator>
    );
}
