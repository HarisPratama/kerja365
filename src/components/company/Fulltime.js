import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILMoreVErtical } from '../../assets';
import Avatar from '../../assets/img/avatar.png';
import { fetchFulltimers } from '../../store/reducer/userReducer';

const Fulltime = ({ navigation, token }) => {
    const dispatch = useDispatch()
    const jobseekers = useSelector(({ user }) => user.Fulltimers)

    useEffect(() => {
        if (token) {
            dispatch(fetchFulltimers(token))
        }
    }, [token])

    return (
        <View>
            {jobseekers && jobseekers.map((jobseeker) => (
                <TouchableOpacity
                    key={jobseeker._id}
                    onPress={() => navigation.navigate('DetailJobseeker', { id: jobseeker._id })}
                    style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#ffff', borderRadius: 10, alignItems: 'center', padding: 20
                    }}
                >
                    <Image source={jobseeker.photo ? { uri: jobseeker.photo } : Avatar} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                    <View style={{ flex: 1, marginLeft: 12 }} >
                        <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >{jobseeker.user_name}</Text>
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >{jobseeker?.user_profession}</Text>
                    </View>
                    <ILMoreVErtical />
                </TouchableOpacity>
            ))}
            {jobseekers?.length > 4 && (
                <TouchableOpacity style={{ marginTop: 30, padding: 20, borderRadius: 50, height: 50, backgroundColor: 'rgba(238, 238, 238, 0.5)', justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontFamily: 'DMSans-Regular', color: '#FF9901' }} >Show More</Text>
                </TouchableOpacity>
            )}
        </View>
    )
};

export default Fulltime;
