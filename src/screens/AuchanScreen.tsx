import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import styles from '../styles/screensStyle';
import LeclercLogo from '../images/LeclercLogo';
import AuchanLogo from '../images/AuchanLogo';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'

type AuchanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auchan'>;

type Props = {
  setGradientColors: (colors: string[]) => void;
  navigation: AuchanScreenNavigationProp;
};

const AuchanScreen: React.FC<Props> = ({ setGradientColors, navigation }: Props) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setGradientColors(['#FFFFFF', '#1C2A44']);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoFlex}>
        <LeclercLogo />
        <AuchanLogo />
      </View>
      <View style={styles.addElement}>
        <TextInput style={styles.input} placeholder="Ajouter un element"></TextInput>
        <Icon name="plus" size={30} color="#000" />
        </View>
      <View style={styles.viewElements}>

      </View>
    </View>
  );
};

export default AuchanScreen;
