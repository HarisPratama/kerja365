import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Image, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { ILChevrontL, ILMoreVErtical, ILBookmark2, ILThumbsUp, ILTrashW } from '../../../assets';
import { JobDescriptions, Projects } from '../../../components';
import { TabView, TabBar } from 'react-native-tab-view';
import Avatar from '../../../assets/img/avatar.png';
import { fetchApplication } from '../../../store/reducer/jobAppliedReducer';
import { fetchJob } from '../../../store/reducer/jobsReducer';
import instance from '../../../config/axios';
import { fetchBookmark } from '../../../store/reducer/jobBookmarkReducer';
import { ILMapPin } from '../../../assets/img/icons';

const Applicant = ({ jobId, navigation, applicants, user }) => (
    <View style={{ flex: 1, padding: 20 }} >
        {user.type.toLowerCase() === 'company' && applicants && applicants.map(applicant => (
            <TouchableOpacity
                onPress={() => navigation.navigate('DetailJobseeker', { id: applicant._id, jobId: jobId, isApplicant: true })}
                key={applicant._id}
                style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#ffff', borderRadius: 10, alignItems: 'center', padding: 20
                }}
            >
                <View>
                    <Image source={applicant.photo ? { uri: applicant.photo } : Avatar} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                </View>
                <View style={{ flex: 1, marginLeft: 11 }} >
                    <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >{applicant.user_name}</Text>
                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >{applicant.user_email}</Text>
                </View>
                <View>
                    <ILMoreVErtical />
                </View>
            </TouchableOpacity>
        )
        )}
        {user.type === 'freelancer' && applicants && applicants.map(applicant => (
            <View
                key={applicant._id}
                style={{
                    flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, backgroundColor: '#ffff', borderRadius: 10, alignItems: 'center', padding: 20
                }}
            >
                <View>
                    <Image source={applicant.photo ? { uri: applicant.photo } : Avatar} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                </View>
                <View style={{ flex: 1, marginLeft: 11 }} >
                    <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >{applicant.user_name}</Text>
                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >{applicant.user_email}</Text>
                </View>
                <View>
                    <ILMoreVErtical />
                </View>
            </View>
        )
        )}
    </View>
);

const Company = ({ job }) => (
    <View style={{ padding: 20 }} >
        <View>
            <Text style={{ color: 'black', fontWeight: '400', fontSize: 24 }} >{job?.company?.user_name}</Text>
            <View style={{ height: 5, backgroundColor: '#c4c4c4', width: 200, borderRadius: 5 }} />
            <Text style={{ marginTop: 20, color: 'black', textAlign: 'justify' }} >{job?.company?.user_about}</Text>
            <View style={{ marginTop: 25 }} >
                <ILMapPin />
                <Text style={{ flex: 1, marginTop: 11, color: 'black', textAlign: 'justify' }} >{job?.company?.user_address}</Text>
            </View>
        </View>

    </View>
)

const Button = ({ title }) => {
    return (
        <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 7, borderWidth: 1, borderColor: '#C4C4C4', borderRadius: 5 }} >
            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >{title}</Text>
        </TouchableOpacity>
    )
}

const initialLayout = { width: Dimensions.get('window').width };

const JobDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { jobId, type } = route.params
    const [index, setIndex] = useState(0)
    const [routes, setRoutes] = useState([])
    const [hasSendApp, setHasSendApp] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [animated, setAnimated] = useState(false)
    const opacity = useRef(new Animated.Value(0)).current

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const job = useSelector(({ jobs }) => jobs.Job)
    const application = useSelector(({ applications }) => applications.Application)
    const bookmark = useSelector(({ bookmarks }) => bookmarks.Bookmark)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.type === 'company' && type === 'Fulltime') {
            setRoutes([
                { key: 'first', title: 'Descriptions' },
                { key: 'second', title: 'Applicant' }
            ])
        }
        if (user.type === 'company' && type === 'Freelance') {
            setRoutes([
                { key: 'first', title: 'Descriptions' },
                { key: 'second', title: 'Applicant' },
                { key: 'fourth', title: 'Projects' }
            ])
        }
        if (user.type === 'freelancer') {
            setRoutes([
                { key: 'first', title: 'Descriptions' },
                { key: 'second', title: 'Applicant' },
                { key: 'third', title: 'Company' }
            ])
        }

        if (user.type === 'fulltimer') {
            setRoutes([
                { key: 'first', title: 'Descriptions' },
                { key: 'third', title: 'Company' }
            ])
        }


        if (token) {
            dispatch(fetchApplication(token, jobId))
            dispatch(fetchBookmark(token, jobId))
            dispatch(fetchJob(jobId, token))
        }
    }, [loading, dispatch, token])

    const fadeIn = () => {
        setAnimated(true)
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
            setAnimated(false)
        }, 300)
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <JobDescriptions
                    job={job}
                    user={user}
                    navigation={navigation}
                />
            case 'second':
                return <Applicant
                    jobId={jobId}
                    applicants={job.applicants}
                    navigation={navigation}
                    user={user}
                />
            case 'third':
                return <Company
                    job={job}
                />
            case 'fourth':
                return <Projects
                    job={job}
                    fadeIn={fadeIn}
                    navigation={navigation}
                />
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

    const toggleModal = async (message) => {
        setLoading(true)
        try {
            const data = {
                jobId: job._id,
                companyId: job.companyId,
            }
            if (message.toLowerCase() === 'apply') {
                await instance.post('/application', data, {
                    headers: {
                        access_token: token
                    }
                })
                setHasSendApp(true)
            } else {
                await instance.post('/bookmark', data, {
                    headers: {
                        access_token: token
                    }
                })
            }
            setTimeout(() => {
                setLoading(false)
                setModalVisible(!isModalVisible)
                setMessage(message);
            }, 3000)
        } catch (error) {
            console.log(error.message)
            setLoading(false)
        }
    }

    if (isModalVisible === true) {
        setTimeout(() => {
            setModalVisible(false)
        }, 3000)
    }

    const deleteJobs = async () => {
        alert('Are you sure?')
    }

    const RenderButton = () => {
        if (user.type === 'company') {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <TouchableOpacity
                        onPress={deleteJobs}
                        style={{
                            paddingVertical: 20, borderRadius: 11, width: 70, backgroundColor: 'rgba(231, 76, 60,0.9)', justifyContent: 'center', alignItems: 'center'
                        }}
                    >
                        <ILTrashW />
                    </TouchableOpacity>
                    <View style={{ width: 10 }} />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PostJob', { type: job.type, paramJob: JSON.stringify(job), edit: true })}
                        style={{
                            flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20, backgroundColor: '#ff9901', borderRadius: 11
                        }
                        }>
                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Edit</Text>
                    </TouchableOpacity>
                    <View style={{ width: 10 }} />
                </View>
            )
        }

        if (application || hasSendApp) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 52, backgroundColor: 'rgba(46, 204, 113,1.0)', borderRadius: 11 }}>
                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >You have applied for this job</Text>
                </View>
            )
        } else return (
            <View>
                <TouchableOpacity
                    onPress={() => toggleModal('Apply')}
                    style={{ backgroundColor: '#ff9901', height: 52, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff', textAlign: 'center' }} >Apply</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const startProject = async () => {
        for (let i = 0; i < job.projectTarget.length; i++) {
            const target = {
                desc: job.projectTarget[i].desc,
                date: job.projectTarget[i].date.date
            }
        }
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start()
        setTimeout(() => {
            setAnimated(false)
        }, 300)
    }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, marginTop: 20 }]}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 50 }}
                    >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Job Detail</Text>
                    </View>
                    <View style={{ width: 50 }} />
                </View>
                {Object.keys(job).length > 0 && (
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false} style={{ flex: 1, backgroundColor: 'rgba(238,238,238, 0.3)' }} >
                        <View style={{ alignItems: 'center', backgroundColor: '#ffff', paddingVertical: 20 }}>
                            <Image source={{ uri: job?.company?.photo }} style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 1, borderColor: '#eeee' }} />
                            <Text style={styles.h3} >{job.title}</Text>
                            <Text style={{ marginTop: 10, fontFamily: 'DMSans-Regular', fontSize: 12 }}>Rp. {job.salary}</Text>
                            <View style={styles.space} />
                            <Button title={job.type} />
                        </View>
                        <View>
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                initialLayout={initialLayout}
                                renderTabBar={renderTabBar}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between' }}>
                            {job.type.toLowerCase() === 'fulltime' && user.type.toLowerCase() === 'fulltimer' && (
                                <View>
                                    {!bookmark ? (
                                        <TouchableOpacity
                                            onPress={() => toggleModal('Bookmark')}
                                            style={{ width: 58, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#eeee', borderRadius: 11, height: 52 }} >
                                            <ILBookmark2 />
                                        </TouchableOpacity>

                                    ) : (
                                        <View
                                            style={{ width: 58, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(46, 204, 113,0.3)', borderRadius: 11, height: 52 }} >
                                            <ILBookmark2 />
                                        </View>
                                    )}
                                </View>
                            )}
                            <View style={{ width: 8 }} />
                            <View style={{ flex: 1 }}>
                                <RenderButton />
                            </View>
                        </View>
                        <View>
                            <Modal
                                isVisible={isModalVisible}
                                animationIn='fadeInUp'
                                animationOut='fadeOut'
                            >
                                <View style={{ padding: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF9901', borderRadius: 30 }}>
                                    <ILThumbsUp />
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#ffff' }} >Job {message} Success</Text>
                                </View>
                            </Modal>
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
            {loading && (
                <View style={{ flex: 1, zIndex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size='large' color='white' />
                    <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold', letterSpacing: 10, marginTop: 30 }} >Loading...</Text>
                </View>
            )}
            {animated && (
                <View style={{ flex: 1, zIndex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center' }} >
                    <Animated.View style={{ backgroundColor: '#ffff', opacity: opacity, width: 250, height: 200, padding: 20, borderRadius: 11, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 18 }} >Are you sure?</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }} >
                            <TouchableOpacity
                                onPress={startProject}
                                style={{
                                    width: 70, height: 50, backgroundColor: '#2ecc71', borderRadius: 11, justifyContent: 'center'
                                }}
                            >
                                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', textAlign: 'center', textAlignVertical: 'center' }} >Yes</Text>
                            </TouchableOpacity>
                            <View style={{ width: 20 }} />
                            <TouchableOpacity
                                onPress={fadeOut}
                                style={{
                                    width: 70, height: 50, backgroundColor: '#e74c3c', borderRadius: 11, justifyContent: 'center'
                                }}
                            >
                                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', textAlign: 'center', textAlignVertical: 'center' }} >No</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontSize: 24,
    },
    h3: {
        fontSize: 14,
        marginTop: 16,
        fontFamily: 'DMSans-Bold'
    },
    paragraph: {
        textAlign: 'justify'
    },
    space: {
        height: 20,
        width: 20
    },
    scene: {
        flex: 1
    }
})

export default JobDetail;
