import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SubmitButton ({onPress}) {
  return (
    <TouchableOpacity
      style={styles.btn_submit}
      onPress={onPress}
    >
      <Text style={styles.text_submit}>Submit</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn_submit: {
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF9901',
    alignSelf: 'center', 
    justifyContent: 'center',
    alignItems: 'center',
    top: 300
   },
   text_submit: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'DMSans_400Regular'
  }
})
