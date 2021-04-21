import React, { useState, useEffect, useRef } from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { ILChevrontL, ILChevrontR, ILSetting } from '../../assets';
import Avatar from '../../assets/img/avatar.png';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/reducer/userReducer';
import { FormProfileUser, SettingModal } from '../../components';
import { launchImageLibrary } from 'react-native-image-picker';

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [photo, setPhoto] = useState('')
    const [opacity, setOpacity] = useState(false)

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)

    const translateX = useRef(new Animated.Value(Dimensions.get('window').width)).current

    useEffect(() => {
        if (token) {
            dispatch(fetchUser(user._id, token))
        }
    }, [token])

    const pickImage = () => {
        launchImageLibrary(
            { quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true },
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

    const onPress = () => {
        setOpacity(true)
        Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20, paddingBottom: 40 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 16 }} >Profile</Text>
                    </View>
                    <TouchableOpacity
                        onPress={onPress}
                    >
                        <ILSetting />
                    </TouchableOpacity>
                </View>
                <View
                    style={{ flex: 1, paddingBottom: 20, paddingHorizontal: 20, flexDirection: 'column', justifyContent: 'space-between' }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 20, flex: 1 }}
                    >
                        <TouchableOpacity
                            onPress={pickImage}
                            style={{
                                paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                            }}
                        >
                            <View style={{ justifyContent: 'center' }}>
                                {image ?
                                    <Image
                                        source={{ uri: image }}
                                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                    />
                                    :
                                    <Image
                                        source={user.photo ? { uri: user.photo } : Avatar}
                                        style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                                    />
                                }
                            </View>
                            <View style={{ maxWidth: 270, marginLeft: 10, flex: 1 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'DMSans-Bold' }} >{user.user_name}</Text>
                                <Text style={{ fontSize: 12, fontFamily: 'DMSans-Regular' }} >{user.user_email}</Text>
                            </View>
                            <ILChevrontR />
                        </TouchableOpacity>
                        <FormProfileUser
                            user={user}
                            token={token}
                            photo={photo}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
            {opacity && <SettingModal navigation={navigation} translateX={translateX} setOpacity={setOpacity} />}
        </>
    )
};

export default Profile;
