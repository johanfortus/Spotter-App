import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const MessagesTabs = () => {

    const [activeTab, setActiveTab] = useState('chats');

    const chatsTabPressed = () => setActiveTab('chats');
    const matchTabPressed = () => setActiveTab('matches')

    return (
        <View>
            <View style={styles.tabContainer}>

                <Pressable onPress={chatsTabPressed}>
                    <Text style={activeTab === 'chats' ? styles.chatTabActive : styles.chatTabInactive}>CHATS</Text>
                </Pressable>

                <Pressable onPress={matchTabPressed}>
                    <Text style={activeTab === 'matches' ? styles.matchesTabActive : styles.matchesTabInactive}>MATCHES</Text>
                </Pressable>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 15,
        marginTop: 20,
    },
    chatTabActive: {
        color: 'white',
        fontFamily: 'Bebas Neue',
        fontSize: 22,
    },
    chatTabInactive: {
        color: '#959395',
        fontFamily: 'Bebas Neue',
        fontSize: 22,
    },
    matchesTabActive: {
        color: 'white',
        fontFamily: 'Bebas Neue',
        fontSize: 22,
    },
    matchesTabInactive: {
        color: '#959395',
        fontFamily: 'Bebas Neue',
        fontSize: 22,
    },
});

export default MessagesTabs;