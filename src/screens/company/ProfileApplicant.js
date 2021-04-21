import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView, StyleSheet } from 'react-native';
import { ILChevrontL } from '../../assets';
import Avatar from '../../assets/img/avatar.png';

const ProfileApplicant = ({ navigation, route }) => {
    const { id } = route.params
    const [applicant, setApplicant] = useState({})

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <View style={{ flexDirection: 'row', marginTop: 70, paddingHorizontal: 20, justifyContent: 'space-between' }} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16, fontFamily: 'DMSans-Regular' }} >Profile Applicant</Text>
                </View>
                <View></View>
            </View>
            <ScrollView style={{ marginTop: 20 }} >
                <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Image source={Avatar} style={{ width: 100, height: 100 }} />
                    <View style={{ marginTop: 20 }} >
                        <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16, textAlign: 'center' }} >{applicant.name}</Text>
                        <Text style={{ fontFamily: 'DMSans-Regular', textAlign: 'center' }} >{applicant.email}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ProfileApplicant;
