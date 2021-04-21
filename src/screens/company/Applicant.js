import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILMoreVErtical } from '../../assets';
import Avatar from '../../assets/img/avatar.png';
import { fetchApplicants } from '../../store/reducer/applicantReducer';

const Applicant = ({ navigation }) => {
    const dispatch = useDispatch()

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const applicants = useSelector(({ applicants }) => applicants.Applicants)

    useEffect(() => {
        if (token) {
            dispatch(fetchApplicants(token))
        }
    }, [dispatch, token])

    return (
        <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }}>
            <View>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 50 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 50 }}
                    >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Applicants</Text>
                    </View>
                    <View style={{ width: 50 }} />
                </View>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false}
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', paddingVertical: 20 }}
            >
                <View style={{ paddingHorizontal: 20 }} >
                    {applicants && applicants.map(applicant => (
                        <TouchableOpacity
                            key={applicant._id}
                            onPress={() => navigation.navigate('DetailJobseeker', { id: applicant.user._id, isApplicant: true })}
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#ffff', borderRadius: 10, alignItems: 'center', padding: 20
                            }}
                        >
                            <Image source={applicant.user.photo ? { uri: applicant.user.photo } : Avatar} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                            <View style={{ flex: 1, marginLeft: 12 }} >
                                <Text>{applicant.user.user_name}</Text>
                                <Text>{applicant?.user?.user_profession}</Text>
                            </View>
                            <ILMoreVErtical />
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    card: {
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 25,
        marginTop: 15,
    }
});

export default Applicant;
