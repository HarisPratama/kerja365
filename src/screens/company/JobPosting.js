import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'react-native';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse2, ILFileText, ILMoreVErtical, ILUsers } from '../../assets';
import Logo from '../../assets/img/logo.png';
import { fetchJobPosting } from '../../store/reducer/jobPostingReducer';

const JobPosting = ({ navigation }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const translateY = useRef(new Animated.Value(Dimensions.get('screen').height)).current

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const jobPosting = useSelector(({ jobPosting }) => jobPosting.JobPosting)

    useEffect(() => {
        dispatch(fetchJobPosting(token))
    }, [dispatch, token])

    const slideIn = () => {
        setVisible(true)
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }

    const slideOut = () => {
        Animated.timing(translateY, {
            toValue: Dimensions.get('screen').height,
            duration: 500,
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            setVisible(false)
        }, 500)
    }

    const JobPost = () => {
        return (
            <View style={{ flex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, bottom: 0, left: 0, justifyContent: 'space-between' }} >
                <TouchableOpacity onPress={slideOut} style={{ flex: 1 }} />
                <Animated.View style={{ backgroundColor: '#ffff', padding: 20, height: 330, borderTopStartRadius: 25, borderTopEndRadius: 25, justifyContent: 'space-between', transform: [{ translateY: translateY }] }} >
                    <TouchableOpacity onPress={() => navigation.navigate('PostJob', { type: 'Fulltime' })} style={{ marginTop: 50, borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 10, flexDirection: 'row', alignItems: 'center', padding: 40 }} >
                        <ILFileText />
                        <Text style={{ marginLeft: 10, fontFamily: 'DMSans-Bold' }} >Fulltime Job Posting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PostJob', { type: 'Freelance' })} style={{ borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 10, flexDirection: 'row', alignItems: 'center', padding: 40 }} >
                        <ILFileText />
                        <Text style={{ marginLeft: 10, fontFamily: 'DMSans-Bold' }} >Freelancer Job Posting</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }}>
                <View>
                    <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 50 }]}>
                        <TouchableOpacity style={{ width: 50 }} onPress={() => navigation.goBack()}>
                            <ILChevrontL />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} >
                            <Text style={{ fontSize: 16, fontFamily: 'DMSans-Regular', textAlign: 'center' }} >Job Posting</Text>
                        </View>
                        <View style={{ width: 50 }} />
                    </View>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false} showsVerticalScrollIndicato={false}
                    style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', paddingVertical: 20 }}
                >
                    <View>
                        {jobPosting?.length === 0 && (
                            <View style={{ padding: 20, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'DMSans-Regular', maxWidth: 250, letterSpacing: 5, color: 'black' }} >You haven't post for any jobs yet</Text>
                                <View style={{ height: 50 }} />
                                <ILFileText />
                            </View>
                        )}
                        <View style={[styles.container, { marginTop: 10 }]} >
                            {jobPosting && jobPosting?.map((jobPost, i) => (
                                <TouchableOpacity
                                    key={jobPost.id ? jobPost.id : i}
                                    onPress={() => navigation.navigate('JobDetail', { jobId: jobPost._id, type: jobPost.type })}
                                    style={{ flexDirection: 'row', backgroundColor: '#ffff', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderRadius: 10, marginTop: 18 }}
                                >
                                    <Image
                                        source={user.photo ? { uri: user.photo } : Logo}
                                        style={{ width: 35, height: 35 }}
                                    />
                                    <View style={{ flex: 1, marginLeft: 23, maxWidth: 180 }} >
                                        <Text style={{ fontFamily: 'DMSans-Bold' }} >{jobPost.title}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }} >
                                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 12, color: '#6b6969' }} >{jobPost.companyName}</Text>
                                            <ILEllipse2 style={{ marginLeft: 5 }} />
                                            <View style={{ width: 5 }} />
                                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 12, color: '#6b6969' }} >{jobPost.type}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <ILUsers />
                                        <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 5 }} >{jobPost.applicants?.length}</Text>
                                    </View>
                                    <ILMoreVErtical />
                                </TouchableOpacity>
                            )
                            )}
                        </View>
                        <View style={[styles.container, { marginTop: 105, justifyContent: 'center', alignItems: 'center' }]}>
                            <TouchableOpacity
                                onPress={slideIn}
                                style={{
                                    backgroundColor: '#ff9901', height: 50, justifyContent: 'center', alignItems: 'center', width: 200, borderRadius: 25
                                }}
                            >
                                <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Post new job</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            {visible && (
                <JobPost />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    card: {
        borderRadius: 10,
        paddingVertical: 18,
        paddingHorizontal: 25,
        marginTop: 15,
    }
});

export default JobPosting;
