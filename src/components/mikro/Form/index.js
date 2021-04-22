import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import dateConvert from '../../../helpers/dateConvert';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Form({ 
  icon, 
  placeholder, 
  onChangeText, 
  value, 
  multiline, 
  type,
  mode,
  onChange,
  show,
  onPress 
}) {

  if(type === 'date'){
    return (
      <View>
        <TouchableOpacity  
            onPress={onPress}
            style={styles.touchable_date}
        >
            {dateConvert(new Date()) === dateConvert(value) ? 
                <Text style={{
                        color: '#c6c6c6', 
                        fontSize: 14, 
                        fontFamily: 'DMSans-Regular'
                  }}
                >
                  {placeholder}
                </Text> : <Text style={{color: 'black'}}>{dateConvert(value)}</Text> }
        </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker1"
                value={value}
                mode={mode}
                is24Hour={true}
                display={'default'}
                onChange={onChange}
                
                />
            )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.form(multiline)}
        placeholder={placeholder}
        placeholderTextColor='#c4c4c4'
        onChangeText={onChangeText}
        value={value}
        multiline={multiline}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  form: (multiline) => ({
    flex: 1,
    height: multiline ? 150 : 57,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    paddingLeft: 20,
    textAlignVertical: multiline ? 'top' : 'center',
    paddingVertical: multiline ? 20 : 0,
    color: 'black'
  }),
  touchable_date: {
    width: 331,
    height: 57,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    paddingLeft: 20,
    justifyContent: 'center'
  },
})
