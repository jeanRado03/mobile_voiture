/* eslint-disable prettier/prettier */
import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const DetailAnnonce = ({ navigation }) => {
  const route = useRoute();
  const { annonce } = route.params;
  const handleBuy = async () => {
    const response = await fetch('http://10.0.2.2:8080/favori/USR014/' + annonce.id_annonce, {
      method: 'POST'});
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.bigBlue}>Détails du véhicule</Text>
      <ScrollView horizontal >
        <Image source={require('../assets/image/Car_Sell-3-removebg-preview.png')} style={styles.image} />
        <Image source={require('../assets/image/Car_Sell-3-removebg-preview.png')} style={styles.image} />
      </ScrollView>
      <View style={styles.imageContainer}>
          <Text>Marque : {annonce.vehicule.modele.marque.nom_marque}</Text>
          <Text>Modèle : {annonce.vehicule.modele.nom_modele}</Text>
          <Text>Immatricule : {annonce.vehicule.immatricule}</Text>
          <Text>Année de fabrication : {annonce.vehicule.annee_fabrication}</Text>
          <Text>Nombre de siège : {annonce.vehicule.nombre_sieges}</Text>
          <Text>poids : {annonce.vehicule.masse_vehicule}</Text>
          <Text>Boite : {annonce.vehicule.boite.nom_boite}</Text>
          <Text>Type de carburant : {annonce.vehicule.carburant.nom_carburant}</Text>
          <Text>Catégorie : {annonce.vehicule.categorie.nom_categorie}</Text>
          <Text>Moteur : {annonce.vehicule.moteur.nom_moteur}</Text>
          <Text>Puissance du moteur : {annonce.vehicule.moteur.puissance}</Text>
          <TouchableOpacity style={styles.button} onPress={handleBuy}>
             <Text style={styles.downloadLink}>Ajouter au favoris</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
      marginBottom: 20,
    },
  imageContainer: {
    height: '60%',
    alignContent: 'flex-start',
  },
  image: {
    width: 380, // Ajustez la largeur de l'image selon vos besoins
    height: 200, // Ajustez la hauteur de l'image selon vos besoins
    marginHorizontal: 10, // Espacement horizontal entre les images
  },
  downloadLink: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 45,
  },
  button: {
    height: '25%',
    width: '100%',
    marginTop: '15%',
    borderRadius: 40,
    backgroundColor: '#3499cb',
  },
});

export default DetailAnnonce;