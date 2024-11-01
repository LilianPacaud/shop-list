import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Item, RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import LeclercLogo from '../images/LeclercLogo';
import AuchanLogo from '../images/AuchanLogo';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import List from '../components/List';
import { firestore } from '../../firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'firebase/firestore';

type AuchanScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auchan'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: AuchanScreenNavigationProp;
};

const AuchanScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  const [list, setList] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState('');
  const TouchableComponent = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableOpacity;

  useEffect(() => {
    const collectionRef = collection(firestore, 'list');
    const q = query(
      collectionRef,
      where('screen', '==', 'auchan'),
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

  const addItemToList = async () => {
    try {
      await addDoc(collection(firestore, 'list'), {
        name: inputValue,
        screen: 'auchan',
        primary: false,
        secondary: false,
        valid: false,
        count: 1,
        cost: 0
      });
      setInputValue('')
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  return (
    <>
    <TouchableComponent onPress={() => {
      navigation.navigate('Recipe')
      setAppState((prevState: React.SetStateAction<State>) => ({
        ...prevState,
        activeButton: 'none',
        gradientColors: ['#FFFFFF', '#997CB0'],
        bottomNavBgColor: 'none',
      }));
    }} >
      <Image style={styles.navigateRecipe} source={require('../../assets/images/recipe.png')}/>
    </TouchableComponent>
    <View style={styles.container}>
      <View style={styles.logoFlex}>
        <LeclercLogo style={{width: 52, marginTop: 30}} />
        <AuchanLogo style={{width: 52,  marginTop: 30}} />
      </View>
      <View style={styles.addElement}>
        <TextInput 
          style={[styles.inputAdd, {borderColor: 'rgba(28,42,58,1)'}]} 
          placeholder="Ajouter un element" 
          value={inputValue} 
          onChangeText={text => setInputValue(text)} 
          onSubmitEditing={addItemToList}
          returnKeyType="done" />
        <Icon onPress={() => {addItemToList()}} style={styles.iconAdd} name="plus-circle-outline" size={30} color="#000" />
      </View>
      <List items={list} screen={'auchan'} />
    </View>
    </>
  );
};

export default AuchanScreen;
