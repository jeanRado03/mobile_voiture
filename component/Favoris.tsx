/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { View, ScrollView,Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderOne from './navgroup/HeaderOne';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Annonce() {
    const [ token, setToken ] = useState(null);
  const [ userId, setUserId ] = useState(null);
  const navigation = useNavigation();
  const [annonce, setAnnonces] = useState([]);
  

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
    fetch('https://s5backendcloudventevoiture-production.up.railway.app/favori/' + userId, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
        .then(res => res.json())
        .then(
            (data) => {
                setAnnonces(data.donnee);
            },
            (error) => {
                console.log(error);
            }
        );
  }, []);
  return (
          <View>
                      <HeaderOne />
                      <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.heading}>
                          <Text style={styles.headingText}>Accueil</Text>
                        </View>
                            {annonce.map(list =>(
                              <View style={styles.item}>
                                <View style={styles.itemContent}>
                                  <Image source={require('../assets/image/Car_Sell-3-removebg-preview.png')} style={styles.itemImage} />
                                  <View style={styles.itemDetails}>
                                    <Text style={styles.marqueText}>Marque : {list.vehicule.modele.marque.nom_marque}</Text>
                                    <Text>Modele : {list.vehicule.modele.nom_modele}</Text>
                                    <Text>Année de Fabrication : {list.vehicule.annee_fabrication}</Text>
                                    <Text>Type : {list.vehicule.categorie.nom_categorie}</Text>
                                    <Text>Prix : {list.prix}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('galerie',{ annonce: list })}>
                                        <Text style={styles.downloadLink}>Details</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            ))}
                      </ScrollView>
                  </View>
      );
  }

  const styles = StyleSheet.create({
        container: {
          padding: 10,
          alignItems: 'center',
        },
        heading: {
          marginBottom: 10,
        },
        headingText: {
          fontSize: 20,
          fontStyle: 'italic',
        },
        marqueText: {
          fontSize: 18,
        },
        item: {
          marginBottom: 30,
        },
        itemContent: {
          fontSize: 20,
          flexDirection: 'row',
        },
        itemImage: {
          width: 200,
          height: 200,
          marginRight: 10,
        },
        itemDetails: {
          height: 200,
          fontSize: 12,
        },
        downloadLink: {
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          marginTop: 10,
        },
        button: {
          height: '25%',
          width: '100%',
          marginTop: '15%',
          borderRadius: 40,
          backgroundColor: '#3499cb',
        },
});



export default Annonce;