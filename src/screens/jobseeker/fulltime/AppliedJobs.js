import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILFileText, ILMoreVErtical } from '../../../assets';
import { Button, JobCard } from '../../../components';
import { fetchApplications } from '../../../store/reducer/jobAppliedReducer';

const AppliedJobs = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const applications = useSelector(({ applications }) => applications.Applications)

    useEffect(() => {
        if (token) {
            dispatch(fetchApplications(token))
        }
    }, [token])

    return (
        <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }}>
            <View>
                <View style={[styles.container, { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingBottom: 50 }]}>
                    <TouchableOpacity
                        style={{ width: 50 }}
                        onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Applied Job</Text>
                    </View>
                    <View style={{ width: 50 }} />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicato={false}
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', paddingVertical: 20 }}
            >
                <View>
                    {applications?.length === 0 && (
                        <View style={{ padding: 20, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: 'DMSans-Regular', maxWidth: 250, letterSpacing: 5, color: 'black' }} >You haven't applied for any jobs yet</Text>
                            <View style={{ height: 50 }} />
                            <ILFileText />
                        </View>
                    )}
                    <View style={[styles.container, { marginTop: 10 }]} >
                        {applications && applications?.map(application => (
                            <JobCard
                                navigation={navigation}
                                ILMoreVErtical={ILMoreVErtical}
                                job={application}
                                applied
                                key={application._id}
                            />
                        )
                        )}
                    </View>
                    {applications?.length >= 3 && (
                        <View style={[styles.container, { marginTop: 105, justifyContent: 'center', alignItems: 'center' }]}>
                            <Button
                                title='Find More Jobs'
                                type='load'
                                height={50}
                                width={200}
                            />
                        </View>
                    )}
                </View>
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

export default AppliedJobs;
