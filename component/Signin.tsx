/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function Sign({ navigation }) {
  const [email, setEmail] = useState('');

  const handleEmailChange = (mail) => {
    setEmail(mail);
  };

  const [password, setPassword] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://10.0.2.2:8080/user/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email ,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.token) {
      await AsyncStorage.setItem('token', data.token);
      navigation.navigate('Home');
    } else {
      setMessage('Unauthorized request');
    }
  };
  return (
        <View style={styles.container}>
          <Text style={styles.bigBlue}>Sign in</Text>
          <View style={styles.inputContents}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#ccc7d0"
              onChangeText={handleEmailChange}
              value={email}
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Mot de passe"
              placeholderTextColor="#ccc7d0"
              onChangeText={handlePasswordChange}
              value={password}
            />
            <Text style={styles.forget}>Mot de Passe oublié?</Text>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Se Connecter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bottom}>
            <Text style={styles.forget}>Pas encore membre?</Text>
            <Text style={styles.signup} onPress={() => navigation.navigate('Signup')}>Créer un compte</Text>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 75,
        height: 680,
    },
    bigBlue: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    red: {
        color: 'red',
    },
    inputContents: {
        marginTop: 100,
    },
    input: {
        height: 65,
        width: 350,
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 23,
        backgroundColor: 'white',
        fontSize: 16,
        color: 'black',
        paddingLeft: 30,
    },
    forget: {
        textAlign: 'center',
        marginTop: 20,
    },
    button: {
        height: 55,
        width: 350,
        marginTop: 20,
        marginLeft: 23,
        borderRadius: 40,
        backgroundColor: 'blue',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        paddingTop: 12,
        fontSize: 20,
    },
    bottom: {
        bottom: -145,
    },
    signup: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
});


export default Sign;
