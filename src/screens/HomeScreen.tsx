import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet,Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/screensStyle';
import Icon from 'react-native-vector-icons/FontAwesome'
import AllLogo from '../images/HomeLogo';
import HomeLogo from '../images/HomeLogo';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  setAppState: (state: any) => void;
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  useEffect(() => {
    setAppState((prevState: any) => ({
      ...prevState,
      gradientColors: ['#FFFFFF', '#FFB6C1'],
      bottomNavBgColor: 'rgba(92,41,41,0.49)',
      activeButton: 'Home',
    }));
  }, [navigation, setAppState]);

  return (
    <View style={styles.container}>
      <HomeLogo />
      <View style={styles.addElement}>
        <TextInput style={styles.input} placeholder="Ajouter un element"></TextInput>
        <Icon name="plus" size={30} color="#000" />
        </View>
      <View style={styles.viewElements}>
    </View>
    </View>
  );
};

export default HomeScreen;
