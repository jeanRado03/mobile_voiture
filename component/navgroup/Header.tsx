/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Header(){
  const navigation = useNavigation();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const [search, setSearch] = useState('');

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const submiting = async () => {
    console.log(search);
  };

  return (
    <View style={ styles.headergroup }>
      <TouchableOpacity onPress={toggleMenu}>
        <Image source={require('./menu.png')} style={ styles.menubutton } />
      </TouchableOpacity>

      {menuOpen && (
        <View style={styles.menugroupe}>
          <Text onPress={() => navigation.navigate('Signin')}>Login</Text>
          <Text onPress={() => navigation.navigate('AjoutAnnonce')}>Annonce</Text>
          <Text onPress={() => navigation.navigate('upload')}>UploadImage</Text>
          <Text>Details</Text>
          <Text>Streams</Text>
          <Text>Profile</Text>
        </View>
      )}

      {searchOpen ? (
        <View style={styles.inputSearch}>
          <TextInput
            placeholder="Search"
            onChangeText={handleSearchChange}
            onSubmitEditing={submiting}
          />
          <TouchableOpacity onPress={openSearch}>
            <Image source={require('./cancel.png')} style={styles.exitbutton} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={openSearch}>
          <Image source={require('./search.png')} style={styles.menubuttonright} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headergroup: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menutext: {
    color: 'black',
    fontSize: 25,
  },
  menubutton: {
    width: 40,
    height: 40,
  },
  menubuttonright: {
    width: 40,
    height: 40,
  },
  menugroupe: {
    position: 'absolute',
    flexDirection: 'row',
    marginTop: '10%',
    marginLeft: '20%',
    justifyContent: 'space-between',
  },
  inputSearch: {
    width: '60%',
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f7f8f8',
    borderRadius: 20,
  },
  exitbutton: {
    width: 42,
    height: 42,
  },
});

export default Header;