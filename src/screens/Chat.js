import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILSend1 } from '../assets';
import Avatar from '../assets/img/avatar.png';
import { fetchChatting } from '../store/reducer/chattingReducer';
import { getData } from '../utils/localStorage';
import { fetchGetUser } from '../store/reducer/userReducer';
import database from '@react-native-firebase/database';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const ChatItem = ({ isMe, chat, currentUser, getUser }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: isMe ? 'flex-end' : 'flex-start', marginTop: 10 }} >
            <View>
                <View
                    style={{
                        backgroundColor: currentUser._id === chat.sendBy ? '#81ecec' : '#9b59b6', padding: 20, borderTopRightRadius: 11, borderTopLeftRadius: 11, borderBottomLeftRadius: 11
                    }}
                >
                    <Text style={{ fontFamily: 'DMSans-Regular', color: currentUser._id === chat.sendBy ? 'black' : '#ffff', maxWidth: 200 }} >{chat.chatContent}</Text>
                </View>
                <Text style={{ fontSize: 10, color: '#b2bec3', textAlign: 'right' }} >{chat.chatTime}</Text>
            </View>
            <View style={{ width: 10 }} />
            <View
                style={{
                    width: 30, height: 30, borderRadius: 30 / 2, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#81ecec', alignSelf: 'flex-end'
                }}
            >
                {currentUser._id === chat.sendBy && (
                    <Image
                        source={currentUser?.photo ? { uri: currentUser?.photo } : Avatar}
                        style={{ width: 25, height: 25, borderRadius: 25 / 2 }}
                    />
                )}
                {getUser._id === chat.sendBy && (
                    <Image
                        source={getUser?.photo ? { uri: getUser?.photo } : Avatar}
                        style={{ width: 25, height: 25, borderRadius: 25 / 2 }}
                    />
                )}
            </View>
        </View>
    )
}

const Chat = ({ navigation, route }) => {


    const dispatch = useDispatch()

    const { id } = route.params

    const [message, setMessage] = useState('')

    const currentUser = useSelector(({ user }) => user.User)
    const getUser = useSelector(({ user }) => user.GetUser)
    const token = useSelector(({ user }) => user.Token)
    const chattings = useSelector(({ chattings }) => chattings.Chats)

    useEffect(() => {
        (async () => {
            const data = await getData('user')
            dispatch({ type: 'SET_USER', payload: data })
        })()
        if (currentUser.type === 'company') {
            dispatch(fetchChatting(currentUser._id, id))
        } else {
            dispatch(fetchChatting(id, currentUser._id))
        }
        if (token) {
            dispatch(fetchGetUser(token, id))
        }
    }, [dispatch, token])

    const sendMessage = async () => {

        const today = new Date()
        const hour = today.getHours()
        const minute = today.getMinutes()
        const date = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()
        const data = {
            sendBy: currentUser._id,
            chatDate: new Date().getTime(),
            chatTime: `${hour}:${String(minute).length > 1 ? minute : `0${minute}`} ${hour > 12 ? 'PM' : 'AM'}`,
            chatContent: message
        }
        let chatId
        let urlMessageCompany
        let urlMessageJobseeker

        let historyChatCompany
        let historyChatForJobseeker

        if (currentUser.type === 'company') {
            chatId = `${currentUser._id}_${id}`
            urlMessageCompany = `messages/${currentUser._id}/${chatId}`
            urlMessageJobseeker = `messages/${id}/${chatId}`
            historyChatCompany = {
                lastContentChat: message,
                lastChatDate: today.getTime(),
                uidPartner: id
            }
            historyChatForJobseeker = {
                lastContentChat: message,
                lastChatDate: today.getTime(),
                uidPartner: currentUser._id
            }
        } else {
            chatId = `${id}_${currentUser._id}`
            urlMessageCompany = `messages/${id}/${chatId}`
            urlMessageJobseeker = `messages/${currentUser._id}/${chatId}`
            historyChatForJobseeker = {
                lastContentChat: message,
                lastChatDate: today.getTime(),
                uidPartner: id
            }
            historyChatCompany = {
                lastContentChat: message,
                lastChatDate: today.getTime(),
                uidPartner: currentUser._id
            }
        }



        try {
            setMessage('')
            await database()
                .ref(
                    `chatting/${chatId}/allChat/${year}-${month}-${date}`
                )
                .push(data)

            await database().ref(`${urlMessageCompany}`).set(historyChatCompany)
            await database().ref(`${urlMessageJobseeker}`).set(historyChatForJobseeker)

        } catch (error) {
            console.log(error.message);
            showMessage(error.message)
        }
    }

    return (
        <View
            style={{ flex: 1, backgroundColor: '#ffff' }}
        >
            <FlashMessage position='top' />
            <View
                style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingHorizontal: 20, paddingBottom: 40, paddingTop: 10, backgroundColor: '#ffff', borderBottomWidth: 2, borderRightWidth: 2, borderLeftWidth: 2, borderColor: '#eeee', borderBottomLeftRadius: 50, borderBottomRightRadius: 50
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: 60 }}
                >
                    <ILChevrontL />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 22, fontFamily: 'DMSans-Bold' }} >{getUser?.user_name}</Text>
                    <Text style={{ fontFamily: 'DMSans-Regular' }} >{getUser.type === 'company' ? 'Company' : getUser?.user_profession}</Text>
                </View>
                <View style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={getUser?.photo === '' ? Avatar : { uri: getUser?.photo }} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', borderTopRightRadius: 50, borderTopLeftRadius: 50 }}
            >
                <View style={{ paddingVertical: 20, paddingHorizontal: 20 }} >

                    {chattings && chattings?.map(chatting => {
                        return (
                            <View key={chatting.id} >
                                <Text style={{ fontFamily: 'DMSans-Bold', color: 'rgba(0,0,0,0.5)', textAlign: 'center' }} >{chatting.id}</Text>
                                {chatting.data.map(chat => {
                                    // console.log(chat, "<<< chat");
                                    return (
                                        <ChatItem
                                            key={chat.id}
                                            isMe={chat.data.sendBy === currentUser._id}
                                            chat={chat.data}
                                            getUser={getUser}
                                            currentUser={currentUser}
                                        />
                                    )
                                })}
                            </View>
                        )
                    })}

                </View>
            </ScrollView>
            <View style={{ backgroundColor: '#ffff' }} >
                <View style={{ flexDirection: 'row', padding: 20 }} >
                    <TextInput
                        placeholder={`Send message to ${getUser.fullName ? getUser?.fullName?.substring(0, getUser.fullName.indexOf(' ')) : getUser?.companyName?.substring(0, getUser.companyName.indexOf(' '))}`}
                        style={{ padding: 10, flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)', borderRadius: 11, color: 'black' }}
                        multiline={true}
                        value={message}
                        onChangeText={value => setMessage(value)}
                        placeholderTextColor='#c4c4c4'
                    />
                    <View style={{ width: 10 }} />
                    {message?.length > 0 ? (
                        <TouchableOpacity
                            onPress={sendMessage}
                            style={{
                                backgroundColor: '#81ecec', width: 50, borderRadius: 11, justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <ILSend1 />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ backgroundColor: '#eeee', width: 50, borderRadius: 11, justifyContent: 'center', alignItems: 'center' }} >
                            <ILSend1 />
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
};

export default Chat;
