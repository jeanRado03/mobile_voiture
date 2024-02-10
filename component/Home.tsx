/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, ScrollView,Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from './navgroup/Header';
import { useNavigation } from '@react-navigation/native';

function Home() {

  const navigation = useNavigation();

  const [annonce, setAnnonces] = useState([]);

  useEffect(() => {
    fetch('https://s5backendcloudventevoiture-production.up.railway.app/annonce/getAnnoncesValidees', {
      method: 'GET',
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
                    <Header />
                    <ScrollView contentContainerStyle={styles.container}>
                      <View style={styles.heading}>
                        <Text style={styles.headingText}>Annonces</Text>
                      </View>
                          {annonce.map(list =>(
                            <View style={styles.item}>
                              <View style={styles.itemContent}>
                                <TouchableOpacity onPress={() => navigation.navigate('detail',{ annonce: list })}><Image source={require('../assets/image/Car_Sell-3-removebg-preview.png')} style={styles.itemImage}/></TouchableOpacity>
                                <View style={styles.itemDetails}>
                                  <Text style={styles.marqueText}>Marque : {list.vehicule.modele.marque.nom_marque}</Text>
                                  <Text>Modele : {list.vehicule.modele.nom_modele}</Text>
                                  <Text>Année de Fabrication : {list.vehicule.annee_fabrication}</Text>
                                  <Text>Type : {list.vehicule.categorie.nom_categorie}</Text>
                                  <Text>Prix : {list.prix}</Text>
                                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('detail',{ annonce: list })}>
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

export default Home;
