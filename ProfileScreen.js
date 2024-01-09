import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';
import LogInScreen from './LogInScreen'; 

function ProfileScreen() {
  const navigation = useNavigation();
  const { logout, isLoggedIn } = useAuth(); 
  const handleNavigateToUpdates = () => {
    navigation.navigate('CarRepair');
  };

  const handleNavigateToHistory = () => {
    navigation.navigate('CarHistory');
  };

  const handleLogOut = () => {
    logout();
  };

  if (!isLoggedIn) {
    return <LogInScreen />;
  }

  return (
    <View style={styles.container}>
    


      <TouchableOpacity onPress={handleNavigateToUpdates} style={styles.button}>
        <Text style={styles.buttonText}>Check Car Repair Updates</Text>
      </TouchableOpacity>

      
      <TouchableOpacity onPress={handleLogOut} style={[styles.button, { marginTop: 10 }]}>
        <Text style={styles.buttonText}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ProfileScreen;
