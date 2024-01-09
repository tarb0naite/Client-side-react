import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image, ToastAndroid  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { createUserWithEmailAndPassword, getAuth, updateProfile  } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_APP } from './FirebaseConfig';

function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [checkbox1, setCheckbox1] = useState(false);

    const navigation = useNavigation();
    const auth = getAuth(FIREBASE_APP);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(
          message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      };

      const handleRegister = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        if (!email || !username || !password || !repeatPassword) {
          showToast('Please fill in all fields.');
        } else if (password !== repeatPassword) {
          showToast('Passwords do not match.');
        } else if (!checkbox1) {
          showToast('Please agree to the Terms and Conditions.');
        } else if (!emailRegex.test(email)) {
          showToast('Please enter a valid email address.');
        } else {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            await updateProfile(user, { displayName: username });
      
            await addDoc(collection(FIRESTORE_DB, 'users'), {
              uid: user.uid,
              username,
              email,
            });
      
            setEmail(''); 
            setUsername('');
            setPassword('');
            setRepeatPassword('');
            setCheckbox1(false);
      
            navigation.navigate('LogIn');
          } catch (error) {
            console.error('Error during registration:', error);
      
            if (error.code === 'auth/email-already-in-use') {
              alert('Email already in use');
            } else {
              showToast('Registration failed. Please try again.');
            }
          }
        }
      };
      
      
      


      return (
        <ImageBackground
          source={require('./images/steel-wrenches-tools.jpg')}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <Text style={styles.header}>Create an account</Text>
    
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
    
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Username:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your username"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
    
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Password:</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                    <Image
                      source={showPassword ? require('./images/eye.png') : require('./images/eye-crossed.png')}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
    
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Repeat password:</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Repeat your password"
                    value={repeatPassword}
                    onChangeText={(text) => setRepeatPassword(text)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                    <Image
                      source={showPassword ? require('./images/eye.png') : require('./images/eye-crossed.png')}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
    
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={checkbox1 ? 'checked' : 'unchecked'}
                  onPress={() => setCheckbox1(!checkbox1)}
                  color="white"
                  uncheckedColor="white"
                />
                <Text style={styles.checkboxLabel}>Agree with Terms and Conditions</Text>
              </View>
    
              <TouchableOpacity onPress={handleRegister} style={[styles.button, { marginTop: 20 }]}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      );
    }

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      
      marginBottom: 50,
      color: '#FFFFFF',
    },
   
    description: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 150,
      paddingHorizontal: 20,
      color: '#FFFFFF',
    },
    inputContainer: {
      width: '100%',
      maxWidth: 400,
    },
    inputWrapper: {
      marginBottom: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 8,
    },
    label: {
      fontSize: 16,
      marginLeft: 10,
      marginTop: 5,
      color: '#333333',
    },
    input: {
      width:300,
      height: 40,
      paddingHorizontal: 10,
      color: '#333333',
    },
    passwordInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    passwordInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      color: '#333333',
    },
    eyeIconContainer: {
      padding: 10,
    },
    eyeIcon: {
      width: 20,
      height: 20,
      tintColor: '#5D8AA8',
    },
    button: {
      padding: 15,
      backgroundColor: '#5D8AA8',
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      
      },
      checkboxLabel: {
        marginLeft: 8,
        color: 'white',
      },
    });
export default Register;