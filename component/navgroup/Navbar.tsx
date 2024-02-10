import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import '../assets/css/style.scss';
const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.navbarBrand}>Start Bootstrap</Text>
      <TouchableOpacity style={styles.sidebarToggle} onPress={() => console.log('Sidebar Toggle')}>
        <Text><i class="fas fa-bars"></i></Text>
      </TouchableOpacity>
      <View style={styles.navbarSearch}>
        <TextInput style={styles.formControl} placeholder="Search for..." />
        <TouchableOpacity style={styles.btnNavbarSearch} onPress={() => console.log('Navbar Search')}>
          <Text><i class="fas fa-search"></i></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navbarMenu}>
        <TouchableOpacity style={styles.navbarLink} onPress={() => console.log('Settings')}>
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarLink} onPress={() => console.log('Activity Log')}>
          <Text>Activity Log</Text>
        </TouchableOpacity>
        <View style={styles.dropdownDivider}></View>
        <TouchableOpacity style={styles.navbarLink} onPress={() => console.log('Logout')}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;