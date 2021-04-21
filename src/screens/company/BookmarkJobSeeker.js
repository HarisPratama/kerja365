import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILMoreVErtical } from '../../assets';
import { fetchBookmarkJobseekers } from '../../store/reducer/jobseekerBookmarks';
import Avatar from '../../assets/img/avatar.png';

const BookmarkJobSeeker = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const bookmarkJobseekers = useSelector(({ jobseekerBookmarks }) => jobseekerBookmarks.BookmarkJobseekers)

    useEffect(() => {
        if (token) {
            dispatch(fetchBookmarkJobseekers(token))
        }
    }, [dispatch])

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: '#ffff' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 50, paddingHorizontal: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ width: 50 }}
                    >
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 16, textAlign: 'center' }} >Bookmark Jobseekers</Text>
                    </View>
                    <View style={{ width: 50 }} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ paddingHorizontal: 20, marginTop: 10 }} >
                    {bookmarkJobseekers && bookmarkJobseekers.map(el => (
                        <TouchableOpacity
                            key={el._id}
                            onPress={() => navigation.navigate('DetailJobseeker', { id: el.userId })}
                            style={{
                                flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, backgroundColor: '#ffff', borderRadius: 10, alignItems: 'center', padding: 20
                            }}
                        >
                            <Image source={el.photo ? { uri: el.photo } : Avatar} style={{ width: 50, height: 50, borderRadius: 50 / 2 }} />
                            <View style={{ flex: 1, marginLeft: 12 }} >
                                <Text>{el.user_name}</Text>
                                <Text>{el?.user_profession}</Text>
                            </View>
                            <ILMoreVErtical />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default BookmarkJobSeeker;
