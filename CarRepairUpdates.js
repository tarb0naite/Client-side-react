import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { FIRESTORE_DB } from './FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { getAuth } from 'firebase/auth';

function CarRepairUpdates({ navigation }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [comments, setComments] = useState('');
  const [appointments, setAppointments] = useState([]);
  const { isLoggedIn } = useAuth();
  const [currentUserUsername, setCurrentUserUsername] = useState('');
  const [appointmentStatuses, setAppointmentStatuses] = useState([]);

  const getStatusData = (status) => {
    const statusMappings = {
      inspection: { color: 'green', icon: require('./icons/inspection.png') },
      working: { color: 'yellow', icon: require('./icons/maintenance.png') },
      finished: { color: 'blue', icon: require('./icons/complete.png') },
      unknown: { color: 'white', icon: null },
    };

    return statusMappings[status] || statusMappings.unknown;
  };
  
  

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const currentUser = getAuth().currentUser;

        if (currentUser) {
          const loggedInUserData = {
            id: currentUser.uid,
            username: currentUser.displayName || 'User',
          };

          console.log('Logged In User:', loggedInUserData);
          setCurrentUserUsername(loggedInUserData.username);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error.message);
      }
    };

    if (isLoggedIn) {
      fetchLoggedInUser();
    }
  }, [isLoggedIn]); 

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        console.log('Fetching user appointments...');
        const appointmentsCollection = collection(FIRESTORE_DB, 'appointments');
        const appointmentsSnapshot = await getDocs(appointmentsCollection);

        const userAppointments = [];
        const uniqueStatuses = new Set();

        appointmentsSnapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.date && data.date.toDate ? moment(data.date.toDate()).format('YYYY-MM-DD') : data.date;

          const appointmentUsername = Array.isArray(data.username) ? data.username[0] : data.username;
          if (appointmentUsername && appointmentUsername.username === currentUserUsername) {
            userAppointments.push({
              id: doc.id,
              date: date,
              time: data.time,
              model: data.model,
              subService: data.subService,
              firstName: data.firstName,
              lastName: data.lastName,
              comments: data.comments,
              status: data.status || 'unknown',
            });

            uniqueStatuses.add(data.status);
          }
        });

        userAppointments.sort((a, b) => moment(a.date) - moment(b.date));

        console.log('User Appointments:', userAppointments);
        setAppointments(userAppointments);
        setAppointmentStatuses(Array.from(uniqueStatuses));
      } catch (error) {
        console.error('Error fetching user appointments:', error.message);
      }
    };

    if (isLoggedIn) {
      fetchUserAppointments();
    }
  }, [isLoggedIn, currentUserUsername]);

  const handleAppointmentSelection = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <ScrollView style={styles.container}>
      {appointments.map((appointment) => (
        <View key={appointment.id}>
          <TouchableOpacity
            style={styles.appointmentContainer}
            onPress={() => handleAppointmentSelection(appointment)}
          >
            <Text style={styles.day}>{moment(appointment.date).format('dddd, MMMM Do')}</Text>
            <Text style={styles.time}>{appointment.time}</Text>
            <Text style={styles.name}>{appointment.model}</Text>
            <Text style={styles.details}>{appointment.subService}</Text>
            <Text style={styles.details}>Comments left by workers:</Text>
            <Text style={styles.details}>{appointment.comments}</Text>
          </TouchableOpacity>

          <View style={styles.circleContainer}>
            {['inspection', 'working', 'finished'].map((status, index) => (
              <View
                key={index}
                style={[
                  styles.circle,
                  {
                    backgroundColor: getStatusData(status).color,
                  },
                ]}
              >
                {getStatusData(status).icon && (
                  <Image source={getStatusData(status).icon} style={styles.icon} />
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appointmentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
    marginBottom: 16,
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5D8AA8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 30,
    height: 5,
    backgroundColor: '#5D8AA8',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default CarRepairUpdates;
