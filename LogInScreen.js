import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image, ToastAndroid } from 'react-native';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'; 

function LogIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await new Promise(resolve => setTimeout(resolve, 1000)); 
  
      login();
      navigation.navigate('Profile');
      const username = user.displayName || 'User';
      ToastAndroid.show(`Welcome in ${username}`, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error signing in:', error.message);
      ToastAndroid.show('Wrong email or password', ToastAndroid.SHORT);
    }
  };
  
  
  

  return (
    <ImageBackground
      source={require('./images/steel-wrenches-tools.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
      <Text style={styles.header}>Please Log in</Text>
        <Text style={styles.description}>
          When you log in or create an account, you can see your car repair updates and history.
        </Text>
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

          <TouchableOpacity onPress={handleLogin} style={[styles.button, { marginTop: 20 }]}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleRegister} style={[styles.createAccount, { marginTop: 20 }]}>
            <Text style={styles.buttonText}>Don't have an account? Create one</Text>
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
    marginBottom: 10,
    color: '#FFFFFF',
  },
  createAccount: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
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
});

export default LogIn;