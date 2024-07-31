import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Item, RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OthersLogo from '../images/OthersLogo';
import List from '../components/List';

type OthersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Others'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: OthersScreenNavigationProp;
};

const OthersScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  const items: Item[] = [{name: 'test1'}, {name: 'test2'},{name: 'test3'},{name: 'test4'},{name: 'test5'},{name: 'test6'},{name: 'test7'},{name: 'test8'}]

  useEffect(() => {
    setAppState((prevState: React.SetStateAction<State>) => ({
      ...prevState,
      gradientColors: ['#FFFFFF', '#D9A262'],
      bottomNavBgColor: 'rgba(225,157,94,0.29)',
      activeButton: 'Others',
    }));
  }, [navigation, setAppState]);

  return (
    <View style={styles.container}>
      <OthersLogo />
      <View style={styles.addElement}>
        <TextInput style={[styles.inputAdd, {borderColor: 'rgba(225,157,94,1)'}]} placeholder="Ajouter un element"></TextInput>
        <Icon style={styles.iconAdd} name="plus-circle-outline" size={30} color="#000" />
      </View>
      <List items={items} screen={'others'} />
    </View>
  );
};

export default OthersScreen;
