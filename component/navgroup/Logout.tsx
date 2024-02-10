/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

function LogOut(){
    const navigation = useNavigation();
    const handleLogout = async () => {
        try {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('userId');
          navigation.navigate('Signin');
        } catch (error) {
          console.error('Erreur lors de la suppression des valeurs :', error);
        }
    };
    handleLogout();
}
export default LogOut;
