import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Image, TextInput, Animated, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { ILChevrontL, ILFileText, ILLink, ILPaperclipOrg, ILTrash } from '../../../assets';
import Icon from '../../../assets/img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../helpers/useForm';
import instance from '../../../config/axios';
import { fetchComments } from '../../../store/reducer/projectTargetReducer';
import { Loading } from '../../../components'
import { log } from 'react-native-reanimated';

const SubmitReport = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
    const [report, setReport] = useState('')
    const [commentType, setCommentType] = useState('')
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')
    const { status, target, num, photo } = route.params
    const translateY = useRef(new Animated.Value(Dimensions.get('screen').height)).current

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)
    const comments = useSelector(({ targets }) => targets.Comments)

    useEffect(() => {
        if (token) {
            dispatch(fetchComments(token, target._id))
        }
    }, [token])

    const slideIn = (message) => {
        if (message === 'reply') {
            setCommentType('reply')
        }

        if (message === 'update') {
            setCommentType('update')
        }

        if (message === 'approve') {
            setCommentType('approve')
        }
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

    const attachment = () => {
        // DocumentPicker
        //     .getDocumentAsync({ type: '*/*' })
        //     .then(res => {
        //         console.log(res, "<<< file picker");
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

    const sendComment = async () => {
        setLoading(true)
        try {
            const sendComment = {
                comment: comment,
                targetId: target._id
            }
            console.log(sendComment, "<<< comment");
            await instance.post('/comment-target', sendComment, {
                headers: {
                    access_token: token
                }
            })
            dispatch(fetchComments(token, target._id))
            setLoading(false)
            setComment('')
            slideOut()
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const approve = async () => {
        setLoading(true)
        try {
            const updateTarget = {
                desc: target.desc,
                date: target.date,
                status: 'Approve',
                jobUd: target.jobId,
                createdAt: target.createdAt,
                updatedAt: new Date(),
                report: report
            }
            await instance.put(`/job/${target._id}/target`, updateTarget, {
                headers: {
                    access_token: token
                }
            })
            setLoading(false)
            navigation.navigate('MainApp')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const onChange = (val) => {
        setComment(val)
    }

    const submitReport = async () => {
        setLoading(true)
        try {
            const updateTarget = {
                desc: target.desc,
                date: target.date,
                status: 'Reported',
                jobUd: target.jobId,
                createdAt: target.createdAt,
                updatedAt: new Date(),
                report: report
            }
            await instance.put(`/job/${target._id}/target`, updateTarget, {
                headers: {
                    access_token: token
                }
            })
            setLoading(false)
            navigation.navigate('MainApp')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#ffff' }} >
                <View style={{ backgroundColor: '#ffff', paddingTop: 20, paddingHorizontal: 20, paddingBottom: 60 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <ILChevrontL />
                        </TouchableOpacity>
                        <View>
                            <Text>Detail Report</Text>
                        </View>
                        <View />
                    </View>
                </View>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)' }}
                >
                    <View style={{ marginTop: 35, paddingHorizontal: 20 }} >

                        <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10 }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <ILFileText />
                                <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Staging {num + 1}</Text>
                            </View>
                            <View style={{ marginTop: 11, marginLeft: 36 }} >
                                <Text>{target.desc}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 47, paddingLeft: 20, justifyContent: 'space-between', alignItems: 'center' }} >
                            <View>
                                <Text>Report here</Text>
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: 10 }} >
                                <View style={{ height: 8, borderRadius: 10, backgroundColor: '#eeee' }} />
                            </View>
                        </View>

                        {/* Report section */}
                        {target.status.toLowerCase() === 'waiting' && user.type === 'freelancer' && (
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }} >
                                    <TouchableOpacity
                                        onPress={attachment}
                                        style={{
                                            backgroundColor: '#ffff', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10
                                        }}
                                    >
                                        <ILPaperclipOrg />
                                        <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 17, width: 92 }} >Attachment</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: '#ffff', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }} >
                                        <ILLink />
                                        <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 17, width: 92 }} >Add link</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ marginTop: 35 }} >
                                    <TextInput
                                        multiline={true}
                                        placeholder='Description'
                                        textAlignVertical='top'
                                        placeholderTextColor='#c4c4c4'
                                        style={{ height: 255, borderColor: '#eeee', borderWidth: 1, borderRadius: 10, padding: 20, backgroundColor: '#ffff', color: 'black' }}
                                        onChangeText={val => setReport(val)}
                                        value={report}
                                    />
                                </View>

                                <View style={{ justifyContent: 'center', marginTop: 80, paddingBottom: 50 }} >
                                    <TouchableOpacity
                                        onPress={submitReport}
                                        style={{ backgroundColor: '#FF9901', paddingVertical: 20, alignItems: 'center', borderRadius: 5 }} >
                                        <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        {target.status.toLowerCase() !== 'waiting' && (
                            <>
                                <View style={{ marginTop: 50 }} >
                                    <View style={{ backgroundColor: '#ffff', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }} >
                                        <ILLink />
                                        <Text style={{ flex: 1, fontFamily: 'DMSans-Bold', marginLeft: 17 }} >https://mockup.html</Text>
                                        {user.type !== 'company' && (
                                            <TouchableOpacity>
                                                <ILTrash />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>

                                <View style={{ marginTop: 35, height: 255, borderRadius: 10, backgroundColor: '#ffff' }} >
                                    <View style={{ padding: 20 }} >
                                        <View style={{ flexDirection: 'row' }} >
                                            <ILFileText />
                                            <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Description</Text>
                                        </View>
                                        <View style={{ paddingHorizontal: 35, marginTop: 20 }} >
                                            <Text style={{ textAlign: 'justify', fontFamily: 'DMSans-Regular', color: '#8F8E94' }} >{target?.report}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', marginTop: 47, paddingLeft: 20, justifyContent: 'space-between', alignItems: 'center' }} >
                                    <View>
                                        <Text>Comment</Text>
                                    </View>
                                    <View style={{ flex: 1, paddingHorizontal: 10 }} >
                                        <View style={{ height: 8, borderRadius: 10, backgroundColor: '#eeee' }} />
                                    </View>
                                </View>

                                {/* Comments */}
                                <View style={{ marginTop: 27, paddingBottom: 40 }} >
                                    {comments && comments?.map((el, i) => (
                                        <View
                                            key={i}
                                            style={{
                                                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20
                                            }}
                                        >
                                            {user._id === el.userId ? (
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                                                    <Image source={{ uri: user.photo }} style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />
                                                    <View style={{ width: 20 }} />
                                                    <View style={{ padding: 20, backgroundColor: '#ffff', borderRadius: 10 }} >
                                                        <Text style={{ fontFamily: 'DMSans-Regular', color: '#8F8E94' }} >{el.comment}</Text>
                                                    </View>
                                                </View>
                                            ) : (
                                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }} >
                                                    <View style={{ padding: 20, backgroundColor: '#ffff', borderRadius: 10 }} >
                                                        <Text style={{ fontFamily: 'DMSans-Regular', color: '#8F8E94', textAlign: 'right' }} >{el.comment}</Text>
                                                    </View>
                                                    <View style={{ width: 20 }} />
                                                    <Image source={{ uri: photo }} style={{ width: 40, height: 40, borderRadius: 40 / 2 }} />
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </View>

                                {/* Button */}
                                {status !== 'approve' && user.type !== 'company' && (
                                    <View style={{ justifyContent: 'space-between', marginTop: 40, paddingBottom: 50, flexDirection: 'row' }} >
                                        <TouchableOpacity
                                            onPress={() => slideIn('update')}
                                            style={{ backgroundColor: '#088E6B', paddingVertical: 20, width: 170, alignItems: 'center', borderRadius: 5 }}
                                        >
                                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Update report</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => slideIn('reply')}
                                            style={{ backgroundColor: '#FF9901', paddingVertical: 20, width: 170, alignItems: 'center', borderRadius: 5 }} >
                                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Reply comment</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                {user.type === 'company' && target.status !== 'approve' && (
                                    <View style={{ justifyContent: 'space-between', marginTop: 40, paddingBottom: 50, flexDirection: 'row' }} >
                                        <TouchableOpacity
                                            onPress={() => slideIn('approve')}
                                            style={{ backgroundColor: '#088E6B', paddingVertical: 20, width: 170, alignItems: 'center', borderRadius: 5 }}
                                        >
                                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Approve</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => slideIn('reply')}
                                            style={{ backgroundColor: '#FF9901', paddingVertical: 20, width: 170, alignItems: 'center', borderRadius: 5 }} >
                                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Comment</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </>
                        )}


                    </View>

                </ScrollView>
            </SafeAreaView>
            {visible && <View
                style={{
                    flex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, bottom: 0, left: 0
                }}
            >
                <TouchableOpacity
                    onPress={slideOut}
                    style={{ flex: 1 }}
                >
                </TouchableOpacity>
                <Animated.View style={{ backgroundColor: '#ffff', flex: 1, padding: 20, justifyContent: 'space-between', transform: [{ translateY: translateY }] }} >
                    {commentType === 'approve' ? (
                        <View style={{ borderWidth: 2, borderColor: '#eeee', borderRadius: 11, padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontFamily: 'DMSans-Bold', fontSize: 18 }} >Are you sure?</Text>
                            <View style={{ flexDirection: 'row', marginTop: 50 }} >
                                <TouchableOpacity
                                    onPress={approve}
                                    style={{
                                        width: 70, height: 50, backgroundColor: '#2ecc71', borderRadius: 11, justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', textAlign: 'center', textAlignVertical: 'center' }} >Yes</Text>
                                </TouchableOpacity>
                                <View style={{ width: 20 }} />
                                <TouchableOpacity
                                    onPress={slideOut}
                                    style={{
                                        width: 70, height: 50, backgroundColor: '#e74c3c', borderRadius: 11, justifyContent: 'center'
                                    }}
                                >
                                    <Text style={{ fontFamily: 'DMSans-Regular', color: '#ffff', textAlign: 'center', textAlignVertical: 'center' }} >No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <>
                            <View style={{ borderWidth: 1, borderColor: '#EEEEEE', height: 255, borderRadius: 10, padding: 20 }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <ILFileText />
                                    <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >{commentType === 'reply' ? 'Reply' : 'Comment for update'}</Text>
                                </View>
                                <TextInput
                                    style={{ marginTop: 14, marginLeft: 35, height: 70, color: 'black' }}
                                    multiline={true}
                                    placeholder='Type here'
                                    placeholderTextColor='#c4c4c4'
                                    textAlignVertical='top'
                                    onChangeText={onChange}
                                    value={comment}
                                />
                            </View>
                            <View style={{ paddingBottom: 25, justifyContent: 'center', alignItems: 'center' }} >
                                <TouchableOpacity
                                    onPress={sendComment}
                                    style={{ paddingVertical: 20, backgroundColor: commentType === 'reply' ? '#ff9901' : '#088E6B', alignItems: 'center', width: 355, borderRadius: 5 }}
                                >
                                    <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >{commentType === 'reply' ? 'Reply comment' : 'Update report'}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Animated.View>
            </View>
            }
            {loading && <Loading />}
        </>
    )
};

export default SubmitReport;
