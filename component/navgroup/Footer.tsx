/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Linking } from 'react-native';

const Footer = () => {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={{ backgroundColor: '#f2f2f2', padding: 10 }}>
      <View style={{ alignItems: 'center' }}>
        <Text>
          Copyright © 2023 {' '}
          <Text style={{ color: 'blue' }} onPress={() => openLink('#')}>
            <link>Rado</link>
          </Text>{' '}
          Company. All rights reserved.
        </Text>
        <Text>
          Design: {' '}
          <Text style={{ color: 'blue' }} onPress={() => openLink('https://templatemo.com')}>
            <link>TemplateMo</link>
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Footer;