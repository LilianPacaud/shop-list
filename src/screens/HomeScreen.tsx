import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Item, RootStackParamList, State } from '../types';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../styles/screensStyle';
import HomeLogo from '../images/HomeLogo';
import List from '../components/List';
import { firestore } from '../../firebaseConfig';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: HomeScreenNavigationProp;
};
const HomeScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {

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
        <TextInput editable={false} style={[styles.inputAdd, {borderColor: 'rgba(92,41,41,1)'}]} placeholder="Ajouter un element"></TextInput>
      </View>
      <List items={documents} screen={'home'} />
    </View>
  );
};

export default HomeScreen;
