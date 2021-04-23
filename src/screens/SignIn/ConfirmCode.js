import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { setData } from '../../utils/localStorage';
import messaging from '@react-native-firebase/messaging';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByEmail } from '../../store/reducer/userReducer';
import instance from '../../config/axios';
import { Loading } from '../../components'

const CELL_COUNT = 6;

const ConfirmCode = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { phoneNumber, token, email, } = route.params;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const user = useSelector(({ user }) => user.User)
    const [confirm, setConfirm] = useState(null)
    const [fcmToken, setFcmToken] = useState('')
    const [loading, setLoading] = useState(false)

    const verifyPhoneNumber = async () => {
        if (confirm === null) {
            setLoading(true)
            const getConfirm = await auth().verifyPhoneNumber(phoneNumber)
            setConfirm(getConfirm)
        } else setLoading(false)
        const getFcmToken = await messaging().getToken()
        setFcmToken(getFcmToken)
    }

    useEffect(() => {
        verifyPhoneNumber()
        dispatch(fetchUserByEmail(email))
    }, [dispatch, confirm])

    const onPress = async () => {
        try {
            const credential = auth.PhoneAuthProvider.credential(
                confirm.verificationId,
                value
            )
            await auth().signInWithCredential(credential)
            await instance.patch(`/user/fcm-token/${user._id}`, { fcmToken }, {
                headers: {
                    access_token: token
                }
            })

            setData('user', user)
            setData('token', token)
            if (user.type.toLowerCase() === 'company') {
                navigation.replace('CompanyApp')
            } else if (user.type === 'fulltimer' || user.type === 'freelancer') {
                navigation.replace('MainApp', { screen: 'Home' })
            } else if (user.type === 'internal') {
                navigation.replace('InternalApp', { screen: 'Home' })
            }
        } catch (error) {
            showMessage({
                message: error.message,
                type: 'danger'
            })
            console.log(error.message);
        }
    }

    const resend = async () => {
        setConfirm(null)
        const authWPhone = await auth().verifyPhoneNumber(phoneNumber)
        setConfirm(authWPhone)
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 57, backgroundColor: '#ffff' }} >
                <FlashMessage position='top' />
                <View>
                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 30, textAlign: 'center' }} >Auth</Text>
                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 20, color: '#6B6969', textAlign: 'center' }} >Please insert your code</Text>
                </View>

                <View>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        autoFocus
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>

                <TouchableOpacity onPress={resend} >
                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 20, color: '#6B6969' }} >Resend code</Text>
                </TouchableOpacity>


                {confirm !== null && (
                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            paddingVertical: 20, width: 200, backgroundColor: '#ff9901', borderRadius: 25
                        }}
                    >
                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff', textAlign: 'center' }} >Submit</Text>
                    </TouchableOpacity>
                )}
            </View>
            {loading && <Loading />}
        </>
    )
};

export default ConfirmCode;

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#ffff',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#ff9901',
    },
});
