import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';
import { ILChevrontL, ILSetting } from '../../../../assets';
import AvatarImage from '../../../../assets/img/avatar.png';

const Profile = ({ navigation, styles, setOpacity, translateX, user }) => {

    const onPress = () => {
        setOpacity(true)
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffff', paddingBottom: 45 }}>
            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ILChevrontL />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPress} >
                    <ILSetting />
                </TouchableOpacity>
            </View>
            <View style={[styles.container, { flexDirection: 'row', marginTop: 50, justifyContent: 'space-between', alignItems: 'center' }]}>
                <View style={{ justifyContent: 'center' }}>

                    <Image source={user.photo ? { uri: user.photo } : AvatarImage} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                </View>
                <View style={{ maxWidth: 270, flex: 1 }}>
                    <Text style={{ fontSize: 16, fontFamily: 'DMSans-Bold' }} >{user.user_name}</Text>
                    <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{user.user_email}</Text>
                </View>
            </View>
        </View>

    )
};

export default Profile;
