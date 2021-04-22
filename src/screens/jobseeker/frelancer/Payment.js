import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ILChevrontL, ILChevrontR } from '../../../assets';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import instance from '../../../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../components';
import { fetchVibePoints } from '../../../store/reducer/vibePointReducer';
import { fetchTransactions } from '../../../store/reducer/transactionReducer';
import { DropDown } from '../../../components/mikro'

const Payment = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const { amount, bank } = route.params

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const points = useSelector(({ points }) => points.Points)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (token) {
            dispatch(fetchVibePoints(token))
        }
    }, [token])

    const topup = async () => {
        setLoading(true)
        try {
            const vibePoint = {
                userId: user._id,
                points: points.points + Number(amount)
            }
            await instance.put(`/vibe-point/${points._id}`, vibePoint, {
                headers: {
                    access_token: token
                }
            })
            const transaction = {
                userId: user._id,
                title: `Transaksi top up senilai ${amount} point berhasil`,
                createdAt: new Date()
            }
            await instance.post('/transaction', transaction, {
                headers: {
                    access_token: token
                }
            })
            setLoading(false)
            dispatch(fetchVibePoints(token))
            dispatch(fetchTransactions(token))
            if (user.type === 'company') {
                navigation.navigate('CompanyApp', { screen: 'Home' })
            } else {
                navigation.navigate('MainApp', { screen: 'Home' })
            }

        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }

    const insert = async () => {
        setLoading(true)
        try {
            const vibePoint = {
                userId: user._id,
                points: Number(amount)
            }
            await instance.post('/vibe-point', vibePoint, {
                headers: {
                    access_token: token
                }
            })
            const transaction = {
                userId: user._id,
                title: `Transaksi Top Up senilai ${amount} point berhasil`,
                createdAt: new Date()
            }
            await instance.post('/transaction', transaction, {
                headers: {
                    access_token: token
                }
            })
            setLoading(false)
            dispatch(fetchVibePoints(token))
            dispatch(fetchTransactions(token))
            if (user.type === 'company') {
                navigation.navigate('CompanyApp', { screen: 'Home' })
            } else {
                navigation.navigate('MainApp', { screen: 'Home' })
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
                <View style={{ backgroundColor: '#ffff', marginTop: 20, paddingHorizontal: 20, paddingBottom: 60 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <ILChevrontL />
                        </TouchableOpacity>
                        <View>
                            <Text>Payment</Text>
                        </View>
                        <View />
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: 'rgba(238,238,238,0.3)' }} >
                    <View style={{ marginTop: 17, paddingHorizontal: 20 }} >
                        <View style={{ padding: 20, backgroundColor: '#ffff', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14 }} >Top up amount :</Text>
                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 20 }} >{amount}</Text>
                        </View>
                        <View style={{ padding: 20, marginTop: 12, backgroundColor: '#ffff', borderRadius: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14, flex: 1, marginLeft: 14 }} >Admin cost</Text>
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14 }} >Rp.0</Text>
                        </View>
                        <View style={{ padding: 20, backgroundColor: '#ffff', marginTop: 12, borderRadius: 10 }} >
                            <View>
                                <Text>Bank {bank} ( Dicek otomatis )</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#eeee', marginTop: 14 }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 }} >
                                <View>
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#6B6969' }} >No. Rekening</Text>
                                    <Text style={{ fontFamily: 'DMSans-Bold', marginTop: 10, fontSize: 16, color: '#FF9901' }} >8807 0085 6999 0150</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'DMSans-Regular', color: '#088e6b' }} >Salin</Text>
                                </View>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#eeee', marginTop: 14 }} />
                            <View style={{ marginTop: 16 }} >
                                <View>
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#088e6b' }} >Dicek dalam 10 menit setelah pembayaran berhasil</Text>
                                </View>
                                <View style={{ marginTop: 20 }} >
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >Bayar pesanan ke Virtual Account diatas sebelum membuar pesanan kembali dengan  Virtual Account agar nomor tetap sama.Hanya menerima dari Bank Mandiri Dapar dikenan biaya transfer antar bank dan limitasi transfer jika Anda transfer dari bank selain {bank}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }} >
                        <DropDown
                            title="Petunjuk Transfer ATM"
                            icon={false}
                        >
                        </DropDown>
                        <DropDown
                            title="Petunjuk Transfer iBanking"
                            icon={false}
                        >
                        </DropDown>
                        <DropDown
                            title="Petunjuk Transfer mBanking"
                            icon={false}
                        >
                        </DropDown>
                        <DropDown
                            title="Petunjuk Transfer SMS Banking"
                            icon={false}
                        >
                        </DropDown>  
                    </View>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 70, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={points.points === 0 ? insert : topup}
                            style={{ width: 200, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C4C4C4' }}
                        >
                            <Text style={{ color: '#ffff', fontFamily: 'DMSans-Regular' }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {loading && <Loading />}
        </>
    )
}

export default Payment;
