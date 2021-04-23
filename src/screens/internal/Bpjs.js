import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Animated, Dimensions, Image } from 'react-native';
import { ILChevrontL, ILBPJSY, ILLoan, ILEpaySlip, ILDownload } from '../../assets';
import BpjsCard from '../../assets/bpjs-card.png'

const Bpjs = ({ navigation }) => {
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
                    <Text style={{ fontSize: 16 }} >BPJS</Text>
                </View>
                <View style={{ width: 50 }} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{ paddingHorizontal: 20 }} >
                    <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', borderRadius: 100, paddingHorizontal: 45, backgroundColor: 'rgba(238, 238, 238, 0.3)' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Epayslip')}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ height: 15 }}>
                                    <ILEpaySlip />
                                </View>
                                <Text style={styles.title} >Epayslip</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        >
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ height: 15 }}>
                                    <ILBPJSY />
                                </View>
                                <Text style={[styles.title, { color: '#ff9901' }]} >BPJS</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Loan')}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ height: 15 }}>
                                    <ILLoan />
                                </View>
                                <Text style={styles.title} >Loan</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ padding: 40 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text>Pribadi</Text>
                        <View style={{ flex: 1, marginLeft: 20, height: 10, borderRadius: 10, backgroundColor: '#eeee' }} />
                    </View>
                    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }} >
                        <Image source={BpjsCard} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text>Keluarga</Text>
                        <View style={{ flex: 1, marginLeft: 20, height: 10, borderRadius: 10, backgroundColor: '#eeee' }} />
                    </View>
                    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }} >
                        <Image source={BpjsCard} />
                    </View>
                    <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }} >
                        <Image source={BpjsCard} />
                    </View>
                </View>
                <View style={{ padding: 20 }} >
                    <TouchableOpacity
                        style={{ height: 83, backgroundColor: '#eeee', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ILDownload />
                        <Text style={{ fontWeight: '700' }} >Download file</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontFamily: 'DMSans-Bold',
        marginTop: 15,
        color: 'black'
    }
})

export default Bpjs;
