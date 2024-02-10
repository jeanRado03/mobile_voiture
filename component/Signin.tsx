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
    const response = await fetch('https://s5backendcloudventevoiture-production.up.railway.app/user/authenticate', {
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
      await AsyncStorage.setItem('userId', data.userId);
      navigation.navigate('Home');
    } else {
      setMessage('Unauthorized request');
    }
  };

  const annonce = async () => {
    navigation.navigate('Annonce');
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
            <Text style={styles.forget} onPress={annonce}>Mot de Passe oublié?</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  inputContents: {
    marginTop: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  forget: {
    color: 'gray',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  signup: {
    color: 'blue',
    marginTop: 10,
    marginLeft: 5,
  },
});


export default Sign;
