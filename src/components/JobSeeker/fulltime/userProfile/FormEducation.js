import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useInput } from '../../../../customHook';
import { Button, Form } from '../../../mikro';
import dateConvert from '../../../../helpers/dateConvert';
import { useDispatch, useSelector } from 'react-redux';
import { ILBook, ILCalender, ILMenu, ILStarColor } from '../../../../assets/img/icons';
import axios from 'axios';
import instance from '../../../../config/axios';
import { Loading } from '../../../makro';
import { fetchEducations } from '../../../../store/reducer/educationReducer';

const FormEducation = ({ navigation, token, edit, education }) => {
  const dispatch = useDispatch()

  const [school, setSchool] = useState('')
  const [major, setMajor] = useState('')
  const [faculty, setFaculty] = useState('')
  const startDate = useInput(new Date())
  const endDate = useInput(new Date())
  const [isSwitchEnabled, setSwitch] = useState(false)
  const [getSchool, setGetSchool] = useState([])

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (edit === true) {
      setSchool(education.school)
      setMajor(education.major)
      setFaculty(education.faculty)
    }
    console.log(token);
  }, [education])

  const onChange = (value) => {
    setSchool(value)
    if (!value) {
      setGetSchool([])
    }
    axios
      .get(`http://universities.hipolabs.com/search?name=${value}&country=indonesia`)
      .then(({ data }) => {
        setGetSchool(data)
      })
      .catch(setGetSchool([]))
  }

  const selectSchool = (value) => {
    setSchool(value)
    setGetSchool([])
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      let start_date = dateConvert(startDate.date)
      let end_date = endDate.date
      if (isSwitchEnabled) {
        end_date = 'Current'
      } else {
        end_date = dateConvert(endDate.date)
      }

      const newEducation = {
        school: school,
        major: major,
        faculty: faculty,
        startDate: start_date,
        endDate: end_date
      }

      if (edit === true) {
        await instance.put(`/user/fulltime/education/${education._id}`, newEducation, {
          headers: {
            access_token: token
          }
        })
      } else {
        await instance.post(`/user/fulltime/education`, newEducation, {
          headers: {
            access_token: token
          }
        })
      }

      dispatch(fetchEducations(token))
      navigation.navigate('MainApp', { screen: 'Profile' })
      setVisible(true)
      setLoading(false)
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
        {visible && (
          <Text>{message}</Text>
        )}
        <View style={styles.form}>
          <View>
            <ILStarColor />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='School name'
              onChangeText={(value => onChange(value))}
              value={school}
            />
          </View>
        </View>
        {getSchool?.length > 1 && (
          <SafeAreaView>
            <ScrollView>
              {getSchool.map((item, i) => (
                <TouchableOpacity key={i} style={{ paddingHorizontal: 40, paddingVertical: 5 }} onPress={() => selectSchool(item.name)} >
                  <Text style={{ paddingVertical: 5 }} >{item.name}</Text>
                  <View style={{ height: 1, backgroundColor: '#eeee' }} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>
        )}

        <View style={styles.form}>
          <View>
            <ILBook />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='Major level'
              onChangeText={value => setMajor(value)}
              value={major}
            />
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <ILMenu />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='Faculty'
              onChangeText={value => setFaculty(value)}
              value={faculty}
            />
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <ILCalender />
          </View>
          <View>
            <TouchableOpacity
              onPress={startDate.showDatePicker}
              style={styles.touchable_date}
            >
              <Text>{education.startDate ? education.startDate : dateConvert(startDate.date)}</Text>
            </TouchableOpacity>
            {startDate.show && (
              <DateTimePicker
                testID="dateTimePicker1"
                value={startDate.date}
                mode={startDate.mode}
                is24Hour={true}
                display={'spinner'}
                onChange={startDate.onChange}
              />
            )}
          </View>
        </View>
        <View>
          <Switch
            value={isSwitchEnabled}
            onValueChange={(value) => setSwitch(value)}
            trackColor={{ true: '#FF9901', false: '#EEEEEE' }}
            thumbColor='#FF9901'
            style={{ marginTop: 32 }}
          />
        </View>
        {isSwitchEnabled ? <View></View> :
          <View style={styles.form}>
            <View>
              <ILCalender />
            </View>
            <View>
              <TouchableOpacity
                onPress={endDate.showDatePicker}
                style={styles.touchable_date}
              >
                <Text>{education.endDate ? education.endDate : dateConvert(endDate.date)}</Text>
              </TouchableOpacity>
              {endDate.show && (
                <DateTimePicker
                  testID="dateTimePicker2"
                  value={endDate.date}
                  mode={endDate.mode}
                  is24Hour={true}
                  display={'spinner'}
                  onChange={endDate.onChange}
                />
              )}
            </View>
          </View>
        }
        <View style={styles.btn}>
          <Button
            title='Submit'
            type='submit-form'
            onPress={onSubmit}
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

export default FormEducation;
