import React, { useState } from 'react'

export default function useInput() {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatePicker = () => {
    showMode('date')
  }
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
}
  return {
    date,
    showDatePicker,
    show,
    mode,
    onChange
  }
}
