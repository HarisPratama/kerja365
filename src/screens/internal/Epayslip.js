import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { ILChevrontL, ILBPJS, ILLoan, ILEpaySlipA, ILMoreVErtical } from '../../assets';
import { ILCalender } from '../../assets/img/icons';

const Epayslip = ({ navigation }) => {

    const years = [{ name: 'JAN' }, { name: 'FEB' }, { name: 'MAR' }, { name: 'APR' }, { name: 'MEI' }, { name: 'JUN' }, { name: 'JUL' }, { name: 'AGU' }, { name: 'SEP' }, { name: 'OKT' }, { name: 'NOV' }, { name: 'DES' }]

    const translateY = useRef(new Animated.Value(Dimensions.get('screen').height)).current
    const [opacity, setOpacity] = useState(false)
    const [year, setYear] = useState([])

    const currentYear = new Date().getFullYear()

    const getYear = () => {
        const arr = []
        for (let i = currentYear - 3; i <= currentYear; i++) {
            arr.push(i)
        }
        setYear(arr)
    }

    useEffect(() => {
        getYear()
    }, [])

    const slideIn = () => {
        setOpacity(true)
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }

    const slideOut = () => {
        Animated.timing(translateY, {
            toValue: Dimensions.get('screen').height,
            duration: 300,
            useNativeDriver: true
        }).start()
        setTimeout(() => {
            setOpacity(false)
        }, 350)
    }

    return (
        <>
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
                        <Text style={{ fontSize: 16 }} >Epayslip</Text>
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
                                        <ILEpaySlipA />
                                    </View>
                                    <Text style={[styles.title, { color: '#ff9901' }]} >Epayslip</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Bpjs')}
                            >
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ height: 15 }}>
                                        <ILBPJS />
                                    </View>
                                    <Text style={styles.title} >BPJS</Text>
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
                    <View style={{ flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)', marginTop: 31 }} >
                        <View style={{ padding: 20 }} >
                            <TouchableOpacity
                                onPress={slideIn}
                                style={{ backgroundColor: '#ffff', flexDirection: 'row', height: 55, justifyContent: 'space-between', alignItems: 'center', borderRadius: 50, paddingHorizontal: 20 }}
                            >
                                <ILCalender />
                                <Text style={{ flex: 1, marginLeft: 15, fontWeight: '700', color: 'black' }} >select payroll year</Text>
                                <ILMoreVErtical />
                            </TouchableOpacity>
                            <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }} >
                                {years.map((el, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => navigation.navigate('EpayslipDetails', { date: '25-01-2021' })}
                                        style={{ marginTop: 20, backgroundColor: '#ffff', height: 100, borderRadius: 10, width: 170, padding: 20 }}
                                    >
                                        <Text>{el.name}</Text>
                                        <Text>25-01-2021</Text>
                                        <View style={{ marginTop: 15, height: 10, backgroundColor: '#088E6B', borderRadius: 10 }} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
            {opacity && (
                <View style={{ flex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }} >
                    <TouchableOpacity
                        onPress={slideOut}
                        style={{ flex: 1 }}
                    />
                    <Animated.View
                        style={{ flex: 1, backgroundColor: '#ffff', transform: [{ translateY: translateY }] }}
                    >
                        <View style={{ marginTop: 10 }} >
                            {year.map(el => (
                                <TouchableOpacity
                                    key={el}
                                    style={{ width: Dimensions.get('screen').width, alignItems: 'center', height: 30, justifyContent: 'center', marginTop: 20 }}
                                >
                                    <Text>{el}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>
                </View>
            )}
        </>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        fontFamily: 'DMSans-Bold',
        marginTop: 15
    }
})

export default Epayslip;
