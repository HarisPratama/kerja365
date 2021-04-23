import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse2, ILLayers, ILMessageCircle, ILMoreVErtical, ILPaperclip } from '../../../assets';
import Logo from '../../../assets/img/logo.png';
import { fetchTargets } from '../../../store/reducer/projectTargetReducer';

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

    if (status === 'On review' || status === 'Reported') {
        return (
            <View
                style={{ padding: 7, backgroundColor: '#EA2027', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12 }} >{status}</Text>
            </View>
        )
    }

    if (status === 'Report' || status === 'Waiting') {
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

const ProgressReport = ({ navigation, route }) => {
    const { project } = route.params

    const dispatch = useDispatch()

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const targets = useSelector(({ targets }) => targets.Targets)
    const [data, setData] = useState({})

    useEffect(() => {
        if (token) {
            const parseProject = JSON.parse(project)
            setData(parseProject)
            dispatch(fetchTargets(token, parseProject.jobId))
        }
    }, [token])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
            <View
                style={{
                    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ILChevrontL />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16 }} >Progress Report</Text>
                </View>
                <View></View>
            </View>
            <View style={{ backgroundColor: '#ffff', paddingBottom: 30 }} >
                <View
                    style={{
                        borderRadius: 10, marginTop: 8, backgroundColor: '#ffff', padding: 20
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <View style={{ justifyContent: 'center' }} >
                            <Image source={{ uri: data?.photo }} style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />
                        </View>
                        <View style={{ justifyContent: 'center', marginLeft: 23, flex: 1 }}>
                            <Text style={{ fontSize: 14, fontFamily: 'DMSans-Bold', maxWidth: 225 }} >{data.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: 150 }} >
                                <Text
                                    style={{
                                        fontSize: 12, color: '#6B6969', fontFamily: 'DMSans-Bold', paddingRight: 5
                                    }}
                                >
                                    {user.type === 'company' ? data?.freelancer_name : data?.company_name}
                                </Text>
                                <ILEllipse2 />
                                <View style={{ width: 5 }} />
                                <Text
                                    style={{
                                        fontSize: 12, color: '#6B6969', fontFamily: 'DMSans-Bold', paddingRight: 5
                                    }}
                                >Freelance</Text>
                            </View>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#088E6B', padding: 5, borderRadius: 5 }}>
                            <Text style={{ fontFamily: 'DMSans-Regular', color: '#088E6B', fontSize: 12 }} >{data.status}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }} >
                    <Text style={{ fontFamily: 'DMSans-Bold' }} >History report</Text>
                    <View style={{ height: 8, borderRadius: 10, width: '70%', backgroundColor: '#FF9901' }} />
                </View>
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)' }}
            >
                <View style={{ padding: 20 }} >
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ width: 40 }} >
                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >27</Text>
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 15 }} >Feb</Text>
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >2021</Text>
                        </View>
                        <View style={{ marginLeft: 9, alignItems: 'center' }} >
                            <View style={{ width: 15, height: 15, borderWidth: 3, borderColor: '#088E6B', borderRadius: 15 / 2 }} />
                            <View style={{ width: 2, flex: 1, backgroundColor: '#c4c4c4' }} />
                        </View>
                        <View style={{ flex: 1, paddingBottom: 20 }} >
                            <View style={{ marginLeft: 13, backgroundColor: '#ffff', borderRadius: 10, padding: 20 }} >
                                <Text>Project Start</Text>
                            </View>
                        </View>
                    </View>

                    {/* Progress */}
                    {targets && targets.map((el, i) => (
                        <View key={el._id} >
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ width: 40 }} >
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
                                        onPress={() => navigation.navigate('DetailReport', { status: el.status.toLowerCase(), target: el, photo: data.photo, num: i })}
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
                        </View>
                    ))}
                    {/* End progress */}

                    {/* Project Done */}
                    <View style={{ flexDirection: 'row' }} >
                        <View style={{ width: 40, paddingBottom: 20 }} >
                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >04</Text>
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 15 }} >Mar</Text>
                            <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >2021</Text>
                        </View>
                        <View style={{ marginLeft: 9, alignItems: 'center' }} >
                            <View style={{ width: 15, height: 15, borderWidth: 3, borderColor: '#088E6B', borderRadius: 15 / 2 }} />
                        </View>
                        <View style={{ flex: 1, }} >
                            <View style={{ marginLeft: 13, backgroundColor: '#ffff', borderRadius: 10, padding: 20 }} >
                                <Text>Project Done</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ProgressReport;
