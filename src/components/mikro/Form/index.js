import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default function Form({ icon, placeholder, onChangeText, value, multiline }) {

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
  })
})
