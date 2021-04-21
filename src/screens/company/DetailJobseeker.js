import React, { useState, useEffect, useRef } from 'react';
import { Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Animated, Image, } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { useDispatch, useSelector } from 'react-redux';
import database from '@react-native-firebase/database';
import { ILBookmarkWhite, ILChevrontL } from '../../assets';
import Avatar from '../../assets/img/avatar.png';
import { Loading } from '../../components';
import { fetchBookmarkJobseekerById } from '../../store/reducer/jobseekerBookmarks';
import { fetchGetCv, fetchJobseeker } from '../../store/reducer/userReducer';
import instance from '../../config/axios';
import { fetchVibePoints } from '../../store/reducer/vibePointReducer';

const Desc = ({ jobseeker }) => (
    <View style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', padding: 20 }} >
        <View>
            <Text style={{ fontFamily: 'DMSans-Bold' }} >About Jobseekers</Text>
            <Text style={{ marginTop: 13, fontFamily: 'DMSans-Regular', color: '#6b6969', fontSize: 13 }} >{jobseeker?.user_about}</Text>
        </View>
        <View style={{ marginTop: 20 }} >
            <Text style={{ fontFamily: 'DMSans-Bold' }} >Skills</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }} >
                {jobseeker?.skills?.map(skill => (
                    <View key={skill._id} style={{ padding: 7, marginTop: 10, borderRadius: 5, borderColor: '#FF9901', borderWidth: 1, marginRight: 5 }} >
                        <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12, color: '#FF9901' }} >{skill.title}</Text>
                    </View>
                ))}
            </View>
        </View>
    </View>
)

const DetailJobseeker = ({ navigation, route }) => {
    const { id, isApplicant } = route.params
    const dispatch = useDispatch()

    const initialLayout = { width: Dimensions.get('window').width };
    const [loading, setLoading] = useState(false)
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'desc', title: 'Description' },
        { key: 'info', title: 'Personal Info' }
    ])
    const [alert, setAlert] = useState(false)
    const opacity = useRef(new Animated.Value(0)).current

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const points = useSelector(({ points }) => points.Points)
    const jobseeker = useSelector(({ user }) => user.Jobseeker)
    const bookmarkJobseeker = useSelector(({ jobseekerBookmarks }) => jobseekerBookmarks.BookmarkJobseeker)
    const getCvJobseeker = useSelector(({ user }) => user.GetCv)

    useEffect(() => {
        if (token) {
            dispatch(fetchJobseeker(id, token))
            dispatch(fetchGetCv(token, jobseeker._id))
            dispatch(fetchBookmarkJobseekerById(token, jobseeker._id))
        }
    }, [dispatch, token, id, isApplicant])

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'desc':
                return <Desc jobseeker={jobseeker} />
            case 'info':
                return <Text>Personal Info</Text>
            default:
                return null
        }
    }

    const renderTabBar = props => {
        return (
            <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: '#ffff' }} >
                <TabBar {...props}
                    style={{
                        elevation: 0, paddingBottom: 31, backgroundColor: '#ffff'
                    }}
                    inactiveColor='black'
                    activeColor='black'
                    renderLabel={({ route }) => (
                        <Text style={{ color: 'black', fontFamily: 'DMSans-Bold' }} >{route.title}</Text>
                    )}
                    labelStyle={{
                        fontSize: 14, fontWeight: '700'
                    }}
                    indicatorStyle={{
                        backgroundColor: '#FF9901', height: 8, borderRadius: 10, marginBottom: 20
                    }}
                />
            </View>
        )
    }

    const bookmark = async () => {
        setLoading(true)
        try {
            if (bookmarkJobseeker) {
                await instance.delete(`/bookmark-jobseeker/${bookmarkJobseeker._id}`, {
                    headers: {
                        access_token: token
                    }
                })
            } else {
                const data = {
                    userId: jobseeker._id,
                    companyId: user._id
                }
                await instance.post('/bookmark-jobseeker', data, {
                    headers: {
                        access_token: token
                    }
                })
            }
            dispatch(fetchBookmarkJobseekerById(token, jobseeker._id))
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }
    }

    const fadeIn = () => {
        setAlert(true)
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
    }

    const fadeOut = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
        setTimeout(() => {
            setAlert(false)
        }, 300)
    }

    const getCv = async () => {
        setLoading(true)
        try {
            if (points.points < 3000) {
                throw { message: 'Your points are not sufficient, please top up immediately' }
            }
            const vibePoint = {
                userId: user._id,
                points: points.points - 3000
            }
            await instance.put(`/vibe-point/${points._id}`, vibePoint, {
                headers: {
                    access_token: token
                }
            })

            const getCv = {
                userId: jobseeker._id,
                companyId: user._id,
                fcmToken: jobseeker.fcmToken
            }

            await instance.post('/get-cv', getCv, {
                headers: {
                    access_token: token
                }
            })

            fadeOut()
            setLoading(false)
            dispatch(fetchVibePoints(token))
            dispatch(fetchGetCv(token, jobseeker._id))
        } catch (error) {
            showMessage({
                type: 'danger',
                message: 'Oops, something wrong',
                description: error.message
            })
            console.log(error.message);
            setLoading(false)
        }
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }} >
                <FlashMessage position='top' />
                <View
                    style={{
                        flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20, paddingBottom: 40
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 50 }}
                    >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Detail Jobseeker</Text>
                    </View>
                    <View style={{ width: 50 }} />
                </View>
                <ScrollView style={{ flex: 1 }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <View style={{ width: 80, height: 80, borderRadius: 80 / 2, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#eeee' }} >
                            <Image
                                source={jobseeker.photo ? { uri: jobseeker.photo } : Avatar} style={{ width: 75, height: 75, borderRadius: 75 / 2 }}
                            />
                        </View>
                        <View style={{ marginTop: 30 }} >
                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 18, textAlign: 'center' }} >{jobseeker.user_name}</Text>
                            <View style={{ borderWidth: 1, borderColor: '#088e6b', marginTop: 31, borderRadius: 5, padding: 7 }} >
                                <Text style={{ fontFamily: 'DMSans-Regular', color: '#088e6b', textAlignVertical: 'center', fontSize: 12, textAlign: 'center' }} >{jobseeker?.type === 'freelancer' ? 'Freelancer' : 'Fulltimer'}</Text>
                            </View>
                        </View>
                    </View>
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={renderTabBar}
                    />
                </ScrollView>
                <View style={{ padding: 20 }} >
                    {jobseeker && jobseeker?.type?.toLowerCase() === 'fulltimer' && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            {!bookmarkJobseeker ? (
                                <TouchableOpacity
                                    onPress={bookmark}
                                    style={{
                                        height: 52, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#0093ba'
                                    }}
                                >
                                    <ILBookmarkWhite />
                                    <View style={{ width: 10 }} />
                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Bookmark</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={bookmark}
                                    style={{
                                        height: 52, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#eeee'
                                    }}
                                >
                                    <ILBookmarkWhite />
                                    <View style={{ width: 10 }} />
                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Bookmark</Text>
                                </TouchableOpacity>
                            )}
                            <View style={{ width: 17 }} />
                            {Object.keys(getCvJobseeker).length < 1 ? (
                                <TouchableOpacity
                                    onPress={jobseeker?.type?.toLowerCase() === 'freelancer' ? () => navigation.navigate('Chat', { id: id }) : fadeIn}
                                    style={{
                                        height: 52, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#FF9901'
                                    }}
                                >
                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >{jobseeker?.type?.toLowerCase() === 'freelancer' ? 'Hire' : 'Get CV'}</Text>
                                </TouchableOpacity>
                            ) : (
                                <View
                                    style={{
                                        height: 52, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#eeee'
                                    }}
                                >
                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Get CV</Text>
                                </View>
                            )}
                        </View>
                    )}

                    {jobseeker && jobseeker.type === 'freelancer' && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Chat', { id: id })}
                                style={{
                                    height: 52, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#FF9901'
                                }}
                            >
                                <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Hire</Text>
                            </TouchableOpacity>
                            <View style={{ width: 30 }} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Chat', { id: id })}
                                style={{
                                    height: 52, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#2ecc71'
                                }}
                            >
                                <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Chat</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </SafeAreaView>
            {loading && <Loading />}
            {alert && (
                <Animated.View
                    style={{ flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', opacity: opacity }}
                >
                    <View style={{ padding: 40, backgroundColor: '#ffff', alignItems: 'center', justifyContent: 'center', borderRadius: 11 }} >
                        <Text>Are you sure ?</Text>
                        <Text>3000 Points to get this CV</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }} >
                            <TouchableOpacity
                                onPress={getCv}
                                style={{
                                    height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: 70, backgroundColor: 'green'
                                }}
                            >
                                <Text style={{ color: '#ffff' }} >Yes</Text>
                            </TouchableOpacity>
                            <View style={{ width: 20 }} />
                            <TouchableOpacity
                                onPress={fadeOut}
                                style={{
                                    height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 5, width: 70, backgroundColor: 'red'
                                }}
                            >
                                <Text style={{ color: '#ffff' }} >No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            )}
        </>
    )
};

export default DetailJobseeker;
