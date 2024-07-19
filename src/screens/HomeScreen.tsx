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
  setGradientColors: (colors: string[]) => void;
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: React.FC<Props> = ({ setGradientColors, navigation }: Props) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setGradientColors(['#FFFFFF', '#FFB6C1']);
    });
    return unsubscribe;
  }, [navigation]);

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
