import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ServicesScreen from './ServicesScreen';
import CalendarScreen from './CalendarScreen';
import ProfileScreen from './ProfileScreen';
import RegisterCarScreen from './RegisterCarScreen';
import CarModel from './CarModel';
import { BrandProvider } from './BrandContext';
import CarRepairUpdates from './CarRepairUpdates';
import CarRepairHistory from './CarRepairHistory'
import LogIn from './LogInScreen';
import Register from './RegisterScreen';
import { AuthProvider } from './AuthContext';
import { SubServiceProvider } from './context';
import {CarProvider} from './carContext'
import {CarBrandProvider} from './contextBrand'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="RegisterCar" component={RegisterCarScreen} />
      <Stack.Screen name="CarModel" component={CarModelStack} />
      <Stack.Screen name="LogIn" component={LogIn}/>

    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="CarRepair" component={CarRepairUpdates} />
      <Stack.Screen name="CarHistory" component={CarRepairHistory} />
      <Stack.Screen name="LogIn" component={LogIn}/>
      <Stack.Screen name="Register" component={Register}/>
     
    </Stack.Navigator>
  );
}


function CarModelStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Models" component={CarModel} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <BrandProvider>
      <AuthProvider>
      <SubServiceProvider>
      <CarBrandProvider>
      <CarProvider>
 <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#5D8AA8',
          },
          headerTintColor: '#FFFFFF',
          tabBarStyle: {
            backgroundColor: '#5D8AA8',
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#A0A0A0',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Services') {
              iconName = require('./icons/car-service.png');
            } else if (route.name === 'Profile') {
              iconName = require('./icons/user.png');
            }

            return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
          },
        })}
      >
        <Tab.Screen name="Service" component={MainStack} />
    
        <Tab.Screen name="Profiles" component={ProfileStack} />
      </Tab.Navigator>
      
    </NavigationContainer>
    </CarProvider>
    </CarBrandProvider>
    </SubServiceProvider>
    </AuthProvider>
    </BrandProvider>
   
  );
}