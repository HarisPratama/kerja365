import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ILChevrontL, ILEllipse2, ILMoreVErtical } from '../../../assets';

import Logo from '../../../assets/img/logo.png';

const Projects = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <View style={{ paddingHorizontal: 20, paddingBottom: 60, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }} >
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text>Projects</Text>
                </View>
                <View></View>
            </View>
            <ScrollView style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)' }} >
                <View style={{ paddingHorizontal: 20, marginTop: 17 }} >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProjectDetail', { id: 'id' })}
                        style={{
                            borderRadius: 10, marginTop: 8, backgroundColor: '#ffff', padding: 20
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                            <View style={{ justifyContent: 'center' }} >
                                <Image source={Logo} style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />
                            </View>
                            <View style={{ justifyContent: 'center', marginLeft: 23, flex: 1 }}>
                                <Text style={{ fontSize: 14, fontFamily: 'DMSans-Bold', maxWidth: 225 }} >Pembuatab Website Perusahaan</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: 150 }} >
                                    <Text
                                        style={{
                                            fontSize: 12, color: '#6B6969', fontFamily: 'DMSans-Bold', paddingRight: 5
                                        }}
                                    >
                                        Skills.id
                                    </Text>
                                    <ILEllipse2 />
                                    <View style={{ width: 5 }} />
                                    <Text
                                        style={{
                                            fontSize: 12, color: '#6B6969', fontFamily: 'DMSans-Bold', paddingRight: 5
                                        }}
                                    >Freelance</Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <ILMoreVErtical />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 11, borderWidth: 1, borderColor: '#088E6B', padding: 5, borderRadius: 5, alignSelf: 'flex-end' }} >
                            <Text style={{ fontFamily: 'DMSans-Regular', color: '#088E6B', fontSize: 12 }} >on progress</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Projects;
