import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';
import AccountInfo from './screens/Profile/AccountInfo';
import NavigationTabs from './navigation/NavigationTabs';
import Header from './components/Header';
import Chat from './screens/Chats/Chat';

const Stack = createNativeStackNavigator();

export default function App() {

    const [currentScreen, setCurrentScreen] = useState('Matching');

    const handleStateChange = (state) => {
        setCurrentScreen(getActiveRouteName(state));
    }

    const getActiveRouteName = (state) => {
        const route = state.routes[state.index];
        if(route.state) {
            return getActiveRouteName(route.state);
        }
        return route.name;
    };

    return (
        <NavigationContainer onStateChange={handleStateChange}>
            <Header activeScreen={currentScreen}/>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} /> */}
                
                <Stack.Screen name="HomeTabs" component={NavigationTabs} />
                <Stack.Screen name="AccountInfo" component={AccountInfo} />
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
