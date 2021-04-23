import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Animated, Dimensions, Image } from 'react-native';
import { ILChevrontL, ILBPJS, ILLoanY, ILEpaySlip, ILDownload } from '../../assets';


const Loan = ({ navigation }) => {
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
                    <Text style={{ fontSize: 16 }} >Loan</Text>
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
                                    <ILBPJS />
                                </View>
                                <Text style={styles.title} >BPJS</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        >
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ height: 15 }}>
                                    <ILLoanY />
                                </View>
                                <Text style={[styles.title, { color: '#ff9901' }]} >Loan</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ padding: 40 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={{ fontWeight: '700' }} >Info Pinjaman</Text>
                        <View style={{ flex: 1, marginLeft: 20, height: 10, borderRadius: 10, backgroundColor: '#eeee' }} />
                    </View>
                    <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }} >
                        <Text>Saat ini belum ada pinjaman yang berjalan</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} >
                        <Text style={{ fontWeight: '700' }} >Plafon Tersedia</Text>
                        <View style={{ flex: 1, marginLeft: 20, height: 10, borderRadius: 10, backgroundColor: '#eeee' }} />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }} >
                        <Text style={{ fontSize: 30, color: '#088E6B' }} >Rp . 5.000.000</Text>
                    </View>
                    <View style={{ marginTop: 20 }} >
                        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} >
                            <Text style={{ flex: 2 }} >Jumlah pengajuan</Text>
                            <Text style={{ flex: 1 }} >Rp. 4500.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} >
                            <Text style={{ flex: 2 }} >Biaya 10%</Text>
                            <Text style={{ flex: 1 }} >Rp. 450.000</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }} >
                            <Text style={{ flex: 2 }} >Nominal diterima</Text>
                            <Text style={{ flex: 1, color: '#ff9901' }} >Rp. 4050.000</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontWeight: '700' }} >Jangka Waktu</Text>
                            <View style={{ flex: 1, marginLeft: 20, height: 10, borderRadius: 10, backgroundColor: '#eeee' }} />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between' }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <TouchableOpacity
                                    style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: '#eeee' }}
                                >
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 10 }} >1 Bulan</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <TouchableOpacity
                                    style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: '#eeee' }}
                                >
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 10 }} >3 Bulan</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <TouchableOpacity
                                    style={{ width: 15, height: 15, borderRadius: 15 / 2, backgroundColor: '#eeee' }}
                                >
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 10 }} >6 Bulan</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }} >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={{ fontWeight: '700' }} >Ketentuan</Text>
                            <View style={{ flex: 1, marginLeft: 20, height: 10, borderRadius: 10, backgroundColor: '#eeee' }} />
                        </View>
                        <View style={{ marginTop: 30 }} >
                            <Text style={{ textAlign: 'center' }} >Dengan ini anda setuju.</Text>
                            <Text style={{ textAlign: 'center' }} >Pengembalian pinjaman akan mulai dipotong dari gaji di bulan berjalan pengajuan.</Text>
                        </View>
                    </View>
                    <View style={{ padding: 20, marginTop: 10 }} >
                        <TouchableOpacity
                            style={{ height: 60, backgroundColor: '#eeee', borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Text style={{ fontWeight: '700' }} >Ajukan pinjaman</Text>
                        </TouchableOpacity>
                    </View>
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

export default Loan;
