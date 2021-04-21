import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ILChevrontL, ILFileText, ILMoreVErtical } from '../../../assets';
import { Button, JobCard } from '../../../components';
import { fetchBookmarks } from '../../../store/reducer/jobBookmarkReducer';
const BookmarkJobs = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const bookmarks = useSelector(({ bookmarks }) => bookmarks.Bookmarks)

    useEffect(() => {
        if (token) {
            dispatch(fetchBookmarks(token))
        }
    }, [token])

    return (
        <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }} >
            <View style={{ backgroundColor: '#ffff' }}>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 50 }]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 16 }} >Bookmark Job</Text>
                    </View>
                    <View style={{ width: 25 }} />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicato={false}
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', paddingVertical: 20 }}
            >
                <View>
                    {bookmarks?.length === 0 && (
                        <View style={{ padding: 20, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'DMSans-Regular', maxWidth: 250, letterSpacing: 5, color: 'black' }} >You haven't bookmark for any jobs yet</Text>
                            <View style={{ height: 50 }} />
                            <ILFileText />
                        </View>
                    )}
                    <View style={[styles.container, { marginTop: 10 }]} >
                        {bookmarks?.length > 0 && bookmarks.map(bookmark => (
                            <JobCard
                                navigation={navigation}
                                ILMoreVErtical={ILMoreVErtical}
                                job={bookmark}
                                applied
                                key={bookmark._id}
                            />
                        ))}
                    </View>
                </View>
                {bookmarks?.length >= 3 && (
                    <View style={[styles.container, { marginTop: 105, justifyContent: 'center', alignItems: 'center' }]}>
                        <Button
                            title='Find More Jobs'
                            type='load'
                            height={50}
                            width={200}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
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

export default BookmarkJobs;
