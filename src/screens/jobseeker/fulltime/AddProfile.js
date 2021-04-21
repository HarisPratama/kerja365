import React, { useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILChevrontR } from '../../../assets';
import AvatarImage from '../../../assets/img/avatar.png';
import { fetchUser } from '../../../store/reducer/userReducer';
import { FormProfileUser } from '../../../components';
import { launchImageLibrary } from 'react-native-image-picker';
import FlashMessage from 'react-native-flash-message';

const AddProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const [image, setImage] = useState(null)
    const [photo, setPhoto] = useState('')

    const pickImage = () => {
        launchImageLibrary(
            { quality: 0.3, maxWidth: 100, maxHeight: 100, includeBase64: true },
            response => {
                if (response.didCancel || response.errorMessage) {
                    console.log('Opps, something wrong')
                } else {
                    setImage(response.uri)
                    setPhoto(`data:${response.type};base64, ${response.base64}`)
                }
            }
        )
    }

    useEffect(() => {
        dispatch(fetchUser(user._id, token))
    }, [token])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <FlashMessage position='top' />
            <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16 }} >Add profile</Text>
                </View>
                <View></View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 70
                    }}
                >
                    <View >
                        {image ?
                            <Image
                                source={{ uri: image }}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                            />
                            :
                            <Image
                                source={user.photo ? { uri: user.photo } : AvatarImage}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                            />
                        }
                    </View>
                    <View style={{ flex: 1, marginLeft: 30 }} >
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14 }} >Profile picture</Text>
                    </View>
                    <View>
                        <ILChevrontR />
                    </View>
                </TouchableOpacity>
                <FormProfileUser
                    user={user}
                    token={token}
                    photo={photo}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
});

export default AddProfile;
