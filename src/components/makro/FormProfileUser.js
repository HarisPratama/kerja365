import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ILCalender, ILGlobe, ILMail, ILMapPin, ILStarColor, ILUser2 } from '../../assets/img/icons';
import { Form, Button } from '../../components/mikro';
import dateConvert from '../../helpers/dateConvert';
import { useInput } from '../../customHook';
import instance from '../../config/axios';
import Loading from '../../components/makro/Loading';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../store/reducer/userReducer';
import { showMessage } from 'react-native-flash-message'

const FormProfileUser = ({ user, token, photo }) => {
    const dispatch = useDispatch()

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const date = useInput(new Date())

    useEffect(() => {
        setForm(user)
    }, [user])

    const submit = async () => {
        setLoading(true)
        try {
            let updateUser
            if (user.type === 'company') {
                updateUser = {
                    user_name: form.user_name,
                    user_email: form.user_email,
                    user_profession: form.user_profession,
                    user_phonenumber: form.user_phonenumber,
                    photo: photo.length > 10 ? photo : form.photo,
                    user_address: form.user_address,
                    user_about: form.user_about
                }
            } else {
                updateUser = {
                    user_name: form.user_name,
                    user_email: form.user_email,
                    user_profession: form.user_profession,
                    user_phonenumber: form.user_phonenumber,
                    photo: photo?.length > 0 ? photo : form.photo,
                    dateOfBirth: date.date ? dateConvert(date.date) : form.dateOfBirth,
                    user_address: form.user_address,
                    user_about: form.user_about,
                    interestCategory: form.interestCategory
                }
            }

            await instance.put(`/user/${user._id}`, updateUser, {
                headers: {
                    access_token: token
                }
            })
            dispatch(fetchUser(user._id, token))
            showMessage({
                type: 'success',
                description: 'Success update your data',
                message: 'Action success'
            })
            setLoading(false)
        } catch (error) {
            console.log(error);
            showMessage({
                type: 'success',
                description: 'Oops!, Something error',
                message: 'Action failed'
            })
            setLoading(false)
        }
    }

    return (
        <>
            <View
                style={styles.container}
            >
                <View style={styles.form} >
                    <View>
                        <ILUser2 />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <Form
                            placeholder='Fullname'
                            onChangeText={value => setForm({ ...form, user_name: value })}
                            value={form.user_name}
                        />
                    </View>
                </View>

                <View style={styles.form} >
                    <View>
                        <ILMail />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <Form
                            placeholder='Email'
                            onChangeText={value => setForm({ ...form, user_email: value })}
                            value={form?.user_email}
                        />
                    </View>
                </View>

                {user.type !== 'company' && (
                    <View style={styles.form} >
                        <View>
                            <ILStarColor />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }} >
                            <Form
                                placeholder='Profession'
                                onChangeText={value => setForm({ ...form, user_profession: value })}
                                value={form?.user_profession}
                            />
                        </View>
                    </View>
                )}

                <View style={styles.form} >
                    <View>
                        <ILGlobe />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <Form
                            placeholder='Phone Number'
                            onChangeText={value => setForm({ ...form, user_phonenumber: value })}
                            value={form?.user_phonenumber}
                        />
                    </View>
                </View>

                {user.type !== 'company' && (
                    <View style={styles.form} >
                        <View>
                            <ILCalender />
                        </View>
                        <View style={{ flex: 1, marginLeft: 10 }} >
                            <TouchableOpacity
                                onPress={date.showDatePicker}
                                style={{ borderRadius: 10, borderWidth: 1, height: 57, justifyContent: 'center', borderColor: '#C4C4C4' }}
                            >
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={{ color: 'black', fontFamily: 'DMSans-Regular', marginLeft: 20, }} >
                                        {form.dateOfBirth ? form.dateOfBirth : dateConvert(date.date)}
                                    </Text>
                                    <Text style={{ color: '#c4c4c4', fontFamily: 'DMSans-Regular', marginLeft: 20, }} >Date of birth</Text>
                                </View>
                            </TouchableOpacity>
                            {date.show && (
                                <DateTimePicker
                                    testID="dateTimePicker1"
                                    value={date.date}
                                    mode={date.mode}
                                    is24Hour={true}
                                    display={'spinner'}
                                    onChange={date.onChange}
                                />
                            )}
                        </View>
                    </View>
                )}

                <View style={styles.form} >
                    <View>
                        <ILMapPin />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <Form
                            placeholder='Address'
                            multiline={true}
                            onChangeText={value => setForm({ ...form, user_address: value })}
                            value={form?.user_address}
                        />
                    </View>
                </View>

                <View style={styles.form} >
                    <View>
                        <ILStarColor />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }} >
                        <Form
                            placeholder={user.type === 'company' ? 'About your company' : 'About you'}
                            multiline={true}
                            onChangeText={value => setForm({ ...form, user_about: value })}
                            value={form?.user_about}
                        />
                    </View>
                </View>

                <View style={styles.btn} >
                    <Button
                        title='Submit'
                        type='submit-form'
                        onPress={submit}
                    />
                </View>
            </View>
            {loading && (
                <Loading />
            )}
        </>
    )
};

export default FormProfileUser;

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
