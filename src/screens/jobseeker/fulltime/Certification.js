import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL } from '../../../assets';
import { FormCertification } from '../../../components';
import { fetchCertification } from '../../../store/reducer/certificationReducer';
import { fetchUser } from '../../../store/reducer/userReducer';


const Certification = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { edit, id } = route.params
    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const certification = useSelector(({ certifications }) => certifications.Certification)

    useEffect(() => {
        if (edit && token && id) {
            dispatch(fetchCertification(token, id))
        }
        dispatch(fetchUser(user._id, token))
    }, [token, dispatch])

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView style={{ backgroundColor: '#ffff' }}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 72 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >{id ? 'Edit' : 'Add'} certification</Text>
                    </View>
                    <View></View>
                </View>
                <FormCertification
                    navigation={navigation}
                    token={token}
                    certification={certification}
                    edit={edit}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
});


export default Certification;
