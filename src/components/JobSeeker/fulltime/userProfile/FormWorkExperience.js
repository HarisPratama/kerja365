import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useInput } from '../../../../customHook';
import { Button, Form } from '../../../mikro';
import dateConvert from '../../../../helpers/dateConvert';
import { ILBarChart, ILCalender, ILMenu, ILStarColor } from '../../../../assets/img/icons';
import instance from '../../../../config/axios';
import { Loading } from '../../../makro';
import { useDispatch } from 'react-redux';
import { fetchWorkExperiences } from '../../../../store/reducer/workExperienceRedux';

const FormWorkExperience = ({ navigation, token, edit, experience }) => {

  const dispatch = useDispatch()

  const [isSwitchEnabled, setSwitch] = useState(false)

  const [position, setPosition] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const startDate = useInput(new Date())
  const endDate = useInput(new Date())

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (edit === true) {
      setPosition(experience.position)
      setCompany(experience.company)
      setDescription(experience.description)
    }
  }, [experience])

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

      const newExperience = {
        position: position,
        company: company,
        startDate: start_date,
        endDate: end_date,
        description: description
      }

      if (edit === true) {
        await instance.put(`/user/fulltime/experience/${experience._id}`, newExperience, {
          headers: {
            access_token: token
          }
        })
      } else {
        await instance.post('/user/fulltime/experience', newExperience, {
          headers: {
            access_token: token
          }
        })
      }

      dispatch(fetchWorkExperiences(token))
      navigation.navigate('MainApp', { screen: 'Profile' })
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
              placeholder='Position'
              onChangeText={(value => setPosition(value))}
              value={position}
            />
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <ILBarChart />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='Company name'
              onChangeText={value => setCompany(value)}
              value={company}
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
            value={startDate.date}
            mode={startDate.mode}
            show={startDate.show}
            onPress={startDate.showDatePicker}
            onChange={startDate.onChange} 
          />
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
        {isSwitchEnabled ?
          <View></View> :
          <View style={styles.form}>
            <View>
              <ILCalender />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }} >
              <Form
                type='date'
                placeholder='End date'
                value={endDate.date}
                mode={endDate.mode}
                show={endDate.show} 
                onPress={endDate.showDatePicker}
                onChange={endDate.onChange}
              />
            </View>
          </View>
        }
        <View style={styles.form}>
          <View>
            <ILMenu />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }} >
            <Form
              placeholder='Job description'
              onChangeText={value => setDescription(value)}
              value={description}
            />
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


export default FormWorkExperience;
