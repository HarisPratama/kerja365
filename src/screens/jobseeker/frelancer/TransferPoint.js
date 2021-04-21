import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { ILChevrontDW, ILChevrontL, ILFileText } from '../../../assets';
import instance from '../../../config/axios';
import { fetchTransactions } from '../../../store/reducer/transactionReducer';
import { fetchUserByPhoneNumber } from '../../../store/reducer/userReducer';
import { fetchVibePoints } from '../../../store/reducer/vibePointReducer';

const TransferPoint = ({ navigation }) => {
    const dispatch = useDispatch()

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const points = useSelector(({ points }) => points.Points)

    const getUser = useSelector(({ user }) => user.GetUser)

    const [validate, setValidate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        dispatch({ type: 'GET_USER', payload: {} })
    }, [token])

    const validateUser = async () => {
        try {
            if (amount < 1) {
                showMessage({
                    message: 'Input amount',
                    type: 'warning'
                })
            } else if (typeof points.points === 'number' && points.points < amount) {
                showMessage({
                    message: 'Your points not enough',
                    type: 'danger'
                })
            } else if (typeof points.points === 'string' && Number(points.points.replace('.', '')) < amount) {
                showMessage({
                    message: 'Your points not enough',
                    type: 'danger'
                })
            } else {
                setLoading(true)
                const getPhoneNumber = `+62${phoneNumber}`
                dispatch(fetchUserByPhoneNumber(getPhoneNumber, token))
                setValidate(true)
                setLoading(false)
            }

        } catch (error) {
            if (error.message === 'Enter the points to be transferred') {
                setMessage('Enter the points to be transferred')
                setLoading(false)
            } else {
                setMessage(`${error.message}`)
            }

            console.log(error.message);
        }
    }

    const submit = async () => {
        setLoading(true)
        try {
            if (amount < 1) {
                showMessage({
                    message: 'Input amount',
                    type: 'warning'
                })
            } else if (points.points < amount) {
                showMessage({
                    message: 'Your points not enough',
                    type: 'danger'
                })
            } else {
                const getAmount = Number(amount)
                const getPhoneNumber = `+62${phoneNumber}`
                // transfer to user
                const data = {
                    userId: getUser._id,
                    points: getAmount
                }
                await instance.put(`/vibe-point/transfer/${getUser._id}`, data, {
                    headers: {
                        access_token: token
                    }
                })

                // update point user
                const vibePoint = {
                    userId: user._id,
                    points: points.points - Number(amount)
                }
                await instance.put(`/vibe-point/${points._id}`, vibePoint, {
                    headers: {
                        access_token: token
                    }
                })

                // input transaction
                const transaction = {
                    userId: user._id,
                    title: `Transaksi transfer point senilai ${amount} ke nomor ${getPhoneNumber} berhasil`,
                    createdAt: new Date()
                }
                await instance.post('/transaction', transaction, {
                    headers: {
                        access_token: token
                    }
                })
                dispatch({ type: 'GET_USER', payload: {} })
                dispatch(fetchVibePoints(token))
                dispatch(fetchTransactions(token))
                setLoading(false)
                navigation.goBack()
            }
        } catch (error) {
            setLoading(false)
            console.log(error.message);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffff' }} >
            <FlashMessage position='top' />
            <View style={{ backgroundColor: '#ffff', marginTop: 20, paddingHorizontal: 20, paddingBottom: 60 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text>Transfer Point</Text>
                    </View>
                    <View />
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)', justifyContent: 'space-between' }} >
                <View style={{ paddingHorizontal: 20, marginTop: 38 }} >
                    <View style={{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#ffff', height: 103, borderRadius: 10 }} >
                        <Text style={{ fontFamily: 'DMSans-Bold' }} >Transfer Amount</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <ILFileText />
                            <TextInput
                                placeholder='Amount'
                                placeholderTextColor='#c4c4c4'
                                keyboardType='number-pad'
                                style={{ height: 58, width: 200, borderBottomRightRadius: 10, borderTopRightRadius: 10, color: 'black', paddingHorizontal: 20, alignSelf: 'flex-end' }}
                                textAlign='right'
                                onChangeText={value => setAmount(value)}
                                value={amount}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                position: 'absolute', zIndex: 1, top: -20, right: 20, backgroundColor: '#FF9901', width: 50, height: 50, borderRadius: 50 / 2, justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <ILChevrontDW />
                        </TouchableOpacity>
                    </View>
                    <View style={{ zIndex: -1, paddingHorizontal: 20, backgroundColor: '#ffff', marginTop: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }} >
                        <ILFileText />
                        <Text style={{ fontFamily: 'DMSans-Bold' }} >+62</Text>
                        <TextInput
                            placeholder='81234567890'
                            placeholderTextColor="#c4c4c4"
                            keyboardType='number-pad'
                            style={{ height: 58, width: 200, borderBottomRightRadius: 10, borderTopRightRadius: 10, color: 'black', paddingHorizontal: 20, alignSelf: 'flex-end' }}
                            onChangeText={value => setPhoneNumber(value)}
                            value={phoneNumber}
                        />
                    </View>

                    {loading && (
                        <ActivityIndicator
                            color='#FF9901'
                            size='large'
                            style={{ marginTop: 20 }}
                        />
                    )}

                    {validate && (
                        <View style={{ paddingHorizontal: 20, backgroundColor: '#ffff', marginTop: 14, borderRadius: 10, paddingVertical: 10 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <ILFileText />
                                <Text style={{ marginLeft: 15, fontFamily: 'DMSans-Regular' }} >Detail reciever</Text>
                            </View>
                            <View style={{ marginTop: 30, paddingBottom: 30 }} >
                                {Object.keys(getUser).length > 0 ? (
                                    <>
                                        <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 20 }} >{getUser.user_name}</Text>
                                        <Text style={{ fontFamily: 'DMSans-Regular' }} >{getUser.user_email}</Text>
                                    </>
                                ) : (
                                    <Text style={{ fontFamily: 'DMSans-Regular' }} >User not found</Text>
                                )}
                            </View>
                        </View>
                    )}
                </View>
                <View style={{ alignItems: 'center', paddingBottom: 50 }} >
                    <TouchableOpacity
                        onPress={Object.keys(getUser).length > 0 ? submit : validateUser}
                        style={{ backgroundColor: '#FF9901', justifyContent: 'center', alignItems: 'center', width: 200, height: 50, borderRadius: 25 }}
                    >
                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >{Object.keys(getUser).length > 0 ? 'Transfer Point' : 'Validate'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

export default TransferPoint;
