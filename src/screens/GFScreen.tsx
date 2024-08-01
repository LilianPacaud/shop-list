import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Item, State } from '../types';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/screensStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import GFLogo from '../images/GFLogo';
import List from '../components/List';
import { firestore } from '../../firebaseConfig';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

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
  const [list, setList] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const collectionRef = collection(firestore, 'list');
    const q = query(collectionRef, where('screen', '==', 'GF'));

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
    setAppState((prevState: State) => ({
      ...prevState,
      gradientColors: ['#FFFFFF', '#B8CD9E'],
      bottomNavBgColor: 'rgba(147,147,147,0.49)',
      activeButton: 'GF',
    }));
  }, [navigation, setAppState]);

  const addItemToList = async () => {
    try {
      await addDoc(collection(firestore, 'list'), {
        name: inputValue,
        screen: 'GF',
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
    <GFLogo />
    <View style={styles.addElement}>
      <TextInput style={[styles.inputAdd, {borderColor: 'rgba(147,147,147,1)'}]} placeholder="Ajouter un element" value={inputValue} onChangeText={text => setInputValue(text)} onSubmitEditing={addItemToList}></TextInput>
      <Icon onPress={() => {addItemToList()}} style={styles.iconAdd} name="plus-circle-outline" size={30} color="#000" />
    </View>
    <List items={list} screen={'GF'} />
  </View>
  );
};

export default GFScreen;
