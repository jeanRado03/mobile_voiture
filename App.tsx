/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signing from './component/Signin';
import Signup from './component/Signup';
import Home from './component/Home';
//import { ScrollView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {


  return (
    <SafeAreaView style={styles.bodyContainer}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={Signing} name="Signing" options={{headerShown:false}} />
            <Stack.Screen component={Signup} name="Signup" />
            <Stack.Screen component={Home} name="Home" options={{headerShown:false}} />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#d7d3da',
    height: '100%',
  },
});

export default App;
