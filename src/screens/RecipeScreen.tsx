import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Item, RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import { firestore } from '../../firebaseConfig';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListRecip from '../components/ListRecipe';

type RecipeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: RecipeScreenNavigationProp;
};
const RecipeScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {

  const [documents, setDocuments] = useState<Item[]>([]);

  useEffect(() => {
    const collectionRef = collection(firestore, 'recipe');

    const q = query(
      collectionRef,
      orderBy('date', 'asc'),
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
      <TouchableOpacity onPress={() => {
          navigation.navigate('Home')
          setAppState((prevState: React.SetStateAction<State>) => ({
            ...prevState,
            activeButton: 'Home',
            gradientColors: ['#FFFFFF', '#FFB6C1'],
            bottomNavBgColor: 'rgba(92,41,41,0.49)',
          }));
        }} >
        <Image style={styles.navigateRecipe} source={require('../../assets/images/L.png')}/>
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/recipe.png')}
          style={styles.homeIcon}
        />
        <View style={styles.homeSeparator} />
        <ListRecip recipes={documents} screen={'home'} />
      </View>
    </>
  );
};

export default RecipeScreen;
