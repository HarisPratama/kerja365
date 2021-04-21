import React from 'react';
import { SafeAreaView, ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { ILChevrontL, ILDownload } from '../../assets'

const EpayslipDetails = ({ navigation, route }) => {
    const { date } = route.params

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#ffff' }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 50, paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ width: 50 }}
                >
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16 }} >{date}</Text>
                </View>
                <View style={{ width: 50 }} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{ paddingHorizontal: 20 }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={{ fontWeight: '700' }} >Rutin</Text>
                        <View style={{ flex: 1, marginLeft: 50, borderRadius: 10, height: 10, backgroundColor: '#eeee' }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={{ fontWeight: '700' }} >Tidak Rutin</Text>
                        <View style={{ flex: 1, marginLeft: 50, borderRadius: 10, height: 10, backgroundColor: '#eeee' }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={{ fontWeight: '700' }} >Potongan</Text>
                        <View style={{ flex: 1, marginLeft: 50, borderRadius: 10, height: 10, backgroundColor: '#eeee' }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <Text style={{ fontWeight: '700' }} >Total</Text>
                        <View style={{ flex: 1, marginLeft: 50, borderRadius: 10, height: 10, backgroundColor: '#eeee' }} />
                    </View>


                    <TouchableOpacity
                        style={{ height: 83, backgroundColor: '#eeee', borderRadius: 50, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ILDownload />
                        <Text style={{ fontWeight: '700' }} >Download file</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default EpayslipDetails;
