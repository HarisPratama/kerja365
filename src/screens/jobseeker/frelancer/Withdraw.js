import React, { useState, useRef, useEffect } from 'react';
import { ActivityIndicator, Animated, ScrollView, Text, View, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILFileText, ILPlus, ILStarWhite } from '../../../assets';
import instance from '../../../config/axios';
import { fetchBankAccounts } from '../../../store/reducer/bankAccountReducer';
import { Loading } from '../../../components'

const Withdraw = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const bankAccounts = useSelector(({ bankAccounts }) => bankAccounts.BankAccounts)

    const [validate, setValidate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [zIndex, setZIndex] = useState(0)
    const [accountNumber, setAccountNumber] = useState('')
    const [bankName, setBankName] = useState('')

    const translateY = useRef(new Animated.Value(Dimensions.get('screen').height)).current
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (token) {
            dispatch(fetchBankAccounts(token))
        }
    }, [token])

    const onPress = () => {
        setLoading(true)
        if (validate) {
            setLoading(false)
            alert('Success Withdraw')
        } else {
            setTimeout(() => {
                setLoading(false)
                setValidate(true)
            }, 4000)
        }
    }

    const slideIn = () => {
        setZIndex(2)
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start()
    }

    const slideOut = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: Dimensions.get('screen').height,
                duration: 400,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            })
        ]).start()
        setTimeout(() => {
            setZIndex(0)
        }, 500)
    }

    const submit = async () => {
        setLoading(true)
        try {
            const data = {
                bankName: bankName,
                accountNumber: accountNumber
            }
            await instance.post('/bank-account', data, {
                headers: {
                    access_token: token
                }
            })
            dispatch(fetchBankAccounts(token))
            setAccountNumber('')
            setBankName('')
            slideOut()
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, zIndex: 1, backgroundColor: '#ffff' }} >
                <View style={{ backgroundColor: '#ffff', marginTop: 20, paddingHorizontal: 20, paddingBottom: 60 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <ILChevrontL />
                        </TouchableOpacity>
                        <View>
                            <Text>Withdraw</Text>
                        </View>
                        <View />
                    </View>
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)' }} >
                    <View style={{ justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 38 }} >
                        <View>
                            <View style={{ backgroundColor: '#ffff', height: 256, padding: 20, borderRadius: 10 }} >
                                <Text>Bank account</Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {bankAccounts && bankAccounts.map(item => (
                                        <TouchableOpacity
                                            key={item._id}
                                            onPress={() => navigation.navigate('BankAccount', { id: item._id })}
                                            style={{
                                                marginTop: 13, marginLeft: 16, backgroundColor: '#FF9901', height: 168, borderRadius: 10, paddingHorizontal: 10, width: 270
                                            }}
                                        >
                                            <View style={{ padding: 20 }} >
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                                    <Text style={{ fontFamily: 'DMSans-Bold', color: 'white' }} >{item.bankName}</Text>
                                                    <ILStarWhite />
                                                </View>
                                                <View style={{ marginTop: 30 }} >
                                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff', fontSize: 20 }} >{item.accountNumber}</Text>
                                                </View>
                                                <View style={{ marginTop: 30, alignSelf: 'flex-end' }} >
                                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Sdri. Poetri Lazuardi</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={slideIn}
                                    style={{ width: 50, height: 50, backgroundColor: '#FF9901', borderRadius: 50 / 2, position: 'absolute', top: -25, right: 20, justifyContent: 'center', alignItems: 'center' }} >
                                    <ILPlus />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View style={{ marginTop: 60, backgroundColor: '#ffff', borderRadius: 10 }} >
                                    <View style={{ padding: 20 }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <ILFileText />
                                            <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 10 }} >Withdraw amount</Text>
                                        </View>
                                        <View style={{ marginTop: 18 }} >
                                            <TextInput
                                                placeholder='Amount'
                                                placeholderTextColor='#c4c4c4'
                                                keyboardType='number-pad'
                                                style={{ width: 300, borderBottomRightRadius: 10, borderTopRightRadius: 10, color: 'black', paddingHorizontal: 20, alignSelf: 'flex-end' }}
                                                textAlign='right'
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {loading && (
                                <ActivityIndicator
                                    color='#FF9901'
                                    size='large'
                                    style={{ marginTop: 20 }}
                                />
                            )}

                            {validate && (
                                <View style={{ backgroundColor: '#ffff', padding: 20, marginTop: 10 }} >
                                    <View>
                                        <Text style={{ fontFamily: 'DMSans-Bold' }} >Account Information</Text>
                                        <View style={{ height: 1, backgroundColor: '#eeee', marginTop: 13 }} />
                                    </View>
                                    <View style={{ marginTop: 16 }} >
                                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#6B6969' }} >Account number</Text>
                                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#FF9901', fontSize: 16, marginTop: 10 }} >8085 1236 9125 1402</Text>
                                    </View>
                                    <View style={{ marginTop: 16 }} >
                                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#6B6969' }} >Account holder</Text>
                                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#FF9901', fontSize: 16, marginTop: 10 }} >Sdri Poetri Lazuardi</Text>
                                    </View>
                                    <View style={{ marginTop: 16 }} >
                                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#6B6969' }} >Bank name</Text>
                                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#FF9901', fontSize: 16, marginTop: 10 }} >BNI</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={{ marginTop: 69, alignItems: 'center', paddingBottom: 50 }} >
                            <TouchableOpacity
                                onPress={onPress}
                                style={{ backgroundColor: '#FF9901', justifyContent: 'center', alignItems: 'center', width: 200, height: 50, borderRadius: 25 }}
                            >
                                <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >{!validate ? 'Validate' : 'Withdraw'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Animated.View
                style={{ flex: 1, position: 'absolute', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: zIndex }}
            >
                <TouchableOpacity
                    onPress={slideOut}
                    style={{ flex: 1 }}
                />
                <Animated.View
                    style={{ flex: 3, alignItems: 'center', backgroundColor: '#ffff', borderTopLeftRadius: 50, borderTopRightRadius: 50, transform: [{ translateY: translateY }] }}
                >
                    <View style={{ padding: 20, marginTop: 30, alignItems: 'center' }} >
                        <Text style={{ textAlign: 'center' }} >Add Bank Account</Text>
                        <View style={{ marginTop: 30 }} >
                            <TextInput
                                placeholder='BANK NAME'
                                placeholderTextColor='#c4c4c4'
                                style={{ borderWidth: 1, borderColor: '#c4c4c4', padding: 10, width: 250, borderRadius: 11, color: 'black' }}
                                onChangeText={val => setBankName(val)}
                                value={bankName}
                            />
                        </View>
                        <View style={{ marginTop: 30 }} >
                            <TextInput
                                placeholder='Account Number'
                                placeholderTextColor='#c4c4c4'
                                style={{ borderWidth: 1, borderColor: '#c4c4c4', padding: 10, width: 250, borderRadius: 11, color: 'black' }}
                                keyboardType='number-pad'
                                onChangeText={val => setAccountNumber(val)}
                                value={accountNumber}
                            />
                        </View>
                        <View style={{ marginTop: 30 }} >
                            <TouchableOpacity
                                onPress={submit}
                                style={{ width: 140, height: 50, backgroundColor: '#ff9901', borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: '#ffff', fontWeight: '700' }} >Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
            {loading && <Loading />}
        </>
    )
};

export default Withdraw;
