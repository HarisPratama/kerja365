import React, { useState, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { ILChevrontL, ILLayers, ILMessageCircle, ILMoreVErtical, ILPaperclip, ILFileText, ILTrashW } from '../../assets';
import { ILCalender } from '../../assets/img/icons';
import { useInput } from '../../customHook';
import DateTimePicker from '@react-native-community/datetimepicker'
import dateConvert from '../../helpers/dateConvert'
import instance from '../../config/axios';
import { useSelector } from 'react-redux';


const Badge = ({ status }) => {
    if (status.toLowerCase() === 'approve') {
        return (
            <View
                style={{ padding: 7, backgroundColor: '#088E6B', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12 }} >{status}</Text>
            </View>
        )
    }

    if (status.toLowerCase() === 'on review') {
        return (
            <View
                style={{ padding: 7, backgroundColor: '#EA2027', borderRadius: 5 }}
            >
                <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', fontSize: 12 }} >{status}</Text>
            </View>
        )
    }

    if (status.toLowerCase() === 'waiting') {
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

const ProjectTarget = ({ navigation, route }) => {
    const { jobId, target } = route.params

    const token = useSelector(({ user }) => user.Token)

    const [targets, setTargets] = useState({
        desc: '',
        targets: []
    })

    useEffect(() => {
        if (target) {
            setTargets({ targets: target })
        }
        console.log(jobId, "<<< jobId");
    }, [])

    const date = useInput(new Date())

    const translateY = useRef(new Animated.Value(Dimensions.get('screen').height)).current
    const [visible, setVisible] = useState(false)

    const slideIn = () => {
        setVisible(true)
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true
        }).start()
    }

    const slideOut = () => {
        const target = {
            desc: targets.desc,
            date: date,
            status: 'Waiting'
        }

        const newTarget = targets.targets.concat(target)
        setTargets({ ...targets, targets: newTarget })

        Animated.timing(translateY, {
            toValue: Dimensions.get('screen').height,
            duration: 500,
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            setVisible(false)
        }, 500)
    }

    const cancel = () => {
        Animated.timing(translateY, {
            toValue: Dimensions.get('screen').height,
            duration: 500,
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            setVisible(false)
        }, 500)
    }

    const done = async () => {
        try {
            await instance.post(`/job/${jobId}/target`, targets.targets, {
                headers: {
                    access_token: token
                }
            })
            navigation.goBack()
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteTarget = (i) => {
        const deltarget = targets.targets.splice(i, 1)
        const newTargets = targets.targets.filter(target => target.desc !== deltarget[0].desc)
        setTargets({ targets: newTargets })
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 72, paddingHorizontal: 20, paddingBottom: 40 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Project Target</Text>
                    </View>
                    <View></View>
                </View>
                <View
                    style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'rgba(238, 238, 238, 0.3)' }}
                >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{ padding: 20 }}
                    >
                        {targets && targets.targets.map((el, i) => (
                            <View key={i} style={{ flexDirection: 'row' }} >
                                <View style={{ maxWidth: 30 }} >
                                    <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 16 }} >{target ? new Date(el.date.date).toDateString().substring(8, 11) : el.date.date.toDateString().substring(8, 11)}</Text>
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 15 }} >{target ? new Date(el.date.date).toDateString().substring(4, 8) : el.date.date.toDateString().substring(4, 8)}</Text>
                                    <Text style={{ fontFamily: 'DMSans-Regular', fontSize: 12 }} >{target ? new Date(el.date.date).toDateString().substring(11, 16) : el.date.date.toDateString().substring(11, 16)}</Text>
                                </View>
                                <View style={{ marginLeft: 9, alignItems: 'center' }} >
                                    <View style={{ width: 15, height: 15, borderWidth: 3, borderColor: '#FF9901', borderRadius: 15 / 2 }} />
                                    <View style={{ width: 2, flex: 1, backgroundColor: '#c4c4c4' }} />
                                </View>
                                <View style={{ flex: 1, paddingBottom: 20 }} >
                                    <View
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
                                            <Badge
                                                status={el.status}
                                            />
                                            <TouchableOpacity
                                                onPress={() => deleteTarget(i)}
                                                style={{ padding: 5, backgroundColor: 'red', borderRadius: 3 }}
                                            >
                                                <ILTrashW />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View style={{ padding: 20 }} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <TouchableOpacity
                                onPress={slideIn}
                                style={{ flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#0093BA', borderRadius: 5 }}
                            >
                                <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold' }} >Add Target</Text>
                            </TouchableOpacity>
                            <View style={{ width: 11 }} />
                            {targets.targets.length > 0 ? (
                                <TouchableOpacity
                                    onPress={done}
                                    style={{
                                        flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#FF9901', borderRadius: 5
                                    }}
                                >
                                    <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold' }} >Done</Text>
                                </TouchableOpacity>
                            ) : (
                                <View
                                    style={{
                                        flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#eeee', borderRadius: 5
                                    }}
                                >
                                    <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold' }} >Done</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            {visible && (
                <View style={{ flex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, bottom: 0, left: 0, justifyContent: 'space-between' }} >
                    <TouchableOpacity onPress={cancel} style={{ flex: 1 }} />
                    <Animated.View style={{ backgroundColor: '#ffff', padding: 20, height: 430, borderTopStartRadius: 25, borderTopEndRadius: 25, justifyContent: 'space-between', transform: [{ translateY: translateY }] }} >
                        <View style={{ marginTop: 50, borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 10, padding: 20 }} >
                            <View
                                style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}
                            >
                                <ILFileText />
                                <Text style={{ marginLeft: 10, fontFamily: 'DMSans-Bold' }} >Target description</Text>
                            </View>
                            <TextInput
                                placeholder='Input Target description'
                                style={{ marginTop: 14, paddingHorizontal: 40 }}
                                onChangeText={(value) => setTargets({ ...targets, desc: value })}
                                value={targets.desc}
                            />
                        </View>

                        <View style={{ borderWidth: 1, borderColor: '#EEEEEE', borderRadius: 10, padding: 20 }} >
                            <View
                                style={{
                                    flexDirection: 'row', alignItems: 'center'
                                }}
                            >
                                <ILCalender />
                                <Text style={{ marginLeft: 10, fontFamily: 'DMSans-Bold' }} >Target date</Text>
                            </View>
                            <TouchableOpacity
                                onPress={date.showDatePicker}
                                style={{ paddingVertical: 20, paddingHorizontal: 40 }}
                            >
                                <Text style={{ fontFamily: 'DMSans-Regular', color: 'rgba(0,0,0,0.3)' }} >{dateConvert(date.date)}</Text>
                            </TouchableOpacity>
                            {date.show && (
                                <DateTimePicker
                                    testID="dateTimePicker2"
                                    value={date.date}
                                    mode={date.mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={date.onChange}
                                />
                            )}
                        </View>

                        <TouchableOpacity
                            onPress={slideOut}
                            style={{ padding: 20, alignItems: 'center', backgroundColor: '#0093BA', borderRadius: 5 }}
                        >
                            <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold' }} >Set Target</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            )}
        </>
    )
};

export default ProjectTarget;
