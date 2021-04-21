import React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL } from '../../../assets';
import { FormWorkExperience } from '../../../components';
import { fetchUser } from '../../../store/reducer/userReducer';
import { fetchWorkExperience } from '../../../store/reducer/workExperienceRedux';

const WorkExperience = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { edit, id } = route.params

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const experience = useSelector(({ experiences }) => experiences.WorkExperince)

    useEffect(() => {
        if (edit && token && id) {
            dispatch(fetchWorkExperience(token, id))
        }

        dispatch(fetchUser(user._id, token))
    }, [token])

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <ScrollView style={{ backgroundColor: '#ffff' }}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 72 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Add work experience</Text>
                    </View>
                    <View></View>
                </View>
                <FormWorkExperience
                    navigation={navigation}
                    token={token}
                    experience={experience}
                    edit={edit}
                    id={id}
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

export default WorkExperience;
