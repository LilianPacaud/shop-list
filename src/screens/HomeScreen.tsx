import React, { useEffect, useState } from 'react';
import { View, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Item, RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import List from '../components/List';
import { firestore } from '../../firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {
  const TouchableComponent = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableOpacity;

  const [documents, setDocuments] = useState<Item[]>([]);

  useEffect(() => {
    const collectionRef = collection(firestore, 'list');

    const q = query(
      collectionRef,
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
      setDocuments(docs);
    }, (error) => {
      console.error('Error fetching documents: ', error);
    });

    return () => unsubscribe();
  }, []);

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
        <Image
          source={require('../../assets/images/L.png')}
          style={[styles.homeIcon, styles.logoTop]}
        />
        <View style={styles.homeSeparator} />
        <List items={documents} screen={'home'} />
      </View>
    </>
  );
};

export default HomeScreen;
