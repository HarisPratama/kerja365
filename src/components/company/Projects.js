import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ILLayers, ILMessageCircle, ILMoreVErtical, ILPaperclip } from '../../assets';

const Badge = ({ status }) => {
    if (status === 'Approve') {
        return (
            <View
                style={{ padding: 7, backgroundColor: '#088E6B', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12 }} >{status}</Text>
            </View>
        )
    }

    if (status === 'On review') {
        return (
            <View
                style={{ padding: 7, backgroundColor: '#EA2027', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12 }} >{status}</Text>
            </View>
        )
    }

    if (status === 'Waiting') {
        return (
            <View
                style={{ padding: 7, backgroundColor: '#FF9901', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12 }} >{status}</Text>
            </View>
        )
    }

    return null
}

const Projects = ({ fadeIn, job, navigation }) => {

    return (
        <>
            <View style={{ padding: 20 }} >
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProjectTarget', { jobId: job._id, target: null })}
                    style={{ backgroundColor: 'green', borderRadius: 11, padding: 14, width: 130 }}
                >
                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Add Target</Text>
                </TouchableOpacity>
                {job?.status === 'star' && (
                    <View style={{ marginTop: 10 }} >
                        <View
                            style={{
                                width: 200, borderWidth: 2, borderColor: '#2ecc71', borderRadius: 5, paddingVertical: 10
                            }} >
                            <Text style={{ fontFamily: 'DMSans-Bold', textAlign: 'center', color: '#2ecc71' }} >Project on progress</Text>
                        </View>
                    </View>
                )}
                <View style={{ marginTop: 20 }} >
                    {job?.targets && job?.targets.map((el, i) => (
                        <View key={el._id} >
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ maxWidth: 30 }} >
                                    <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >{new Date(el.date.date).toDateString().substring(8, 11)}</Text>
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 15 }} >{new Date(el.date.date).toDateString().substring(4, 8)}</Text>
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >{new Date(el.date.date).toDateString().substring(11, 16)}</Text>
                                </View>
                                <View style={{ marginLeft: 9, alignItems: 'center' }} >
                                    <View style={{ width: 15, height: 15, borderWidth: 3, borderColor: '#FF9901', borderRadius: 15 / 2 }} />
                                    <View style={{ width: 2, flex: 1, backgroundColor: '#c4c4c4' }} />
                                </View>
                                <View style={{ flex: 1, paddingBottom: 20 }} >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('DetailReport', { status: 'control', target: el, num: i })}
                                        style={{
                                            marginLeft: 13, backgroundColor: '#ffff', borderRadius: 10, padding: 20
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                            <View>
                                                <Text style={{ fontFamily: 'DMSans-Bold' }} >Staging {i + 1}</Text>
                                                <Text style={{ fontFamily: 'DMSans-Regular', maxWidth: 200, marginTop: 9 }} >{el.desc}</Text>
                                            </View>
                                            <TouchableOpacity style={{ marginTop: -10 }} >
                                                <ILMoreVErtical />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }} >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                                    <ILPaperclip />
                                                    <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 8, color: '#8F8E94' }} >0</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }} >
                                                    <ILMessageCircle />
                                                    <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 8, color: '#8F8E94' }} >0</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }} >
                                                    <ILLayers />
                                                    <Text style={{ fontFamily: 'DMSans-Regular', marginLeft: 8, color: '#8F8E94' }} >0</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Badge
                                                    status={el.status}
                                                />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {i + 1 === job?.targets?.length && (
                                <View style={{ height: 2, backgroundColor: '#c4c4c4' }} />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </>
    )
};

export default Projects;
