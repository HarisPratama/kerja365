import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ILBell, ILBPJS, ILEpaySlip, ILLoan, ILUserApplicant, ILBookmarkY, ILJobPosting, ILStarY, ILSliders } from '../../assets'
import Avatar from '../../assets/img/avatar.png'
import { VibePointsButton, Fulltime, Freelance, JobNews } from '../../components'
import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

const HomeInternal = ({ navigation }) => {
    const initialLayout = { width: Dimensions.get('window').width }
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'fulltime', title: 'Fulltimer' },
        { key: 'freelance', title: 'Freelancer' }
    ])
    const token = useSelector(({ user }) => user.Token)

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, [])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'fulltime':
                return <Fulltime
                    navigation={navigation}
                    token={token}
                />
            case 'freelance':
                return <Freelance
                    navigation={navigation}
                    token={token}
                />
            default:
                return null
        }
    }

    const renderTabBar = props => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TabBar
                {...props}
                indicatorStyle={{ height: 8, backgroundColor: '#FF9901', borderRadius: 10 }}
                style={{ backgroundColor: 'transparent', width: Dimensions.get('screen').width - 150 }}
                getLabelText={({ route }) => route.title}
                renderLabel={({ route }) => (
                    <Text style={{ color: 'black', fontFamily: 'DMSans-Bold' }} >{route.title}</Text>
                )}
            />
            <TouchableOpacity style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9901', borderRadius: 5 }} >
                <ILSliders />
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <SafeAreaView
                style={{ flex: 1, paddingVertical: 10, backgroundColor: '#ffff' }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ paddingHorizontal: 20 }} >
                        <View>
                            <View style={{ alignSelf: 'flex-end' }} >
                                <ILBell />
                                <View
                                    style={{ position: 'absolute', bottom: -5, left: -10, width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: '#EA2027', justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ color: '#ffff', fontSize: 14 }} >18</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 28, alignSelf: 'flex-end', flexDirection: 'row' }} >
                                <View style={{ marginRight: 17 }} >
                                    <Text style={{ textAlign: 'right', fontSize: 12, fontWeight: '700' }} >Welcome</Text>
                                    <Text style={{ textAlign: 'right', fontSize: 25, fontWeight: '500' }} >Poetri Lazuardi</Text>
                                    <Text style={{ textAlign: 'right', fontSize: 12, fontWeight: '700' }} >Sales Manager</Text>
                                </View>
                                <Image source={Avatar} style={{ width: 60, height: 60, borderRadius: 60 / 2 }} />
                            </View>
                        </View>
                        <View style={{ marginTop: 26, flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-between', borderRadius: 100, paddingHorizontal: 45, backgroundColor: 'rgba(238, 238, 238, 0.3)' }}>
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

                        <View style={{ marginTop: 11 }} >
                            <VibePointsButton
                                navigation={navigation}
                                points={{ points: 100000 }}
                            />
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'rgba(238,238,238,0.3)', paddingBottom: 20 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row', flex: 1, justifyContent: 'space-between', backgroundColor: '#ffff', height: 75, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11
                                }}
                            >
                                <ILUserApplicant />
                                <Text style={{ fontFamily: 'DMSans-Bold', flex: 1, marginLeft: 5, textAlign: 'center' }} >Applicant</Text>
                            </TouchableOpacity>
                            <View style={{ width: 9 }} />
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row', flex: 1, justifyContent: 'space-between', backgroundColor: '#ffff', height: 75, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11
                                }}
                            >
                                <ILBookmarkY />
                                <Text style={{ flex: 1, fontFamily: 'DMSans-Bold', marginLeft: 5, textAlign: 'center' }} >Bookmark</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row', flex: 1, justifyContent: 'space-between', backgroundColor: '#ffff', height: 75, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11
                                }}
                            >
                                <ILJobPosting />
                                <Text style={{ fontFamily: 'DMSans-Bold', flex: 1, marginLeft: 5, textAlign: 'center' }} >Job Posting</Text>
                            </TouchableOpacity>
                            <View style={{ width: 9 }} />
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row', flex: 1, justifyContent: 'space-between', backgroundColor: '#ffff', height: 75, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11
                                }}
                            >
                                <ILStarY />
                                <Text style={{ flex: 1, fontFamily: 'DMSans-Bold', marginLeft: 5, textAlign: 'center' }} >Your Project</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20 }} >
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            renderTabBar={renderTabBar}
                        />
                    </View>
                    <View>
                        <JobNews />
                    </View>
                </ScrollView>
            </SafeAreaView>
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

export default HomeInternal;
