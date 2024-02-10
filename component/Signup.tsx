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
    const response = await fetch('https://s5backendcloudventevoiture-production.up.railway.app/user/register', {
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 20,
  },
  inputContents: {
    width: '100%',
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
  signing: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default Signup;
