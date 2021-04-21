import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ILCheck, ILChevrontL, ILFileText } from '../../../assets';
import CollapsibleView from '@eliav2/react-native-collapsible-view';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const TopUp = ({ navigation }) => {

    const [amount, setAmount] = useState(null)
    const [selected, setSelected] = useState('')

    const next = () => {
        if (!amount || selected === '') {
            showMessage({
                message: 'Complete your form',
                type: 'danger'
            })
        } else {
            navigation.navigate('Payment', { amount: amount, bank: selected })
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <FlashMessage position='top' />
            <View style={{ backgroundColor: '#ffff', marginTop: 20, paddingHorizontal: 20, paddingBottom: 60 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text>Vibe Point Top Up</Text>
                    </View>
                    <View />
                </View>
            </View>
            <ScrollView style={{ backgroundColor: 'rgba(238,238,238,0.3)' }} >
                <View style={{ marginTop: 17, paddingHorizontal: 20 }} >
                    <View style={{ paddingHorizontal: 10 }} >
                        <View style={{ marginBottom: 10, backgroundColor: '#ffff', borderRadius: 11 }} >
                            <View style={{ padding: 10 }}>
                                <Text style={{ fontFamily: 'DMSans-Bold' }} >Top up amount</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                <View style={{ height: 58, width: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffff', borderBottomLeftRadius: 10, borderTopLeftRadius: 10, }} >
                                    <ILFileText />
                                </View>
                                <TextInput
                                    placeholder='Amount'
                                    placeholderTextColor='#c4c4c4'
                                    keyboardType='number-pad'
                                    style={{ height: 58, width: 200, borderBottomRightRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 20, alignSelf: 'flex-end', color: 'black' }}
                                    value={amount}
                                    onChangeText={value => setAmount(value)}
                                />
                            </View>
                        </View>
                    </View>
                    <CollapsibleView
                        title={
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                <ILFileText />
                                <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 14, flex: 1, marginLeft: 14 }} >Transfer Bank</Text>
                            </View>
                        }
                        isRTL
                        style={{ borderWidth: 0, padding: 20, backgroundColor: '#FFFF', borderRadius: 10 }}
                    >
                        <View style={{ marginTop: 50 }} >
                            <TouchableOpacity
                                onPress={() => setSelected('BNI')}
                                style={{ paddingBottom: 40, marginLeft: 40 }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14 }} >Bank BNI ( Dicek Otomatis )</Text>
                                    <View style={{ flex: 1, height: 20, marginLeft: 20 }} >
                                        {selected === 'BNI' && (
                                            <ILCheck />
                                        )}
                                    </View>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#eeee', marginTop: 14 }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setSelected('Mandiri')}
                                style={{ paddingBottom: 40, marginLeft: 40 }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14 }} >Bank Mandiri ( Dicek Otomatis )</Text>
                                    <View style={{ flex: 1, height: 20, marginLeft: 20 }} >
                                        {selected === 'Mandiri' && (
                                            <ILCheck />
                                        )}
                                    </View>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#eeee', marginTop: 14 }} />
                            </TouchableOpacity>
                            <View />
                            <TouchableOpacity
                                onPress={() => setSelected('BCA')}
                                style={{ paddingBottom: 40, marginLeft: 40 }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 14 }} >Bank BCA ( Dicek Otomatis )</Text>
                                    <View style={{ flex: 1, height: 20, marginLeft: 20 }} >
                                        {selected === 'BCA' && (
                                            <ILCheck />
                                        )}
                                    </View>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#eeee', marginTop: 14 }} />
                            </TouchableOpacity>
                        </View>
                    </CollapsibleView>
                    <CollapsibleView
                        title={
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                                <ILFileText />
                                <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 14, flex: 1, marginLeft: 14 }} >Alfamart</Text>
                            </View>
                        }
                        isRTL
                        style={{ borderWidth: 0, padding: 20, backgroundColor: '#FFFF', borderRadius: 10 }}
                    >
                    </CollapsibleView>
                </View>
                <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }} >
                    <TouchableOpacity
                        onPress={next}
                        style={{ width: 200, height: 50, backgroundColor: '#FF9901', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 14, color: '#ffff' }} >Confirm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    button: {
        borderWidth: 0
    }
})

export default TopUp;
