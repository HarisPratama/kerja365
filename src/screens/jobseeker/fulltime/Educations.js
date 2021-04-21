import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL } from '../../../assets';
import { FormEducation } from '../../../components';
import { fetchEducation } from '../../../store/reducer/educationReducer';
import { fetchUser } from '../../../store/reducer/userReducer';

const Educations = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { id, edit } = route.params

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const education = useSelector(({ educations }) => educations.Education)

    useEffect(() => {
        if (edit && token && id) {
            dispatch(fetchEducation(token, id))
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
                        <Text style={{ fontSize: 16 }} >Add education</Text>
                    </View>
                    <View></View>
                </View>
                <FormEducation
                    navigation={navigation}
                    education={education}
                    edit={edit}
                    token={token}
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

export default Educations;
