import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ILCalender, ILGlobe, ILMail, ILMapPin, ILStarColor, ILUser2 } from '../../../../assets/img/icons';
import { Button, Form } from '../../../mikro';
import DateTimePicker from '@react-native-community/datetimepicker';
import dateConvert from '../../../../helpers/dateConvert';
import { useInput } from '../../../../customHook';
import instance from '../../../../config/axios';
import Loading from '../../../makro/Loading';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../../../store/reducer/userReducer';

const FormProfile = ({ user, navigation, token, photo }) => {
    const dispatch = useDispatch()

    const [form, setForm] = useState({})
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const date = useInput(new Date())

    useEffect(() => {
        console.log(photo.length, "<<< photo");
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
            setMessage('Success update your data')
            setVisible(true)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setMessage('Oops!, Something error')
            setVisible(true)
            setLoading(false)
        }
    }

    return (
        <>
            <View
                style={styles.container}
            >
                {visible && (
                    <View style={{ backgroundColor: '#c4c4c4' }} >
                        <Text>{message}</Text>
                    </View>
                )}
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
                            <Form
                                type='date'
                                placeholder='End date'
                                value={date.date}
                                mode={date.mode}
                                show={date.show} 
                                onPress={date.showDatePicker}
                                onChange={date.onChange}
                            />
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
}

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

export default FormProfile;
