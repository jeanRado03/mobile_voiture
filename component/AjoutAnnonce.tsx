/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';

function Signup({ navigation }) {

  const [modalVisible, setModalVisible] = useState(false);

  const [vehicule, setVehicules] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8080/vehicule', {
      method: 'GET',
    })
        .then(res => res.json())
        .then(
            (data) => {
                setVehicules(data.donnee);
            },
            (error) => {
                console.log(error);
            }
        );
  }, []);

  const [id_user, setIdUser] = useState('');

  const handleUserChange = (id_user) => {
    setIdUser(id_user);
  };

  const [id_vehicule, setIdVehicule] = useState('vehicule');

  const handleVehiculeChange = (id_vehicule) => {
    setIdVehicule(id_vehicule);
  };

  const [prix, setPrix] = useState(0);

  const handlePrixChange = (prix) => {
    setPrix(prix);
  };

  const [etat, setEtat] = useState(0);

  const handleEtatChange = (text) => {
    setEtat(text);
  };

  const [description, setDescription] = useState('');

  const handleDescriptionChange = (description) => {
    setDescription(description);
  };

  /*const showTimepicker = () => {
    showMode('time');
  };*/

  const handleSubmit = async () => {
    const response = await fetch('http://10.0.2.2:8080/annonce', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vehicule: {
          id_vehicule: id_vehicule,
        },
        utilisateur: {
          id_user: id_user,
        },
        prix: prix,
        etat: etat,
        description: description,
      }),
    });
    navigation.navigate('Home');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bigBlue}>Créer une Annonce</Text>
        <View style={styles.inputContents}>
          <TextInput
            style={styles.input}
            placeholder="User"
            placeholderTextColor="#ccc7d0"
            onChangeText={handleUserChange}
            value={id_user}
          />
          <TouchableHighlight
            onPress={() => setModalVisible(true)}
            style={styles.input}
          >
            <Text style={styles.textstyle}>{id_vehicule}</Text>
          </TouchableHighlight>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.inputselect}>
              {vehicule.map(option => (
                <TouchableHighlight
                  style={styles.input}
                  key={option.immatricule}
                  onPress={() => {
                    setIdVehicule(option.id_vehicule);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.textstyle}>{option.immatricule}</Text>
                </TouchableHighlight>
              ))}
            </View>
          </Modal>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Prix"
            placeholderTextColor="#ccc7d0"
            onChangeText={handlePrixChange}
            value={prix}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Etat"
            placeholderTextColor="#ccc7d0"
            onChangeText={handleEtatChange}
            value={etat}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#ccc7d0"
            onChangeText={handleDescriptionChange}
            value={description}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
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
  inputselect: {
    marginTop: '55%',
    width: '90%',
    marginLeft: '5%',
    backgroundColor: 'white',
  },
  textstyle: {
    marginTop: '2%',
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
