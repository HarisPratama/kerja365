import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import useForm from '../../helpers/useForm';
import AvatarImage from '../../assets/img/avatar.png';
import { ILChevrontL, ILChevrontR, ILLockY, ILPhoneY } from '../../assets';
import { ILMail, ILUser2 } from '../../assets/img/icons';
import { Loading } from '../../components/makro'
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../config/axios';
import { launchImageLibrary } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Text style={styles.btnTitle} >{title}</Text>
        </TouchableOpacity>
    )
}


const SignUp = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const { type } = route.params
    const [form, setForm] = useForm({})
    const [gender, setGender] = useState('')
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [photo, setPhoto] = useState('')
    const [matched, setMatched] = useState('Password not matched')
    const [errorMessage, setErrorMessage] = useState(false)

    const message = useSelector(({ user }) => user.Message)

    useEffect(() => {
        if (form.password === form.confirmPassword) {
            setMatched('Password matched')
        } else {
            setMatched('Password not matched')
        }
    }, [gender, form, message])

    const onPress = async () => {
        setLoading(true)

        try {
            let phoneNumber
            if (String(form.phoneNumber)[0] === '0') {
                phoneNumber = `+62${String(form.phoneNumber).substring(1, String(form.phoneNumber).length)}`
            }

            if (String(form.phoneNumber)[0] === '8') {
                phoneNumber = `+62${form.phoneNumber}`
            }

            const registerUser = {
                user_name: form.fullName,
                user_email: form.email,
                user_password: form.password,
                user_phonenumber: phoneNumber,
                gender: gender,
                photo: photo,
                type: type
            }
            await instance.post('/user/register', registerUser)
            await auth().createUserWithEmailAndPassword(registerUser.user_email, registerUser.user_password)
            if (registerUser.type === 'company') {
                navigation.navigate('SignIn')
            } else {
                navigation.navigate('InterestCategory', { user_email: registerUser.user_email })
            }
            setForm('reset')
            setLoading(false)
        } catch (error) {
            console.log(error, "<<< error");
            setErrorMessage(true)
            setTimeout(() => {
                setErrorMessage(false)
            }, 3000)
            setLoading(false)
        }
    }

    const pickImage = () => {
        launchImageLibrary(
            { quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64: true },
            response => {
                if (response.didCancel || response.errorMessage) {
                    setErrorMessage('Opps, something wrong')
                } else {
                    setImage(response.uri)
                    setPhoto(`data:${response.type};base64, ${response.base64}`)
                }
            }
        )
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#ffff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} >
                        <Text style={{ fontSize: 16, fontFamily: 'DMSans-Regular', textAlign: 'center' }} >Register</Text>
                    </View>
                    <View style={{ width: 50 }} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 50 }}
                >
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                        }}
                    >
                        <View >
                            <Image
                                source={image ? { uri: image } : AvatarImage}
                                style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 30 }} >
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14 }} >{type === 'company' ? 'Company Logo' : 'Profile picture'}</Text>
                        </View>
                        <View>
                            <ILChevrontR />
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 10, marginTop: 26, borderRadius: 10, backgroundColor: '#eeee' }} />

                    <View style={styles.space}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 20 }} >Personal Information</Text>
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14, marginLeft: 9, color: '#ff9901' }} >Require</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 33, justifyContent: 'space-between', alignItems: 'center' }} >
                        <ILUser2 />
                        <TextInput
                            style={styles.textInput}
                            value={form.fullName}
                            onChangeText={value => setForm('fullName', value)}
                            placeholder={type === 'company' ? 'Company Name' : 'Fullname'}
                            placeholderTextColor={'#c4c4c4'}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 33, justifyContent: 'space-between', alignItems: 'center' }} >
                        <ILMail />
                        <TextInput
                            style={styles.textInput}
                            value={form.email}
                            onChangeText={value => setForm('email', value)}
                            placeholder='Email'
                            placeholderTextColor={'#c4c4c4'}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 33, justifyContent: 'space-between', alignItems: 'center' }} >
                        <ILPhoneY />
                        <View style={{ height: 57, width: 50, borderColor: '#eeee', borderLeftWidth: 1, borderBottomWidth: 1, borderTopWidth: 1, borderTopLeftRadius: 11, borderBottomLeftRadius: 11, backgroundColor: 'white', marginLeft: 12, alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={{ textAlign: 'center', textAlignVertical: 'center' }} >+62</Text>
                        </View>
                        <TextInput
                            style={{ height: 57, flex: 1, borderColor: '#eeee', borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, borderTopRightRadius: 11, borderBottomRightRadius: 11, backgroundColor: 'white', color: 'black' }}
                            value={form.phoneNumber}
                            onChangeText={value => setForm('phoneNumber', value)}
                            placeholder='81234567890'
                            keyboardType='phone-pad'
                            dataDetectorTypes='phoneNumber'
                            placeholderTextColor={'#c4c4c4'}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 33, paddingHorizontal: 40 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <TouchableOpacity
                                onPress={() => setGender('male')}
                                setForm
                                style={{
                                    width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: gender === 'male' ? '#ff9901' : '#c4c4c4'
                                }}
                            />
                            <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 14 }} >Male</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 50 }} >
                            <TouchableOpacity
                                onPress={() => setGender('female')}
                                style={{
                                    width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: gender === 'female' ? '#ff9901' : '#c4c4c4'
                                }}
                            />
                            <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 14 }} >Female</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 55, alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 20 }} >Security</Text>
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14, marginLeft: 9, color: '#ff9901' }} >Require</Text>
                    </View>

                    <View style={{ marginTop: 20 }} >
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: matched === 'Password not matched' ? '#e84118' : '#44bd32' }} >{form.confirmPassword?.length > 0 ? matched : ' '}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 33, justifyContent: 'space-between', alignItems: 'center' }} >
                        <ILLockY />
                        <TextInput
                            style={styles.textInput}
                            value={form.password}
                            onChangeText={value => setForm('password', value)}
                            placeholder='Password'
                            secureTextEntry
                            placeholderTextColor={'#c4c4c4'}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 33, justifyContent: 'space-between', alignItems: 'center' }} >
                        <ILLockY />
                        <TextInput
                            style={styles.textInput}
                            value={form.confirmPassword}
                            onChangeText={value => setForm('confirmPassword', value)}
                            placeholder='Confirm Password'
                            secureTextEntry
                            placeholderTextColor={'#c4c4c4'}
                        />
                    </View>

                    {errorMessage && (
                        <View style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 11 }} >
                            <Text style={{ color: '#ffff' }} >Profile picture to large or error validation</Text>
                        </View>
                    )}

                    <View style={{ paddingBottom: 50, alignItems: 'center', marginTop: 78 }} >
                        <Button title='SIGN UP' onPress={onPress} />
                    </View>
                </ScrollView>
            </SafeAreaView>
            {loading && <Loading />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },
    space: {
        height: 25
    },
    title: {
        fontSize: 20
    },
    textInput: {
        flex: 1,
        height: 57,
        borderColor: '#eeee',
        borderWidth: 1,
        borderRadius: 11,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginLeft: 12,
        color: 'black'
    },
    btn: {
        backgroundColor: '#ff9901',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 50,
        width: 200,
        borderRadius: 25
    },
    btnTitle: {
        fontFamily: 'DMSans-Bold',
        color: '#ffff'
    }
})
export default SignUp;
