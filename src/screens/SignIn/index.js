import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Dimensions } from 'react-native'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import useForm from '../../helpers/useForm'
import { ILChevrontLW, ILEye, ILHeadPhone2, ILLock, ILMail, ILPhone } from '../../assets'
import instance from '../../config/axios'

const Button = ({ title, type, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn(type)}>
            <Text style={styles.btnTitle(type)} >{title}</Text>
        </TouchableOpacity>
    )
}

const SignIn = ({ navigation }) => {

    const [form, setForm] = useForm({
        email: '',
        password: '',
        phoneNumber: ''
    })

    const [boolean, setBoolean] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)


    const onPress = async () => {
        setLoading(true)
        try {
            const phoneNumber = `+62${form.phoneNumber}`
            const userLogin = {
                email: form.email,
                password: form.password,
                phoneNumber: phoneNumber
            }

            const { data } = await instance.post('/user/login', userLogin)

            if (data) {
                setLoading(false)
                navigation.push('ConfirmCode', { token: data, email: userLogin.email, phoneNumber: phoneNumber })
            } else throw { message: 'Error' }

        } catch (error) {
            console.log(`Error: ${error.message}`)
            showMessage({
                description: 'Opps something error',
                type: 'danger',
                message: error.message
            })
            setErrorMessage(true)
            setLoading(false)
            setTimeout(() => {
                setErrorMessage(false)
            }, 3000);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <FlashMessage position='top' />
                <View style={{ flexDirection: 'row', marginTop: 36, justifyContent: 'space-between' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <ILChevrontLW />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 16, color: '#ffff' }} >Login</Text>
                    </View>
                    <View style={{ width: 25 }} />
                </View>
                <View style={{ alignItems: 'center' }} >
                    <ILHeadPhone2 />
                </View>
                {errorMessage && (
                    <View style={{ marginTop: 10, marginBottom: 10, borderRadius: 11, backgroundColor: 'red', padding: 10 }} >
                        <Text style={{ color: '#ffff', textAlign: 'center' }} >Oops something wrong</Text>
                    </View>
                )}
                <View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#ffff' }} >
                            <ILMail />
                        </View>
                        <TextInput
                            placeholder='Email / Code'
                            placeholderTextColor='#c4c4c4'
                            style={styles.textInput}
                            value={form.email}
                            onChangeText={value => setForm('email', value)}
                            autoCompleteType='email'
                        />
                    </View>
                    <View style={styles.space}></View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ height: 60, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#ffff' }} >
                            <ILPhone />
                            <Text style={{ marginLeft: 20, color: 'rgba(0,0,0,0.3)' }} >+62</Text>
                        </View>
                        <TextInput
                            placeholder='| Phone Number'
                            placeholderTextColor='#c4c4c4'
                            style={styles.textInput}
                            value={form.phoneNumber}
                            onChangeText={value => setForm('phoneNumber', value)}
                            keyboardType='phone-pad'
                        />
                    </View>
                    <View style={styles.space}></View>
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: '#ffff' }} >
                            <ILLock />
                        </View>
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor='#c4c4c4'
                            style={{
                                flex: 1,
                                height: 60,
                                borderColor: 'white',
                                borderWidth: 1,
                                backgroundColor: 'white',
                                marginLeft: -1,
                                color: 'black'
                            }}
                            value={form.password}
                            onChangeText={value => setForm('password', value)}
                            autoCompleteType='password'
                            secureTextEntry={boolean}
                        />
                        <View style={{ height: 60, width: 60, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#ffff' }} >
                            <TouchableOpacity onPress={boolean ? () => setBoolean(false) : () => setBoolean(true)} >
                                <ILEye />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.space}></View>
                    <View>
                        <Button title='Login' onPress={onPress} />
                        <TouchableOpacity style={{ marginTop: 48 }} onPress={() => navigation.navigate('SignUpOptions')} >
                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff', textAlign: 'center' }} >Not a member ? Register Here</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 19 }} onPress={() => navigation.navigate('SignUpOptions')} >
                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff', textAlign: 'center' }} >Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View />
            </View>
            {loading && (
                <View style={{ flex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size='large' color='white' />
                    <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold', letterSpacing: 10, marginTop: 30 }} >Loading...</Text>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        justifyContent: 'space-between',
        backgroundColor: '#FF9901'
    },
    space: {
        height: 14
    },
    title: {
        fontSize: 20
    },
    textInput: {
        flex: 1,
        height: 60,
        borderColor: 'white',
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'white',
        marginLeft: -1,
        color: 'black'
    },
    btn: (type) => ({
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10
    }),
    btnTitle: (type) => ({
        fontFamily: 'DMSans-Bold',
        color: '#FFFF'
    })
})

export default SignIn;
