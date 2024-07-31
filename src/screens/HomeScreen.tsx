import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Item, RootStackParamList, State } from '../types';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/screensStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HomeLogo from '../images/HomeLogo';
import List from '../components/List';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {

  const items: Item[] = [{name: 'spaghetti à la bolognaise'}, {name: 'test2'},{name: 'test3'},{name: 'test4'},{name: 'test5'},{name: 'test6'},{name: 'test7'},{name: 'test8'},{name: 'test9'},{name: 'test10'},{name: 'test11'},{name: 'test12'}]

  useEffect(() => {
    setAppState((prevState: React.SetStateAction<State>) => ({
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
        <TextInput style={[styles.inputAdd, {borderColor: 'rgba(92,41,41,1)'}]} placeholder="Ajouter un element"></TextInput>
        <Icon style={styles.iconAdd} name="plus-circle-outline" size={30} color="#000" />
      </View>
      <List items={items} screen={'home'} />
    </View>
  );
};

export default HomeScreen;
