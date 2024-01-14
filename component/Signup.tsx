/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signup({ navigation }) {

  const [email, setEmail] = useState('');

  const handleEmailChange = (mail) => {
    setEmail(mail);
  };

  const [password, setPassword] = useState('');

  const handlePasswordChange = (pass) => {
    setPassword(pass);
  };

  const [nom, setNom] = useState('');

  const handleNameChange = (text) => {
    setNom(text);
  };

  const [prenom, setPrenom] = useState('');

  const handleLastNameChange = (text) => {
    setPrenom(text);
  };

  const [phone, setPhone] = useState('');

  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    const formattedDate = currentDate.toISOString().split('T')[0];
    const dateObject = new Date(formattedDate); // Convertir la chaîne en objet Date
    setDate(dateObject);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  /*const showTimepicker = () => {
    showMode('time');
  };*/

  const handleSubmit = async () => {
    const response = await fetch('http://10.0.2.2:8080/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        date_naissance: date,
        email: email,
        phone: phone,
        password: password,
      }),
    });
    const data = await response.json();
    if (data.token) {
      await AsyncStorage.setItem('token', data.token);
      navigation.navigate('Home');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bigBlue}>Inscription</Text>
        <View style={styles.inputContents}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#ccc7d0"
            onChangeText={handleNameChange}
            value={nom}
          />
          <TextInput
            style={styles.input}
            placeholder="Prenom"
            placeholderTextColor="#ccc7d0"
            onChangeText={handleLastNameChange}
            value={prenom}
          />
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
            keyboardType="phone-pad"
            placeholder="Phone"
            placeholderTextColor="#ccc7d0"
            onChangeText={handlePhoneChange}
            value={phone}
          />
          <TouchableOpacity style={styles.input} onPress={showDatepicker}>
            <Text>Date de naissance</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Mot de passe"
            placeholderTextColor="#ccc7d0"
            onChangeText={handlePasswordChange}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
            <Text style={styles.signing} onPress={() => navigation.navigate('Signing')}>Se connecter</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop: 10,
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
      marginTop: 50,
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
  signing: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 25,
      textAlign: 'center',
  },
});

export default Signup;
