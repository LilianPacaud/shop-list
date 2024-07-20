import React, { useEffect } from 'react';
import { View, Button, StyleSheet, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import screenStyles from '../styles/screensStyle';
import navStyles from '../styles/navStyle';
import AllLogo from '../images/HomeLogo';
import HomeLogo from '../images/HomeLogo';
import GFLogo from '../images/GFLogo';
import LeclercLogo from '../images/LeclercLogo';


const BottomNavigation: React.FC = ({ appState, setAppState }) => {
  const navigation = useNavigation();
  return (
    <View style={[navStyles.nav, { backgroundColor: appState.bottomNavBgColor }]}>
        <TouchableOpacity
        style={[navStyles.button, appState.activeButton === 'Home' ? {backgroundColor: '#B78787'} : {backgroundColor: '#FFF'}]}
        onPress={() => {
          navigation.navigate('Home')
          setAppState((prevState: any) => ({
            ...prevState,
            activeButton: 'Home',
            gradientColors: ['#FFFFFF', '#FFB6C1'],
            bottomNavBgColor: 'rgba(92,41,41,0.49)',
          }));
        }}
        >
        <View style={navStyles.button}>
          <HomeLogo />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[navStyles.button, appState.activeButton === 'GF' ? {backgroundColor: '#889B6F'} : {backgroundColor: '#FFF'}]}
        onPress={() => {
          navigation.navigate('GF')
          setAppState((prevState: any) => ({
            ...prevState,
            activeButton: 'GF',
            gradientColors: ['#FFFFFF', '#B8CD9E'],
            bottomNavBgColor: 'rgba(147,147,147,0.49)',
          }));
        }}
      >
        <View style={navStyles.button}>
            <GFLogo />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[navStyles.button, appState.activeButton === 'Auchan' ? {backgroundColor: '#A0ADC8'} : {backgroundColor: '#FFF'}]}
        onPress={() => {
          navigation.navigate('Auchan')
          setAppState((prevState: any) => ({
            ...prevState,
            activeButton: 'Auchan',
            gradientColors: ['#FFFFFF', '#1C2A44'],
            bottomNavBgColor: 'rgba(28,42,58,0.29)',
          }));
        }}
      >
        <View style={navStyles.button}>
          <LeclercLogo />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[navStyles.button, appState.activeButton === 'Others' ? {backgroundColor: '#FAA037'} : {backgroundColor: '#FFF'}]}
        onPress={() => {
          navigation.navigate('Others')
          setAppState((prevState: any) => ({
            ...prevState,
            activeButton: 'Others',
            gradientColors: ['#FFFFFF', '#D9A262'],
            bottomNavBgColor: 'rgba(225,157,94,0.29)',
          }));
        }}
      >
        <View style={navStyles.button}>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
