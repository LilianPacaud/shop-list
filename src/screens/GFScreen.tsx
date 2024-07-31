import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Item, State } from '../types';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/screensStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import GFLogo from '../images/GFLogo';
import List from '../components/List';

type GFScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GF'>;

type Props = {
  setAppState: (state: React.SetStateAction<{
    bottomNavBgColor: string;
    activeButton: string;
    gradientColors: string[];
  }>) => void;
  navigation: GFScreenNavigationProp;
};

const GFScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  const items: Item[] = [{name: 'test1'}, {name: 'test2'},{name: 'test3'},{name: 'test4'},{name: 'test5'},{name: 'test6'},{name: 'test7'},{name: 'test8'}]

  useEffect(() => {
    setAppState((prevState: State) => ({
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
      <TextInput style={[styles.inputAdd, {borderColor: 'rgba(147,147,147,1)'}]} placeholder="Ajouter un element"></TextInput>
      <Icon style={styles.iconAdd} name="plus-circle-outline" size={30} color="#000" />
    </View>
    <List items={items} screen={'GF'} />
  </View>
  );
};

export default GFScreen;
