// TimetableScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB } from './FirebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const TimetableScreen = ({ selectedDate }) => {
  const navigation = useNavigation();
  const [workerAvailability, setWorkerAvailability] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        console.log('Fetching availability for date:', selectedDate);
    
        const availabilityCollection = collection(FIRESTORE_DB, 'availability');
        const availabilityQuery = query(availabilityCollection, where('date', '==', selectedDate));
    
        const querySnapshot = await getDocs(availabilityQuery);
    
        if (!querySnapshot.empty) {
          const availabilityData = querySnapshot.docs[0].data().dates;
          console.log('Worker Availability:', availabilityData);
          setWorkerAvailability(availabilityData);
        } else {
          console.log('No Availability Data for the selected date.');
          setWorkerAvailability([]);
        }
      } catch (error) {
        console.error('Error fetching availability: ', error);
      }
    };
    
    

    fetchAvailability();
  }, [selectedDate]);

  console.log('Worker Availability:', workerAvailability);

  const renderAppointments = () => {
    if (workerAvailability.length === 0) {
      return <Text>No availability for the selected date.</Text>;
    }

    return workerAvailability.map((appointment, index) => (
      <View key={index} style={styles.appointmentContainer}>
        <Text style={styles.time}>{appointment.time}</Text>
        <View style={styles.verticalStripe} />
        <View style={styles.appointmentDetails}>
          <Text style={styles.name}>{appointment.name}</Text>
          <Text style={styles.details}>{appointment.details}</Text>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.dayContainer}>
        <Text style={styles.day}>{moment(selectedDate).format('dddd')} ({selectedDate})</Text>
        {renderAppointments()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dayContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  appointmentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  verticalStripe: {
    height: '100%',
    width: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  appointmentDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
  },
});

export default TimetableScreen;
