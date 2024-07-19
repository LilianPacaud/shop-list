import React from 'react';
import { View, Button, StyleSheet, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import screenStyles from '../styles/screensStyle';
import navStyles from '../styles/navStyle';
import AllLogo from '../images/HomeLogo';
import HomeLogo from '../images/HomeLogo';
import GFLogo from '../images/GFLogo';
import LeclercLogo from '../images/LeclercLogo';


const BottomNavigation: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={navStyles.nav}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Home')}>
        <View style={navStyles.button}>
          <HomeLogo />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('GF')}>
        <View style={navStyles.button}>
            <GFLogo />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Auchan')}>
        <View style={navStyles.button}>
          <LeclercLogo />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Others')}>
        <View style={navStyles.button}>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
