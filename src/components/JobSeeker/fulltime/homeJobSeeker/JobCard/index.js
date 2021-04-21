import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ILEllipse2 } from '../../../../../assets';
import Logo from '../../../../../assets/img/logo.png';

const JobCard = ({ navigation, ILMoreVErtical, job, applied }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { jobId: applied ? job.jobId : job._id })} >
            <View style={styles.card} >
                <View style={styles.image} >
                    <Image source={job?.company?.photo ? { uri: job.company.photo } : Logo} style={styles.logo} />
                </View>
                <View style={{ maxWidth: 225, justifyContent: 'center', flex: 1 }}>
                    <Text style={styles.title} >{job.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: 150 }} >
                        <Text style={styles.desc} >{job.company.user_name}</Text>
                        <ILEllipse2 />
                        <View style={{ width: 5 }} />
                        <Text style={styles.desc} >{job.type}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center' }}>
                    <ILMoreVErtical />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        marginTop: 8,
        backgroundColor: '#ffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25
    },
    title: {
        fontSize: 14,
        fontFamily: 'DMSans-Bold'
    },
    desc: {
        fontSize: 12,
        color: '#6B6969',
        fontFamily: 'DMSans-Bold',
        paddingRight: 5
    },
    image: {
        justifyContent: 'center'
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2
    }
})

export default JobCard;
