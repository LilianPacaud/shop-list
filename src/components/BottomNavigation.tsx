import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import navStyles from '../styles/navStyle';
import screenStyle from '../styles/screensStyle';
import GFLogo from '../images/GFLogo';
import AuchanLogoSmall from '../images/AuchanLogoSmall';
import LeclercLogoSmall from '../images/LeclercLogoSmall';
import OthersBtnLogo from '../images/OthersBtnLogo';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, State } from '../types';

interface BottomNavigationProps {
  appState: State
  setAppState: React.Dispatch<React.SetStateAction<State>>;
}


const BottomNavigation: React.FC<BottomNavigationProps> = ({ appState, setAppState }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();;
  return (
    <View style={[navStyles.nav, { backgroundColor: appState.bottomNavBgColor }]}>
        <TouchableOpacity
        style={[navStyles.button, appState.activeButton === 'Home' ? {backgroundColor: '#B78787'} : {backgroundColor: '#FFF'}]}
        onPress={() => {
          navigation.navigate('Home')
          setAppState((prevState: React.SetStateAction<State>) => ({
            ...prevState,
            activeButton: 'Home',
            gradientColors: ['#FFFFFF', '#FFB6C1'],
            bottomNavBgColor: 'rgba(92,41,41,0.49)',
          }));
        }}
        >
        <View style={navStyles.button}>
        <Image
        source={require('../../assets/images/L.png')}
        style={screenStyle.homeIcon}
      />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[navStyles.button, appState.activeButton === 'GF' ? {backgroundColor: '#889B6F'} : {backgroundColor: '#FFF'}]}
        onPress={() => {
          navigation.navigate('GF')
          setAppState((prevState: React.SetStateAction<State>) => ({
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
          setAppState((prevState: React.SetStateAction<State>) => ({
            ...prevState,
            activeButton: 'Auchan',
            gradientColors: ['#FFFFFF', '#1C2A44'],
            bottomNavBgColor: 'rgba(28,42,58,0.29)',
          }));
        }}
      >
        <View style={navStyles.button}>   
        <View>
          <AuchanLogoSmall style={navStyles.bottomRight} />
          <LeclercLogoSmall style={navStyles.topLeft} />
        </View>   
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[navStyles.button, appState.activeButton === 'Others' ? {backgroundColor: '#FAA037'} : {backgroundColor: '#FFF'}]}
        onPress={() => {
          navigation.navigate('Others')
          setAppState((prevState: React.SetStateAction<State>) => ({
            ...prevState,
            activeButton: 'Others',
            gradientColors: ['#FFFFFF', '#D9A262'],
            bottomNavBgColor: 'rgba(225,157,94,0.29)',
          }));
        }}
      >
        <View style={navStyles.button}>
          <OthersBtnLogo />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;
