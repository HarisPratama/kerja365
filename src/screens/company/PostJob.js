import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, SafeAreaView, Text, Dimensions, ActivityIndicator, View, StyleSheet, TextInput, Animated, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILEllipse, ILEllipse2, ILFileText, ILPlusCircle } from '../../assets';
import { Button } from '../../components';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import CurrencyInput from 'react-native-currency-input'
import { fetchJobPosting } from '../../store/reducer/jobPostingReducer';
import instance from '../../config/axios';

const PostJob = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { type, paramJob, payload, status, edit } = route.params
    const [require, setRequire] = useState('')
    const [form, setForm] = useState({
        startSalary: 0,
        endSalary: 0
    })
    const translateY = useRef(new Animated.Value(-60)).current
    const opacity = useRef(new Animated.Value(0)).current

    const user = useSelector(({ user }) => user.User)
    const token = useSelector(({ user }) => user.Token)

    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [targets, setTargets] = useState([])

    useEffect(() => {
        if (paramJob) {
            const job = JSON.parse(paramJob)
            setForm(job)
        }
        if (status === 'set target') {
            const parsePayload = JSON.parse(payload)
            setTargets(parsePayload.targets)
        }
    }, [status])

    const slideIn = (type) => {
        if (type === 1) {
            Animated.spring(translateY, {
                toValue: 10,
                useNativeDriver: true
            }).start()

            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            Animated.spring(translateY, {
                toValue: 10,
                useNativeDriver: true
            }).start()
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        }
    }

    const slideOut = (type, value) => {
        if (type === 1) {
            let newRequire
            const arr = []
            if (form?.jobRequirments) {
                newRequire = form.jobRequirments.concat(require)
            } else {
                newRequire = arr.concat(require)
            }
            setForm({ ...form, jobRequirments: newRequire })
            setRequire('')
            Animated.timing(translateY, {
                toValue: -60,
                duration: 500,
                useNativeDriver: true
            }).start()

            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else if (type === 2) {
            Animated.timing(translateY, {
                toValue: -60,
                duration: 500,
                useNativeDriver: true
            }).start()

            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start()
        } else {
            setForm({ ...form, category: value })
            setVisible1(false)
        }
    }

    const onSubmit = async () => {
        setLoading(true)
        try {
            let newJobPosting
            if (type === 'Fulltime') {
                newJobPosting = {
                    title: form.title,
                    jobResponsibility: form.jobResponsibility,
                    jobRequirments: form.jobRequirments,
                    area: form.area,
                    address: form.address,
                    salary: `${form.startSalary} - ${form.endSalary}`,
                    category: form.category,
                    createdAt: new Date(),
                    type: type,
                    companyId: user._id,
                }
            }

            if (type === 'Freelance') {
                newJobPosting = {
                    title: form.title,
                    jobResponsibility: form.jobResponsibility,
                    jobRequirments: form.jobRequirments,
                    salary: form.salary,
                    category: form.category,
                    createdAt: new Date(),
                    type: type,
                    companyId: user._id
                }
            }
            if (edit) {
                await instance.put(`/job/${form._id}`, newJobPosting, {
                    headers: {
                        access_token: token
                    }
                })
            } else {
                await instance.post('/job', newJobPosting, {
                    headers: {
                        access_token: token
                    }
                })
            }
            setLoading(false)
            dispatch(fetchJobPosting(token))
            navigation.navigate('JobPosting')
        } catch (error) {
            setLoading(false)
            console.log(`Error: ${error.message}`);
        }
    }

    const deleteRequirements = (i) => {
        form.jobRequirments.splice(i, 1)
        setForm({ ...form, jobRequirments: form.jobRequirments })
    }

    return (
        <>
            <SafeAreaView style={{ backgroundColor: '#ffff', flex: 1 }} >
                <FlashMessage position='top' />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 20, paddingBottom: 40 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Posting job</Text>
                    </View>
                    <View></View>
                </View>
                <View style={{ paddingHorizontal: 20, paddingBottom: 20 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                        <ILEllipse />
                        <View style={{ width: 10 }} />
                        <Text style={{ fontFamily: 'DMSans-Bold' }} >{type === 'Fulltime' ? 'Fulltime' : 'Freelance'}</Text>
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: 'rgba(238, 238, 238, 0.3)', paddingHorizontal: 20 }} >
                    <View style={{ marginTop: 35 }} >

                        <View style={{ padding: 20, borderRadius: 10, backgroundColor: '#ffff' }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <ILFileText />
                                <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Title</Text>
                            </View>
                            <TextInput
                                placeholder='Lowongan kerja marketing'
                                placeholderTextColor='#c4c4c4'
                                style={{ marginTop: 10, paddingHorizontal: 40, color: 'black' }}
                                onChangeText={(value) => setForm({ ...form, title: value })}
                                value={form?.title}
                            />
                        </View>

                        <View style={{ padding: 20, marginTop: 25, borderRadius: 10, backgroundColor: '#ffff' }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                <ILFileText />
                                <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Job Responsibility</Text>
                            </View>
                            <TextInput
                                placeholder='Lowongan kerja marketing'
                                placeholderTextColor='#c4c4c4'
                                multiline
                                style={{ height: 170, marginTop: 10, color: 'black', paddingHorizontal: 40 }}
                                textAlignVertical='top'
                                onChangeText={(value) => setForm({ ...form, jobResponsibility: value })}
                                value={form?.jobResponsibility}
                            />
                        </View>

                        <View style={{ padding: 20, marginTop: 25, borderRadius: 10, backgroundColor: '#ffff' }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 999 }} >
                                <ILFileText />
                                <Text style={{ flex: 1, fontFamily: 'DMSans-Bold', marginLeft: 11 }} >{type === 'Fulltime' ? 'Job Requirements' : 'Skills Requirements'}</Text>
                                {!visible && (
                                    <TouchableOpacity onPress={() => slideIn(1)} >
                                        <ILPlusCircle />
                                    </TouchableOpacity>
                                )}
                            </View>
                            <Animated.View style={{ transform: [{ translateY: translateY }], opacity: opacity }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <TextInput
                                        placeholder='Enter job requirment'
                                        placeholderTextColor='#c4c4c4'
                                        style={{ flex: 1, marginTop: 10, paddingHorizontal: 40, color: 'black' }}
                                        onChangeText={value => setRequire(value)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => slideOut(2)}
                                        style={{
                                            height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 20 / 2, borderWidth: 1, borderColor: 'red', marginLeft: 10
                                        }}
                                    >
                                        <Text style={{ fontSize: 12, color: 'red' }} >X</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                                    {require.length > 0 && (
                                        <TouchableOpacity
                                            onPress={() => slideOut(1, null)}
                                            style={{
                                                padding: 10, width: 100, borderRadius: 11, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff9901'
                                            }}
                                        >
                                            <Text style={{ fontFamily: 'DMSans-Bold', color: '#ffff' }} >Add</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </Animated.View>
                            {form?.jobRequirments?.length > 0 && form.jobRequirments.map((el, i) => (
                                <View
                                    key={i}
                                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', paddingHorizontal: 35 }}
                                >
                                    <ILEllipse2 />
                                    <Text style={{ flex: 1, marginLeft: 10 }} >{el}</Text>
                                    <TouchableOpacity
                                        onPress={() => deleteRequirements(i)}
                                        style={{
                                            height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 20 / 2, borderWidth: 1, borderColor: 'eeee'
                                        }}
                                    >
                                        <Text>X</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                        {type === 'Fulltime' && (
                            <View style={{ padding: 20, marginTop: 25, borderRadius: 10, backgroundColor: '#ffff' }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <ILFileText />
                                    <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Area</Text>
                                </View>
                                <TextInput
                                    placeholder='Jakarta Selatan'
                                    placeholderTextColor='#c4c4c4'
                                    style={{ marginTop: 10, paddingHorizontal: 40, color: 'black' }}
                                    onChangeText={(value) => setForm({ ...form, area: value })}
                                    value={form?.area}
                                />
                            </View>
                        )}

                        {type === 'Fulltime' && (
                            <View style={{ padding: 20, marginTop: 25, borderRadius: 10, backgroundColor: '#ffff' }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <ILFileText />
                                    <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Address</Text>
                                </View>
                                <TextInput
                                    placeholder='Jl. Cidodol Raya No.40 Kebayoran Lama'
                                    multiline
                                    placeholderTextColor='#c4c4c4'
                                    style={{ height: 170, marginTop: 10, paddingHorizontal: 40, color: 'black' }}
                                    textAlignVertical='top'
                                    onChangeText={(value) => setForm({ ...form, address: value })}
                                    value={form?.address}
                                />
                            </View>
                        )}

                        {type === 'Fulltime' ? (
                            <View style={{ padding: 20, marginTop: 25 }} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <ILFileText />
                                    <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Salary</Text>
                                </View>
                                <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <CurrencyInput
                                        onChangeValue={value => setForm({ ...form, startSalary: value })}
                                        value={form?.startSalary}
                                        // onChangeText={(value) => setForm({...form, salary: value})}
                                        textAlign='center'
                                        unit='Rp '
                                        separator='.'
                                        precision={0}
                                        style={{ flex: 1, backgroundColor: '#ffff', height: 60, borderRadius: 10, borderWidth: 1, borderColor: '#eeee', color: 'black' }}
                                    />
                                    <View style={{ width: 8 }} />
                                    <CurrencyInput
                                        onChangeValue={value => setForm({ ...form, endSalary: value })}
                                        value={form?.endSalary}
                                        // onChangeText={(value) => setForm({...form, salary: value})}
                                        textAlign='center'
                                        unit='Rp '
                                        separator='.'
                                        precision={0}
                                        style={{ flex: 1, backgroundColor: '#ffff', height: 60, borderRadius: 10, borderWidth: 1, borderColor: '#eeee', color: 'black' }}
                                    />
                                </View>
                            </View>
                        ) : (
                            <>
                                <View style={{ padding: 20, marginTop: 25, borderRadius: 10, backgroundColor: '#ffff' }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        <ILFileText />
                                        <Text style={{ fontFamily: 'DMSans-Bold', marginLeft: 11 }} >Salary</Text>
                                    </View>
                                    <CurrencyInput
                                        onChangeValue={value => setForm({ ...form, salary: value })}
                                        value={form?.salary}
                                        // onChangeText={(value) => setForm({...form, salary: value})}
                                        unit='Rp '
                                        separator='.'
                                        precision={0}
                                        style={{ marginTop: 10, paddingHorizontal: 40 }}
                                    />
                                </View>
                            </>
                        )}

                        <View style={{ padding: 20, marginTop: 25, borderRadius: 10, backgroundColor: '#ffff' }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                                <ILFileText />
                                <Text style={{ flex: 1, fontFamily: 'DMSans-Bold', marginLeft: 11 }} >{form?.category ? form?.category : 'Category'}</Text>
                                <TouchableOpacity onPress={() => slideIn(2)} >
                                    <ILPlusCircle />
                                </TouchableOpacity>
                            </View>
                            <Animated.View style={{ transform: [{ translateY: translateY }], paddingBottom: 20, paddingHorizontal: 35, opacity: opacity }} >
                                <TouchableOpacity
                                    onPress={() => slideOut(3, 'IT')}
                                    style={{
                                        backgroundColor: '#ffff',
                                        marginTop: 20
                                    }}
                                >
                                    <Text style={{ color: 'black' }} >IT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => slideOut(3, 'Marketing')}
                                    style={{
                                        backgroundColor: '#ffff',
                                        marginTop: 20
                                    }}
                                >
                                    <Text style={{ color: 'black' }} >Marketing</Text>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>

                    </View>

                    <View style={styles.btn} >
                        <Button
                            title='Submit'
                            type='submit-form'
                            onPress={onSubmit}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            {loading && (
                <View style={{ flex: 1, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: Dimensions.get('screen').height, width: Dimensions.get('screen').width, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size='large' color='white' />
                    <Text style={{ color: '#ffff', fontFamily: 'DMSans-Bold', letterSpacing: 10, marginTop: 30 }} >Loading...</Text>
                </View>
            )}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        elevation: 0,
        paddingHorizontal: 20,
        paddingTop: 62 - 23,
        paddingBottom: 50
    },
    form: {
        flexDirection: 'row',
        marginTop: 23,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        marginTop: 80,
        alignItems: 'center'
    }
})

export default PostJob;
