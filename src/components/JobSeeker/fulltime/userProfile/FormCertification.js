import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useInput } from '../../../../customHook';
import { Button, Form } from '../../../mikro';
import dateConvert from '../../../../helpers/dateConvert';
import { useDispatch } from 'react-redux';
import { ILCalender, ILMenu, ILStarColor, ILBarChart } from '../../../../assets/img/icons';
import { addCertification } from '../../../../store/action';
import instance from '../../../../config/axios';
import { Loading } from '../../../makro';
import { fetchCertifications } from '../../../../store/reducer/certificationReducer';

const FormCertification = ({ navigation, token, certification, edit }) => {
  const dispatch = useDispatch()

  const date = useInput(new Date())

  const [form, setForm] = useState({})
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (edit === true) {
      setForm(certification)
    }
  }, [certification])

  const onSubmitAdd = async () => {
    setLoading(true)
    const newCertification = {
      title: form.title,
      institution: form.institution,
      dateCertification: dateConvert(date.date),
      description: form.description
    }

    try {
      if (edit === true) {
        await instance.put(`/user/fulltime/certification/${certification._id}`, newCertification, {
          headers: {
            access_token: token
          }
        })
      } else {
        await instance.post('/user/fulltime/certification', newCertification, {
          headers: {
            access_token: token
          }
        })

      }
      setVisible(true)
      setLoading(false)
      dispatch(fetchCertifications(token))
      navigation.navigate('MainApp', { screen: 'Profile' })
    } catch (error) {
      console.log(error);
      setMessage('Oops!, Something error')
      setVisible(true)
      setLoading(false)
    }

  }

  return (
    <>
      <View style={styles.container}>
        {visible && <Text>{message}</Text>}
        <View style={styles.form}>
          <View>
            <ILStarColor />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='Certification tittle'
              onChangeText={value => setForm({ ...form, title: value })}
              value={form?.title}
            />
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <ILBarChart />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='Institution name'
              onChangeText={value => setForm({ ...form, institution: value })}
              value={form?.institution}
            />
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <ILCalender />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form 
              type='date'
              placeholder='Start date'
              value={date.date}
              mode={date.mode}
              show={date.show}
              onPress={date.showDatePicker}
              onChange={date.onChange} 
            />
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <ILMenu />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='Certification description'
              onChangeText={value => setForm({ ...form, description: value })}
              value={form?.description}
            />
          </View>
        </View>

        <View style={styles.btn} >
          <Button
            title='Submit'
            type='submit-form'
            onPress={onSubmitAdd}
          />
        </View>
      </View>
      {loading && <Loading />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    elevation: 0,
    paddingHorizontal: 20,
    paddingTop: 62 - 23
  },
  form: {
    flexDirection: 'row',
    marginTop: 23,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  touchable_date: {
    width: 331,
    height: 57,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    paddingLeft: 20,
    justifyContent: 'center'
  },
  btn: {
    marginTop: 87,
    alignItems: 'center'
  }
})


export default FormCertification;
