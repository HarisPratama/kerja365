import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILMoreVErtical } from '../../assets';
import { Loading } from '../../components';
import instance from '../../config/axios';

const Hire = ({ navigation, route }) => {
    const { jobsParams, jobseekerId } = route.params

    const token = useSelector(({ user }) => user.Token)

    const [jobs, setJobs] = useState([])
    const [selected, setSelected] = useState('')
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (jobsParams) setJobs(JSON.parse(jobsParams))
    }, [jobsParams])

    const submit = async () => {
        setLoading(true)
        try {
            if (selected.length > 0) {
                const project = {
                    title: title,
                    jobId: selected,
                    userId: jobseekerId,
                    status: 'Waiting'
                }
                await instance.post('/project', project, {
                    headers: {
                        access_token: token
                    }
                })
                setLoading(false)
                navigation.navigate('CompanyApp')
            } else {
                showMessage({
                    type: 'warning',
                    message: 'Warning',
                    description: 'You must selected job'
                })
                setLoading(false)
            }
        } catch (error) {
            showMessage({
                type: 'danger',
                message: 'Erro',
                description: error.message
            })
            console.log(error)
            setLoading(false);
        }
    }

    const select = (id, title) => {
        setSelected(id)
        setTitle(title)
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }}>
                <FlashMessage position='top' />
                <View style={{ padding: 20 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ width: 50 }}
                        >
                            <ILChevrontL />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 16 }} >Hire a Freelancer</Text>
                        </View>
                        <View style={{ width: 50 }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }} >
                        <Text style={{ maxWidth: 250, textAlign: 'center', fontSize: 16 }} >Choose a project that is suitable for this freelancer</Text>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)' }}
                >
                    <View style={styles.container} >
                        {jobs.length > 0 && jobs.map(job => (
                            <TouchableOpacity
                                key={job._id}
                                onPress={() => select(job._id, job.title)}
                                style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: selected === job._id ? '#ff9901' : '#ffff', borderRadius: 11, marginTop: 10, padding: 20, alignItems: 'center' }}
                            >
                                <View>
                                    <Text style={{ fontWeight: '700', color: selected === job._id ? '#ffff' : 'black' }} >{job.title}</Text>
                                    <View style={{ flexDirection: 'row', marginTop: 10 }} >
                                        <Text style={{ fontSize: 12, color: selected === job._id ? '#ffff' : 'black' }} >{job.category}</Text>
                                        <Text style={{ fontSize: 12, marginLeft: 10, color: selected === job._id ? '#ffff' : 'black' }} >{job.salary}</Text>
                                    </View>
                                </View>
                                <ILMoreVErtical />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <View style={{ padding: 20 }} >
                    <TouchableOpacity
                        onPress={submit}
                        style={{ padding: 20, borderRadius: 11, backgroundColor: '#ff9901', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ color: '#ffff', fontWeight: '700', fontSize: 16 }} >Confirm</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {loading && <Loading />}
        </>
    )
};

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

export default Hire;
