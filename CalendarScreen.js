import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

function CalendarScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={{
          '2024-01-10': { selected: true, marked: true, selectedColor: 'blue' },
          '2024-01-15': { marked: true },
        
        }}
      />
    </View>
  );
}

export default CalendarScreen;
