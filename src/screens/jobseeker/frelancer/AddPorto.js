import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { useInput } from '../../../customHook'
import dateConvert from '../../../helpers/dateConvert'
import { ILCalender, ILStarColor } from '../../../assets/img/icons';
import { Button, Form, Loading } from '../../../components';
import { ILChevrontL } from '../../../assets';
import instance from '../../../config/axios';
import useForm from '../../../helpers/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortofolios } from '../../../store/reducer/portofolioReducer';

const AddPorto = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useForm({
        title: '',
        desc: '',
        link: '',
        startDate: '',
        endDate: ''
    })

    const startDate = useInput(new Date())
    const endDate = useInput(new Date())

    const onSubmit = async () => {
        console.log('Submit');
        try {
            const project = {
                title: form.title,
                desc: form.desc,
                link: form.link,
                startDate: dateConvert(startDate.date),
                endDate: dateConvert(endDate.date)
            }

            await instance.post('/user/freelance/portofolio', project, {
                headers: {
                    access_token: token
                }
            })
            dispatch(fetchPortofolios(token))
            showMessage({
                message: 'Success',
                description: 'Success add portofolio',
                type: 'success'
            })
        } catch (error) {
            console.log(error.message);
            showMessage({
                message: 'Error',
                description: error.message,
                type: 'danger'
            })
        }
    }

    return (
        <>
            <View style={styles.container} >
                <FlashMessage position='top' />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, marginTop: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Add Portofolio</Text>
                    </View>
                    <View></View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, backgroundColor: 'rgba(238, 238, 238, 0.3)' }}
                >
                    <View style={{ padding: 20 }} >
                        <View style={styles.form} >
                            <ILStarColor />
                            <View style={{ flex: 1, marginLeft: 20 }} >
                                <Form
                                    placeholder='Enter name of project'
                                    onChangeText={val => setForm('title', val)}
                                    value={form.title}
                                />
                            </View>
                        </View>
                        <View style={styles.form} >
                            <ILStarColor />
                            <View style={{ flex: 1, marginLeft: 20 }} >
                                <Form
                                    placeholder='Enter description'
                                    onChangeText={val => setForm('desc', val)}
                                    value={form.desc}
                                />
                            </View>
                        </View>
                        <View style={styles.form} >
                            <ILStarColor />
                            <View style={{ flex: 1, marginLeft: 20 }} >
                                <Form
                                    placeholder='Link project'
                                    onChangeText={val => setForm('link', val)}
                                    value={form.link}
                                />
                            </View>
                        </View>
                        <View style={styles.form} >
                            <ILCalender />
                            <View style={{ flex: 1, marginLeft: 20 }} >
                                <TouchableOpacity
                                    onPress={startDate.showDatePicker}
                                    style={styles.touchable_date}
                                >
                                    <Text>{dateConvert(startDate.date)}</Text>
                                    <Text style={{ marginLeft: 20, color: '#c4c4c4' }} >Start Project</Text>
                                </TouchableOpacity>
                                {startDate.show && (
                                    <DateTimePicker
                                        testID="dateTimePicker1"
                                        value={startDate.date}
                                        mode={startDate.mode}
                                        is24Hour={true}
                                        display='spinner'
                                        onChange={startDate.onChange}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={styles.form} >
                            <ILCalender />
                            <View style={{ flex: 1, marginLeft: 20 }} >
                                <TouchableOpacity
                                    onPress={endDate.showDatePicker}
                                    style={styles.touchable_date}
                                >
                                    <Text>{dateConvert(endDate.date)}</Text>
                                    <Text style={{ marginLeft: 20, color: '#c4c4c4' }} >End Project</Text>
                                </TouchableOpacity>
                                {endDate.show && (
                                    <DateTimePicker
                                        testID="dateTimePicker1"
                                        value={endDate.date}
                                        mode={endDate.mode}
                                        is24Hour={true}
                                        display='spinner'
                                        onChange={endDate.onChange}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={styles.btn}>
                            <Button
                                title='Submit'
                                type='submit-form'
                                onPress={onSubmit}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
            {loading && <Loading />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    },
    form: {
        flexDirection: 'row',
        marginTop: 23,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        marginTop: 50,
        alignItems: 'center'
    },
    touchable_date: {
        height: 57,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        fontSize: 14,
        fontFamily: 'DMSans_400Regular',
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default AddPorto
