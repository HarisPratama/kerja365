import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ILChevrontL, ILXsvg } from '../../../assets';
import { ILStarColor } from '../../../assets/img/icons';
import { Button, Form, Loading } from '../../../components';
import instance from '../../../config/axios';
import { fetchSkills } from '../../../store/reducer/skillsReducer';

const AddSkill = ({ navigation }) => {
    const dispatch = useDispatch()

    const token = useSelector(({ user }) => user.Token)
    const [skills, setSkills] = useState([])
    const [skill, setSkill] = useState('')
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
    }, [skills])

    const onChangeText = (value) => {
        setSkill(value)
        for (let i = 0; i < value?.length; i++) {
            if (value[i] === '\n') {
                const newSKill = skills.concat(skill)
                setSkills(newSKill)
                setSkill('')
            }
        }
    }

    const deleteSkill = (i) => {
        const deleteSkill = skills.splice(i, 1)
        const newSkill = skills.filter(el => el !== deleteSkill)
        setSkills(newSkill)
    }


    const onSubmit = async () => {
        setLoading(true)
        const insertSkills = skills.map(el => {
            return { title: el }
        })
        try {

            await instance.post('/skill', insertSkills, {
                headers: {
                    access_token: token
                }
            })
            setVisible(true)
            setLoading(false)
            dispatch(fetchSkills(token))
            navigation.navigate('MainApp', { screen: 'Profile' })
        } catch (error) {
            console.log(error.message);
            setMessage('Oops!, Something error')
            setVisible(true)
            setLoading(false)
        }
    }

    return (
        <>
            <View style={styles.container} >
                {visible && <Text>{message}</Text>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 72 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ILChevrontL />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 16 }} >Add skill</Text>
                    </View>
                    <View></View>
                </View>
                <View style={styles.form} >
                    <ILStarColor />
                    <View style={{ flex: 1, marginLeft: 20 }} >
                        <Form
                            placeholder='Enter for add skill'
                            onChangeText={onChangeText}
                            value={skill}
                            multiline={true}
                        />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30 }} >
                    {skills && skills.map((item, i) => (
                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, borderColor: '#eeee', borderWidth: 1, marginHorizontal: 5, borderRadius: 5, padding: 5 }} >
                            <TouchableOpacity onPress={() => deleteSkill(i)} >
                                <ILXsvg />
                            </TouchableOpacity>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>

                {skills?.length > 0 && (
                    <View style={styles.btn} >
                        <Button
                            title='Submit'
                            type='submit-form'
                            onPress={onSubmit}
                        />
                    </View>
                )}
            </View>
            {loading && <Loading />}
        </>
    )
};

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
    }
});

export default AddSkill;
