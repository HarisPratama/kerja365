import React, { useState, useEffect } from 'react';
import { Text, Image, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL } from '../assets';
import Avatar from '../assets/img/avatar.png';
import { fetchMessages } from '../store/reducer/messagesReducer';
import { getData } from '../utils/localStorage';

const Messages = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const messages = useSelector(({ messages }) => messages.Messages)

    useEffect(() => {
        (async () => {
            const data = await getData('user')
            dispatch({ type: 'SET_USER', payload: data })
        })()
        if (token) {
            dispatch(fetchMessages(user._id, token))
        }
    }, [dispatch, token])

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#ffff' }}
        >
            <View
                style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20, paddingBottom: 40
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: 50 }}
                >
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16 }} >Messages</Text>
                </View>
                <View style={{ width: 50 }} />
            </View>
            <ScrollView style={{ padding: 20, flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)' }} >
                {messages && messages.map(message => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chat', { id: message.uidPartner })}
                        key={message.id}
                        style={{
                            flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', borderRadius: 11, padding: 20, backgroundColor: '#ffff'
                        }}
                    >
                        <Image source={message.partner?.photo?.length > 0 ? { uri: message.partner?.photo } : Avatar} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                        <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }} >
                            <Text style={{ fontFamily: 'DMSans-Bold' }} >{message.partner.user_name}</Text>
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >{message.lastContentChat}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

export default Messages;
