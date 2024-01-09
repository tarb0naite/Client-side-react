import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert , ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { useSubService } from './context';
import {useCar} from './carContext'
import moment from 'moment';
import { useAuth } from './AuthContext';
import { getAuth } from 'firebase/auth';



import { FIRESTORE_DB, FIREBASE_APP } from './FirebaseConfig';
import { collection, doc, updateDoc, getDocs, getDoc, addDoc } from 'firebase/firestore';

import {useBrandService} from './contextBrand'


const CarModel = ({ route }) => {
  const navigation = useNavigation();
  const [manualTime, setManualTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); 
  const [username, setUsername] = useState('');

  const { isLoggedIn } = useAuth(); 
  const [userData, setUserData] = useState(null); 
  const auth = getAuth(FIREBASE_APP);


  const { selectedSubService } = useSubService();
  console.log('Selected SubService in CarModel screen:', selectedSubService);

  const {selectedModel} = useCar();
  console.log("Car brand model in Model sreen:", selectedModel)

  const {selectedBrand} = useBrandService();
  console.log("Car brand name in Model sreen:", selectedBrand)


  useEffect(() => {
    console.log('CarModel component re-rendered');
  }, [selectedSubService]);


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
          setUserData([loggedInUserData]);
          setUsername(loggedInUserData.username);
        }
      } catch (error) {
        console.error('Error fetching logged-in user:', error.message);
      }
    };
  
    fetchLoggedInUser();
  }, []);
  
  
  
  const handleSubmit = async () => {
    try {
      const appointmentsCollection = collection(FIRESTORE_DB, 'appointments');
  
      if (isLoggedIn) {
        console.log('Before addDoc call:', {
          selectedModel,
          selectedSubService,
          selectedDate,
          manualTime,
          username: userData,
        });
  
        await addDoc(collection(FIRESTORE_DB, 'appointments'), {
          model: selectedModel,
          subService: selectedSubService,
          date: selectedDate,
          time: manualTime,
          username: userData,
        });
  
        console.log('After addDoc call - Success');
        Alert.alert('Success', 'Appointment has been made!', [
          {
            text: 'OK',
            onPress: () => {
              setManualTime('');
              setSelectedDate(moment().format('YYYY-MM-DD'));
              navigation.goBack();
            },
          },
        ]);
      } else {
        Alert.alert(
          'Not Logged In',
          'You are not logged in. Do you want to log in or continue without providing a phone number?',
          [
            {
              text: 'Log In',
              onPress: () => {
                navigation.navigate('LogIn');
              },
            },
            {
              text: 'Continue',
              onPress: async () => {
                const placeholderUsername = 'Not Provided';
  
                await addDoc(collection(FIRESTORE_DB, 'appointments'), {
                  model: selectedModel,
                  subService: selectedSubService,
                  date: selectedDate,
                  time: manualTime,
                  username: placeholderUsername,
                });
  
                // Show a success alert
                Alert.alert('Success', 'Appointment has been made!', [
                  {
                    text: 'OK',
                    onPress: () => {
                      setManualTime('');
                      setSelectedDate(moment().format('YYYY-MM-DD'));
                      navigation.goBack();
                    },
                  },
                ]);
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('Error pushing data to Firestore:', error.message);
      Alert.alert('Error', 'Failed to make an appointment. Please try again.');
    }
  };
  

  

 

  
  const handleCarBrandPress = () => {
    navigation.navigate('RegisterCar');
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  }

  return (
    <ScrollView>
      <View>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Image source={require('./icons/back-button.png')} style={{ width: 30, height: 30 }} />
            <Text>Back</Text>
          </TouchableOpacity>
        </View>

       

        <View style={styles.inputContainer}>

  
  <TouchableOpacity
  onPress={handleCarBrandPress}

  style={styles.button}
>
        <Text style={styles.buttonText}>Press here to select car</Text>

 
</TouchableOpacity>

  <Text style={styles.label}>Model:</Text>
  <Text style={styles.subServiceText}> {selectedModel} </Text>

  <Text style={styles.label}>Selected SubService:</Text>
  <Text style={styles.subServiceText}>{selectedSubService}</Text>
</View>


<View>
<TextInput
  style={styles.input}
  placeholder="HH:mm"
  keyboardType="numeric"
  maxLength={5} 
  value={manualTime}
  onChangeText={(text) => {
    if (text.length <= 2) {
      setManualTime(text);
    } else if (text.length === 3 && text[2] !== ':') {
      setManualTime(text.slice(0, 2) + ':' + text.slice(2));
    } else if (text.length > 3) {
      const formattedTime = text.slice(0, 5);
      const [hours, minutes] = formattedTime.split(':');
      const isValidTime = !isNaN(hours) && !isNaN(minutes) && hours >= 8 && hours <= 18 && minutes >= 0 && minutes <= 59;

      if (isValidTime) {
        setManualTime(formattedTime);
      } else {
        Alert.alert('Invalid Time', 'Please enter a time between 8:00 and 18:00.');
      }
    } else {
      setManualTime(text);
    }
  }}
/>



</View>


<View>
          <Text style={styles.title}>Car Model Calendar</Text>
          <Calendar
            markedDates={{
              [selectedDate]: { selected: true, marked: true },
            }}
            onDayPress={handleDayPress}
          />
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: -10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    backgroundColor:'#5D8AA8',
    marginBottom: 5,
    marginTop:10,
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#5D8AA8',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarModel;
