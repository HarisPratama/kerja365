import React, { useState, useEffect } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useDispatch, useSelector } from 'react-redux'
import {
    ILSliders,
    ILMoreVErtical,
    ILSearch
} from '../../../assets'
import { JobCard, JobNews, VibePointsButton, UserSection, GroupButton, FulltimeJob } from '../../../components'
import { fetchJobs } from '../../../store/reducer/jobsReducer'
import { getData } from '../../../utils/localStorage'
import { fetchVibePoints } from '../../../store/reducer/vibePointReducer'
import axios from 'axios'
import { setNews } from '../../../store/action'
import { fetchNotifications } from '../../../store/reducer/messagesReducer'

const JobSeeker = ({ navigation }) => {
    const dispatch = useDispatch()
    const [limit, setLimit] = useState(5)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const jobs = useSelector(({ jobs }) => jobs.Jobs)
    const points = useSelector(({ points }) => points.Points)

    useEffect(() => {
        (async () => {
            const user = await getData('user')
            const token = await getData('token')
            dispatch({ type: 'SET_USER', payload: user })
            dispatch({ type: 'SET_TOKEN', payload: token })

            const { data } = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https://topcareer.id/feed/')
            dispatch(setNews(data.items))
        })()
        if (token) {
            dispatch(fetchJobs(token))
            dispatch(fetchVibePoints(token))
        }
        dispatch(fetchNotifications(user._id))
    }, [dispatch, search, token])

    const onPress = () => {
        setLimit(limit + 5)
    }

    const onChangeText = (val) => {
        setSearch(val)
        if (val.length > 0) {
            navigation.navigate('SearchJob', { search: val, jobs: jobs })
            setSearch('')
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)' }}
            >
                {user ? (
                    <>
                        <UserSection
                            user={user}
                            navigation={navigation}
                        />
                        <View style={{ backgroundColor: '#ffff', padding: 20 }} >
                            <GroupButton user={user} navigation={navigation} />
                        </View>
                    </>
                ) : (
                    <>
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
                        <View style={{ backgroundColor: '#ffff', padding: 20 }} >
                            <SkeletonPlaceholder>
                                <View style={{ height: 70, borderRadius: 100 }} />
                            </SkeletonPlaceholder>
                        </View>
                    </>
                )}
                <View style={styles.space} />
                {jobs && user?.type === 'fulltimer' && (
                    <FulltimeJob
                        search={search}
                        setSearch={setSearch}
                        navigation={navigation}
                        jobs={jobs}
                        limit={limit}
                        onPress={onPress}
                    />
                )}
                {jobs && user && user?.type?.toLowerCase() === 'freelancer' && (
                    <>
                        <View style={{ paddingHorizontal: 20 }} >
                            <VibePointsButton
                                navigation={navigation}
                                points={points}
                                token={token}
                            />
                        </View>
                        <View style={styles.space} />
                        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#ffff', height: 50, width: 40, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                <ILSearch />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <TextInput
                                    placeholder='Search'
                                    placeholderTextColor='#c4c4c4'
                                    style={{ backgroundColor: '#ffff', color: 'black', height: 50, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                                    onChangeText={onChangeText}
                                    value={search}
                                />
                            </View>
                            <View style={{ width: 10 }} />
                            <TouchableOpacity style={{ height: 52, width: 52, backgroundColor: '#FF9901', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }} >
                                <ILSliders />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.space} />
                        <View style={{ paddingHorizontal: 20 }} >
                            {jobs.filter(el => el.title.toLowerCase().includes(search.toLowerCase())).slice(0, limit).map(job => {
                                if (loading === true) {
                                    return (
                                        <SkeletonPlaceholder key={job._id} >
                                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                                                <View style={{ width: 150, height: 76, borderRadius: 10 }} />
                                                <View style={{ marginLeft: 20 }}>
                                                    <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                                                    <View
                                                        style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                                                    />
                                                </View>
                                            </View>
                                        </SkeletonPlaceholder>
                                    )
                                } return (
                                    <JobCard
                                        key={job._id}
                                        ILMoreVErtical={ILMoreVErtical}
                                        job={job}
                                        navigation={navigation}
                                    />
                                )
                            })}
                            {jobs?.length > limit && (
                                <TouchableOpacity onPress={onPress} style={styles.btn} >
                                    <Text style={styles.btnTitle} >Show More</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                        <View style={styles.space} />
                    </>
                )}
                <View style={styles.space} />
                <JobNews
                    navigation={navigation}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 20
    },
    text: {
        fontSize: 16,
        fontFamily: 'DMSans-Bold'
    },
    space: {
        height: 15,
        width: 15
    },
    textInput: {
        borderRadius: 150
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardHorizontalView: {
        width: '80%'
    },
    logo: {
        width: 50,
        height: 50
    },
    moreVertical: {
        width: 20,
        height: 20
    },
    btn: {
        marginTop: 37,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(238, 238, 238, 0.5)',
        paddingVertical: 16,
        borderRadius: 50
    },
    btnTitle: {
        color: '#FF9901',
        fontFamily: 'DMSans-Regular',
        fontSize: 14
    }
})

export default JobSeeker
