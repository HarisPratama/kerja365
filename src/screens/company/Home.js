import React, { useEffect, useState } from 'react';
import { Text, Dimensions, View, SafeAreaView, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, TabBar } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { getData } from '../../utils/localStorage';
import { ILBPO, ILJobPosting, ILLargeStar, ILMPO, ILPayingAgent, ILSFO, ILSliders } from '../../assets';
import { Freelance, Fulltime, GroupButton, UserSection, VibePointsButton, JobNews } from '../../components';
import { fetchVibePoints } from '../../store/reducer/vibePointReducer';
import axios from 'axios';
import { setNews } from '../../store/action';

const filters = ['IT', 'Marketing', 'Sales', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'Admin', 'Technisian']

const Home = ({ navigation }) => {
    const dispatch = useDispatch()
    const initialLayout = { width: Dimensions.get('window').width }

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const points = useSelector(({ points }) => points.Points)

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'fulltime', title: 'Fulltimer' },
        { key: 'freelance', title: 'Freelancer' }
    ])
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const dataUser = await getData('user');
            dispatch({ type: 'SET_USER', payload: dataUser })
            const token = await getData('token')
            dispatch({ type: 'SET_TOKEN', payload: token })

            const { data } = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://topcareer.id/feed/')
            dispatch(setNews(data.items))
        })()
        if (user) {
            setLoading(false)
        }
        if (token) {
            dispatch(fetchVibePoints(token))
        }
    }, [token])

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
            <SafeAreaView style={{ flex: 1, paddingVertical: 10, backgroundColor: '#ffff' }} >

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: 'rgba(238,238,238, 0.3)' }}
                >
                    {loading ? (
                        <SkeletonPlaceholder>
                            <View
                                style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}
                            >
                                <View style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                                <View style={{ width: 300, marginLeft: 10, borderRadius: 10, height: 30 }} />
                            </View>
                        </SkeletonPlaceholder>
                    ) : (
                        <UserSection
                            user={user}
                        />
                    )}

                    <View style={{ padding: 20, backgroundColor: '#ffff' }} >
                        {loading ? (
                            <SkeletonPlaceholder>
                                <View style={{ height: 70, borderRadius: 100 }} />
                            </SkeletonPlaceholder>
                        ) : (
                            <GroupButton
                                navigation={navigation}
                                user={user}
                            />
                        )}
                    </View>

                    <View style={{ padding: 20 }} >
                        {loading ? (
                            <SkeletonPlaceholder>
                                <View style={{ height: 70, borderRadius: 5 }} />
                            </SkeletonPlaceholder>
                        ) : (
                            <VibePointsButton
                                navigation={navigation}
                                points={points}
                                token={token}
                            />
                        )}
                    </View>

                    <View style={{ paddingHorizontal: 20, marginTop: 20 }} >
                        {loading ? (
                            <SkeletonPlaceholder>
                                <View style={{ height: 10, width: 150, borderRadius: 5 }} />
                            </SkeletonPlaceholder>
                        ) : (
                            <Text style={{ fontFamily: 'DMSans-Bold' }} >Services</Text>
                        )}
                    </View>

                    {loading ? (
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                                <View style={{ height: 70, width: 180 }} />
                                <View style={{ height: 70, width: 180 }} />
                            </View>
                        </SkeletonPlaceholder>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ServicesDetail', { Icon: ILMPO, title: 'Man Power Outsource', type: 'mpo' })}
                                style={{
                                    flexDirection: 'row', flex: 1, justifyContent: 'space-between', backgroundColor: '#ffff', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11
                                }}
                            >
                                <ILMPO />
                                <Text style={{ fontFamily: 'DMSans-Bold', flex: 1, marginLeft: 5, textAlign: 'center' }} >Man Power Outsource</Text>
                            </TouchableOpacity>
                            <View style={{ width: 9 }} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ServicesDetail', { Icon: ILBPO, title: 'Business Process Outsource', type: 'bpo' })}
                                style={{
                                    flexDirection: 'row', flex: 1, justifyContent: 'space-between', backgroundColor: '#ffff', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11
                                }}
                            >
                                <ILBPO />
                                <Text style={{ flex: 1, fontFamily: 'DMSans-Bold', marginLeft: 5, textAlign: 'center' }} >Business Process Outsource</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {loading ? (
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                                <View style={{ height: 70, width: 180 }} />
                                <View style={{ height: 70, width: 180 }} />
                            </View>
                        </SkeletonPlaceholder>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ServicesDetail', { Icon: ILPayingAgent, title: 'Paying Agent', type: 'pa' })}
                                style={{
                                    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffff', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11, flex: 1
                                }}
                            >
                                <ILPayingAgent />
                                <Text style={{ fontFamily: 'DMSans-Bold', flex: 1, textAlign: 'center', marginLeft: 5 }} >Paying Agent</Text>
                            </TouchableOpacity>
                            <View style={{ width: 9 }} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ServicesDetail', { Icon: ILSFO, title: 'System & Facility Outsource', type: 'sfo' })}
                                style={{
                                    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffff', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11, flex: 1
                                }}
                            >
                                <ILSFO />
                                <Text style={{ fontFamily: 'DMSans-Bold', flex: 1, marginLeft: 5, textAlign: 'center' }} >System & Facility Outsource</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {loading ? (
                        <SkeletonPlaceholder>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                                <View style={{ height: 70, width: 180 }} />
                                <View style={{ height: 70, width: 180 }} />
                            </View>
                        </SkeletonPlaceholder>
                    ) : (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20 }} >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('JobPosting')}
                                style={{
                                    flexDirection: 'row', backgroundColor: '#ffff', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center', borderRadius: 11, flex: 1,
                                }}
                            >
                                <ILJobPosting />
                                <Text style={{ fontFamily: 'DMSans-Bold', flex: 1, textAlign: 'center', marginLeft: 10 }} >Job Posting</Text>
                            </TouchableOpacity>
                            <View style={{ width: 9 }} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ListProject')}
                                style={{
                                    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#ffff', paddingVertical: 10, paddingHorizontal: 5, flex: 1, alignItems: 'center', borderRadius: 11
                                }}
                            >
                                <ILLargeStar />
                                <Text style={{ fontFamily: 'DMSans-Bold', flex: 1, marginLeft: 5, textAlign: 'center' }} >Your Project</Text>
                            </TouchableOpacity>
                        </View>
                    )}


                    <View style={{ marginTop: 40, paddingHorizontal: 20 }} >
                        {loading ? (
                            <SkeletonPlaceholder>
                                <View style={{ height: 10, width: 50 }} />
                                <View style={{ height: 10, marginTop: 10, width: 200 }} />
                                <View style={{ height: 10, marginTop: 10 }} />
                            </SkeletonPlaceholder>
                        ) : (
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={initialLayout}
                                renderTabBar={renderTabBar}
                            />
                        )}
                    </View>

                    <View style={{ marginTop: 20 }} >
                        {loading ? (
                            <View style={{ paddingHorizontal: 20 }} >
                                <SkeletonPlaceholder>
                                    <View style={{ height: 10, width: 50 }} />
                                    <View style={{ height: 10, marginTop: 10, width: 200 }} />
                                    <View style={{ height: 10, marginTop: 10 }} />
                                </SkeletonPlaceholder>
                            </View>
                        ) : (
                            <JobNews
                                navigation={navigation}
                            />
                        )
                        }
                    </View>

                </ScrollView>
            </SafeAreaView>
            {modal && (
                <View style={{ flex: 1, position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ backgroundColor: '#ffff', borderRadius: 11, width: Dimensions.get('screen').width - 100, height: 300 }} >
                        <ScrollView style={{ padding: 20 }} >
                            {filters.map((el, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={{ marginTop: 10 }}
                                >
                                    <Text>{el}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
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

export default Home;
