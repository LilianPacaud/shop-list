import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Item, RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import OthersLogo from '../images/OthersLogo';
import List from '../components/List';
import { firestore } from '../../firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';

type OthersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Others'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: OthersScreenNavigationProp;
};

const OthersScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  const [list, setList] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const collectionRef = collection(firestore, 'list');
    const q = query(
      collectionRef,
      where('screen', '==', 'others'),
      orderBy('valid', 'desc'),
      orderBy('primary', 'desc'),
      orderBy('secondary', 'desc'),
      orderBy('name', 'asc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setList(docs);
    }, (error) => {
      console.error('Error fetching documents: ', error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setAppState((prevState: React.SetStateAction<State>) => ({
      ...prevState,
      gradientColors: ['#FFFFFF', '#D9A262'],
      bottomNavBgColor: 'rgba(225,157,94,0.29)',
      activeButton: 'Others',
    }));
  }, [navigation, setAppState]);

  const addItemToList = async () => {
    try {
      await addDoc(collection(firestore, 'list'), {
        name: inputValue,
        screen: 'others',
        primary: false,
        secondary: false,
        valid: false,
        count: 1
      });
      setInputValue('')
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <OthersLogo />
      <View style={styles.addElement}>
        <TextInput style={[styles.inputAdd, {borderColor: 'rgba(225,157,94,1)'}]} placeholder="Ajouter un element" value={inputValue} onChangeText={text => setInputValue(text)} onSubmitEditing={addItemToList}></TextInput>
        <Icon onPress={() => {addItemToList()}} style={styles.iconAdd} name="plus-circle-outline" size={30} color="#000" />
      </View>
      <List items={list} screen={'others'} />
    </View>
  );
};

export default OthersScreen;
