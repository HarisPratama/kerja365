import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL } from '../../assets';
import { fetchUserByEmail, updatePatchUser } from '../../store/reducer/userReducer';

const InterestCategory = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { user_email } = route.params
    const [interests, setInterests] = useState([])

    const categories = ['Marketing', 'IT', 'Design', 'Administrasi', 'Sales']

    const user = useSelector(({ user }) => user.User)

    useEffect(() => {
        dispatch(fetchUserByEmail(user_email))
    }, [interests, dispatch])

    const onPress = (value) => {
        let newInterest
        if (interests.includes(value)) {
            console.log('sama')
            newInterest = interests.filter(el => el !== value)
        } else {
            newInterest = interests.concat(value)
        }
        setInterests(newInterest)
    }

    const set = () => {
        dispatch(updatePatchUser(user._id, interests))
        navigation.navigate('SignIn')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }]}>
                <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.goBack()}>
                    <ILChevrontL />
                </TouchableOpacity>
                <View style={{ flex: 1 }} >
                    <Text style={{ fontSize: 16, fontFamily: 'DMSans-Regular', textAlign: 'center' }} >Your Interest Category</Text>
                </View>
                <View style={{ width: 50 }} />
            </View>
            <View style={{ flex: 1, paddingVertical: 50, justifyContent: 'space-between' }} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.container, { marginTop: 21 }]}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }} >
                        {categories.map((category, i) => (
                            <TouchableOpacity
                                key={i}
                                onPress={() => onPress(category)}
                                style={{
                                    height: 75, marginTop: 25, backgroundColor: interests.includes(category) ? '#ff9901' : '#ffff', borderRadius: 10, borderWidth: 1, borderColor: '#c4c4c4', width: 150
                                }}
                            >
                                <View style={{ position: 'absolute', top: 11, right: 15, width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: interests.includes(category) ? '#ffff' : '#ff9901' }} />
                                <Text style={{ flex: 1, fontFamily: 'DMSans-Bold', textAlign: 'center', textAlignVertical: 'center', color: interests.includes(category) ? '#ffff' : 'black' }} >{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]} >
                    <TouchableOpacity
                        onPress={set}
                        style={{
                            backgroundColor: '#ff9901', width: 200, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Set</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default InterestCategory;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
})
