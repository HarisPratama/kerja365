import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse, ILFileText, ILMoreVErtical } from '../../../assets';
import { fetchTransactions } from '../../../store/reducer/transactionReducer';

const VipePoint = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const points = useSelector(({ points }) => points.Points)
    const transactions = useSelector(({ transactions }) => transactions.Transactions)

    useEffect(() => {
        if (token) {
            dispatch(fetchTransactions(token))
        }
    }, [token])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <View style={{ backgroundColor: '#ffff', marginTop: 20, paddingHorizontal: 20, paddingBottom: 60 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text>Vibe Point</Text>
                    </View>
                    <View />
                </View>
            </View>
            <ScrollView style={{ backgroundColor: 'rgba(238,238,238,0.3)' }} >
                <View style={{ alignItems: 'center', backgroundColor: '#ffff', paddingBottom: 45 }} >
                    <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 30 }} >{Object.keys(points).length > 0 ? points.points : '0'}</Text>
                    <View style={{ height: 8, width: 70, backgroundColor: '#FF9901', borderRadius: 10, marginTop: 11 }} />
                </View>
                <View>
                    <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 33, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TopUp')} style={{
                                flexDirection: 'row', justifyContent: 'space-between', height: 76, flex: 1, borderRadius: 10, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center'
                            }} >
                            <View>
                                <ILFileText />
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={{ maxWidth: 63, marginLeft: 10, textAlign: 'center', fontFamily: 'DMSans-Bold' }} >Top Up</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 8 }} />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TransferPoint')}
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between', height: 76, flex: 1, borderRadius: 10, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <View>
                                <ILFileText />
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={{ maxWidth: 63, marginLeft: 10, textAlign: 'center', fontFamily: 'DMSans-Bold' }} >Transfer Point</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 8 }} />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Withdraw')}
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between', height: 76, flex: 1, borderRadius: 10, backgroundColor: '#ffff', justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <View>
                                <ILFileText />
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={{ maxWidth: 75, marginLeft: 10, textAlign: 'center', fontFamily: 'DMSans-Bold' }} >Withdraw</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 20, flex: 1 }} >
                        <Text style={{ fontFamily: 'DMSans-Bold' }} >Transaction</Text>
                        <View style={{ height: 6 }} />
                        {transactions && transactions.map(transaction => (
                            <View
                                key={transaction._id}
                                style={{
                                    flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#ffff', marginTop: 15, justifyContent: 'space-between', borderRadius: 10
                                }}
                            >
                                <View>
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#088E6B' }} >{transaction.createdAt}</Text>
                                    <Text style={{ fontFamily: 'DMSans-Regular', marginTop: 7, fontSize: 14, maxWidth: 290 }} >{transaction.title}</Text>
                                </View>
                                <ILEllipse />
                                <View>
                                    <ILMoreVErtical />
                                </View>
                            </View>

                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default VipePoint;
