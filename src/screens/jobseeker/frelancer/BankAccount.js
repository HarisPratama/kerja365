import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILFileText, ILStarWhite, ILTrash } from '../../../assets';
import { fetchBankAccount } from '../../../store/reducer/bankAccountReducer';

const BankAccount = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const bankAccount = useSelector(({ bankAccounts }) => bankAccounts.BankAccount)

    useEffect(() => {
        if (token) {
            dispatch(fetchBankAccount(token, route.params.id))
        }
        console.log(bankAccount, "<<< bankAccount");
    }, [token])

    const onPress = () => {
        alert('Success Submit')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <View style={{ backgroundColor: '#ffff', marginTop: 20, paddingHorizontal: 20, paddingBottom: 60 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text>Bank Account</Text>
                    </View>
                    <View />
                </View>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)' }} >
                <View style={{ justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 38 }} >
                    <View style={{ backgroundColor: '#ffff', padding: 20, borderRadius: 10 }} >
                        <Text>Bank account</Text>
                        {Object.keys(bankAccount).length > 0 && (
                            <View style={{ marginTop: 13, backgroundColor: '#FF9901', height: 168, borderRadius: 10 }} >
                                <View style={{ padding: 20 }} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                        <Text style={{ fontFamily: 'DMSans-Bold', color: 'white' }} >{bankAccount.bankName}</Text>
                                        <ILStarWhite />
                                    </View>
                                    <View style={{ marginTop: 30 }} >
                                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff', fontSize: 20 }} >{bankAccount.accountNumber}</Text>
                                    </View>
                                    <View style={{ marginTop: 30, alignSelf: 'flex-end' }} >
                                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Sdri. Poetri Lazuardi</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text>Default</Text>
                            <TouchableOpacity>
                                <ILTrash />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 24 }} >
                        <Text style={{ marginLeft: 20, fontFamily: 'DMSans-Bold' }} >Details bank account</Text>
                        <TouchableOpacity style={{ marginTop: 22, padding: 20, backgroundColor: '#ffff', flexDirection: 'row', borderRadius: 10, alignItems: 'center' }} >
                            <ILFileText />
                            <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 15 }} >Account number</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 22, padding: 20, backgroundColor: '#ffff', flexDirection: 'row', borderRadius: 10, alignItems: 'center' }} >
                            <ILFileText />
                            <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 15 }} >Account holder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 22, padding: 20, backgroundColor: '#ffff', flexDirection: 'row', borderRadius: 10, alignItems: 'center' }} >
                            <ILFileText />
                            <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 15 }} >Bank name</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 69, alignItems: 'center', paddingBottom: 50 }} >
                        <TouchableOpacity
                            onPress={onPress}
                            style={{ backgroundColor: '#FF9901', justifyContent: 'center', alignItems: 'center', width: 200, height: 50, borderRadius: 25 }}
                        >
                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default BankAccount;
