/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

function Import({ navigation }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const openDocumentPicker = async () => {
        console.log('Ouverture');
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });


            setSelectedImage(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('L\'utilisateur a annulé la sélection de l\'image');
            } else {
                console.log('Erreur lors de la sélection de l\'image :', err);
            }
        }
        console.log(selectedImage);
    };

    const uploadImage = async () => {
      let filename = selectedImage.substr(imagePath.lastIndexOf('/') + 1);
      const reference = storage().ref('images/' + filename);
      await reference.putFile(selectedImage);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.bigBlue}>Image Pour l'annonce AN001</Text>
            <TouchableOpacity onPress={openDocumentPicker}>
                <View>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
                    ) : (
                        <Text>Sélectionner une image</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
              <Text style={styles.buttonText}>Se Connecter</Text>
            </TouchableOpacity>
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


export default Import;
