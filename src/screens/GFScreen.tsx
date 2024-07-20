import React, { useEffect } from 'react';
import { Button, View, Text, StyleSheet,Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/screensStyle';
import Icon from 'react-native-vector-icons/FontAwesome'
import GFLogo from '../images/GFLogo';

type GFScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GF'>;

type Props = {
  setAppState: (state: any) => void;
  navigation: GFScreenNavigationProp;
};

const GFScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  useEffect(() => {
    setAppState((prevState: any) => ({
      ...prevState,
      gradientColors: ['#FFFFFF', '#B8CD9E'],
      bottomNavBgColor: 'rgba(147,147,147,0.49)',
      activeButton: 'GF',
    }));
  }, [navigation, setAppState]);

  return (
    <View style={styles.container}>
      <GFLogo />
      <View style={styles.addElement}>
        <TextInput style={styles.input} placeholder="Ajouter un element"></TextInput>
        <Icon name="plus" size={30} color="#000" />
        </View>
      <View style={styles.viewElements}>
      </View>
    </View>
  );
};

export default GFScreen;
