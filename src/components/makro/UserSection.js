import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AvatarImage from '../../assets/img/avatar.png';
import { ILBell } from '../../assets/img'
import { useSelector } from 'react-redux';

const UserSection = ({ user, navigation }) => {

    const notifications = useSelector(({ messages }) => messages.Notifications)

    return (
        <View style={{ backgroundColor: '#ffff' }}>
            <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'center' }}>
                    <Image source={user?.photo ? { uri: user?.photo } : AvatarImage} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                </View>
                <View style={{ maxWidth: 270, flex: 1 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'DMSans-Bold' }} >{user?.user_name}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{user?.user_email}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{user?.type}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        {notifications?.length > 0 && (
                            <View
                                style={{ position: 'absolute', width: 20, height: 20, backgroundColor: '#e74c3c', borderRadius: 20 / 2, justifyContent: 'center', alignItems: 'center', zIndex: 2, left: -8, top: -7 }}
                            >
                                <Text style={{ color: '#ffff', fontSize: 10 }} >{notifications.length}</Text>
                            </View>
                        )}
                        <ILBell />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontFamily: 'DMSans-Bold',
        marginTop: 15
    }
})

export default UserSection;
