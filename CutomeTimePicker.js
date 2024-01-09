import React, { useState, Platform } from 'react';
import { View, Text, TouchableOpacity, DatePickerAndroid, DatePickerIOS } from 'react-native';
import Modal from 'react-native-modal';

const CustomTimePicker = ({ isVisible, onClose, onTimeSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showDatePickerAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: selectedDate,
        mode: 'spinner',
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedTime = new Date(year, month, day, selectedDate.getHours(), selectedDate.getMinutes());
        setSelectedDate(selectedTime);
        onTimeSelected(selectedTime);
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  const handleTimeChange = (event, date) => {
    if (Platform.OS === 'ios') {
      setSelectedDate(date);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{ backgroundColor: 'white', padding: 16 }}>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>Select Time</Text>
        {Platform.OS === 'ios' ? (
          <DatePickerIOS
            mode="time"
            date={selectedDate}
            onDateChange={(date) => setSelectedDate(date)}
          />
        ) : (
          <TouchableOpacity onPress={showDatePickerAndroid}>
            <Text style={{ fontSize: 18 }}>{selectedDate.toLocaleTimeString()}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onTimeSelected(selectedDate)} style={{ marginTop: 16 }}>
          <Text style={{ color: 'blue' }}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomTimePicker;
