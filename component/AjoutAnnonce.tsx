/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signup({ navigation }) {
  const [ token, setToken ] = useState(null);
  const [ userId, setUserId ] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [vehicule, setVehicules] = useState([]);

  useEffect(() => {
    const getTokenAndUserId = async () => {
      try {
        const tokens = await AsyncStorage.getItem('token');
        const userID = await AsyncStorage.getItem('userId');
        console.log(tokens);
        console.log(userID);
    
        // Utilisez les valeurs comme bon vous semble (par exemple, les afficher dans votre écran)
        setToken(tokens);
        setUserId(userID);
      } catch (error) {
        console.error('Erreur lors de la récupération des valeurs :', error);
      }
    };
    getTokenAndUserId();
    fetch('https://s5backendcloudventevoiture-production.up.railway.app/vehicule', {
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
    try {
      const response = await fetch('https://s5backendcloudventevoiture-production.up.railway.app/annonce', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicule: {
            id_vehicule: id_vehicule,
          },
          utilisateur: {
            id_user: userId,
          },
          prix: prix,
          etat: etat,
          description: description,
        }),
      });
  
      if (!response.ok) {
        // Gérez l'erreur ici (par exemple, affichez-la dans la console)
        console.error('Erreur lors de la requête:', response.status, response.statusText);
      } else {
        // La requête a réussi, continuez avec votre logique
        navigation.navigate('Home');
      }
    } catch (error) {
      // Gérez les erreurs liées à la connexion réseau, etc.
      console.error('Erreur lors de la requête:', error);
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.bigBlue}>Créer une Annonce</Text>
        <View style={styles.inputContents}>
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
