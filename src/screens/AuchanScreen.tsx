import React, { useEffect } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import LeclercLogo from '../images/LeclercLogo';
import AuchanLogo from '../images/AuchanLogo';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import List from '../components/List';

type AuchanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auchan'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: AuchanScreenNavigationProp;
};

type ItemProps = {
  name: string
}

const AuchanScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  const items: ItemProps[] = [{name: 'test1'}, {name: 'test2'},{name: 'test3'},{name: 'test4'},{name: 'test5'},{name: 'test6'},{name: 'test7'},{name: 'test8'}]

  useEffect(() => {
    setAppState((prevState: React.SetStateAction<State>) => ({
      ...prevState,
      gradientColors: ['#FFFFFF', '#1C2A44'],
      bottomNavBgColor: 'rgba(28,42,58,0.29)',
      activeButton: 'Auchan',
    }));
  }, [navigation, setAppState]);

  return (
    <View style={styles.container}>
      <View style={styles.logoFlex}>
        <LeclercLogo style={{width: 52}} />
        <AuchanLogo style={{width: 52}} />
      </View>
      <View style={styles.addElement}>
        <TextInput style={[styles.inputAdd, {borderColor: 'rgba(28,42,58,1)'}]} placeholder="Ajouter un element"></TextInput>
        <Icon style={styles.iconAdd} name="plus-circle-outline" size={30} color="#000" />
      </View>
      <List items={items} screen={'auchan'} />
    </View>
  );
};

export default AuchanScreen;
