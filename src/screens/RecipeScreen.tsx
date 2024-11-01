import React, { useEffect, useState } from 'react';
import { View, Image, Text, Modal, TouchableWithoutFeedback, Keyboard, TextInput, TouchableHighlight } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DayRecipe, Item, RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import { firestore } from '../../firebaseConfig';
import {doc, collection, onSnapshot, orderBy, query, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListRecipe from '../components/ListRecipe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import modalStyle from '../styles/modalStyle';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Octicons from 'react-native-vector-icons/Octicons'
import ListIngredients from '../components/ListIngredients';

type RecipeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  setAppState: (state: React.SetStateAction<State>) => void;
  navigation: RecipeScreenNavigationProp;
};
const RecipeScreen: React.FC<Props> = ({ setAppState, navigation }: Props) => {

  const [ingredients, setIngredients] = useState<Item[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<Item[]>([])
  const [recipes, setRecipes] = useState<DayRecipe[]>([]);
  const [openAdd, setOpenAdd] = useState(false)
  const [recetteNameAdd, setRecetteNameAdd] = useState('')
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [meal, setMeal] = useState('lunch')
  const [country, setCountry] = React.useState();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleChangeMeal= () => {
    switch (meal) {
      case 'lunch':
        setMeal('dinner')
        break;
      case 'dinner':
        setMeal('lunch')
        break;
      default:
        setMeal('dinner')
    }
  };

  const handleCloseUpdate = () => {
    setOpenAdd(false);
  };

  const normalizeDate = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

  const handleAddRecipe = async () => {
    if(recetteNameAdd === '') return
    const existingRecipe = recipes.find(recipe => {
      const recipeDate = recipe.date instanceof Timestamp ? recipe.date.toDate() : recipe.date;
      return normalizeDate(recipeDate).getTime() === normalizeDate(date).getTime();
    });
    try {
      if (existingRecipe) {
        const docId = existingRecipe.id; 
        const docRef = doc(firestore, 'recipe', docId);

        if(meal === 'lunch'){
          await updateDoc(docRef, {
            lunch: { name: recetteNameAdd, ingredients: recipeIngredients },
          });
        }
        else{
          await updateDoc(docRef, {
            dinner: { name: recetteNameAdd, ingredients: recipeIngredients },
          });
        }

      } else {
        if(meal === 'lunch'){
          await addDoc(collection(firestore, 'recipe'), {
            date,
            lunch: {name: recetteNameAdd, ingredients: recipeIngredients},
          });
        }
        else{
          await addDoc(collection(firestore, 'recipe'), {
            date,
            dinner: {name: recetteNameAdd, ingredients: recipeIngredients},
          });
        }
      }
      setRecetteNameAdd('')
      setOpenAdd(false);
    }
  catch (error) {
    console.error('Error writing document: ', error);
  }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleOpenAdd = () => {
    setOpenAdd(true)
    setRecipeIngredients([])
  };

  const formatDate = (date: any) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('fr-FR', options); // Change 'fr-FR' to desired locale
  };

  // Show the date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide the date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Handle date confirmation
  const handleConfirm = (selectedDate: any) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  useEffect(() => {
    const collectionRef = collection(firestore, 'recipe');

    const q = query(
      collectionRef,
      orderBy('date', 'asc'),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs: DayRecipe[] = querySnapshot.docs.map((doc => {
        const data = doc.data();
        const date = data.date?.toDate ? data.date.toDate() : data.date;
        return {
        id: doc.id,
        date: date,
        ...doc.data()
      }
    }));
      setRecipes(docs);
    }, (error) => {
      console.error('Error fetching documents: ', error);
    });

    return () => unsubscribe();
  }, []);


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
      setIngredients(docs);
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
        <View style={styles.addElement}>
          <TouchableOpacity style={styles.buttonAddRecipe} onPress={handleOpenAdd}>
            <Icon name="plus-circle-outline" size={20} color="#000" />
            <Text style={styles.buttonAddRecipeText}>Ajouter une recette</Text>
          </TouchableOpacity>
        </View>
        <ListRecipe recipes={recipes} screen={'home'} />
      </View>

      <Modal
      visible={openAdd} 
      transparent={true} 
      animationType="fade"
      onRequestClose={handleCloseUpdate}
      >
        {/* <TouchableWithoutFeedback onPress={handleCloseUpdate}> */}
          <View style={modalStyle.modal}>
            {/* <TouchableWithoutFeedback onPress={dismissKeyboard}> */}
              <View style={modalStyle.modalContainer}>
                <Text style={modalStyle.titleAddRecipe}>Ajouter une recette</Text>
                <TextInput
                  style={modalStyle.inputAddRecipe}
                  placeholder='Nom de la recette'
                  value={recetteNameAdd}
                  onChangeText={text => setRecetteNameAdd(text)}
                  returnKeyType="done" 
                />
                <View style={modalStyle.datePickerBlock}>
                  <TouchableWithoutFeedback onPress={showDatePicker}>
                      <View style={modalStyle.datePicker} >
                        <Text>{formatDate(date)}</Text>
                      </View>
                  </TouchableWithoutFeedback>
                  <Octicons onPress={handleChangeMeal} name={meal == 'lunch' ? 'sun': 'moon' } size={20} color={meal == 'lunch' ? "#D9A262": "#A0ADC8"} />
                </View>

                <ListIngredients ingredients={ingredients} setRecipeIngredients={setRecipeIngredients} recipeIngredients={recipeIngredients} screen={'home'} />
                {/* <View style={modalStyle.addIngredient}>
                  <TextInput
                    style={modalStyle.inputAddIngredient}
                    placeholder='Ajouter un ingrédient'
                    value={recetteNameAdd}
                    onChangeText={text => setRecetteNameAdd(text)}
                    // onSubmitEditing={handleSubmit}
                    returnKeyType="done" 
                  />
                     <Dropdown
                         dropdownStyle={{
                          width: '70%',
                          marginLeft: '10%',
                          margin: 10,
                        }}
                        dropdownContainerStyle={{
                          padding: 2
                        }}
                        labelStyle={{
                          fontSize: 1
                        }}
                        selectedItemStyle={{
                          fontSize: 10
                        }}
                      placeholder="Select an option..."
                      options={[
                        { label: 'Grand Frais', value: 'GF' },
                        { label: 'Auchan/Leclerc', value: 'auchan' },
                        { label: 'Autres', value: 'other' },
                      ]}
                      selectedValue={country}
                      onValueChange={(value: any) => setCountry(value)}
                      primaryColor={'#ab62ff'}
                    />
                    <TouchableOpacity style={modalStyle.addRecipe}><Text style={modalStyle.addRecipeText}>AJOUTER</Text></TouchableOpacity>

                </View> */}
                <View style={modalStyle.blockAddRecipe}>
                  <TouchableHighlight onPress={handleAddRecipe} style={modalStyle.addRecipe}><Text style={modalStyle.addRecipeText}>AJOUTER</Text></TouchableHighlight>
                </View>
              </View>
            {/* </TouchableWithoutFeedback> */}
          </View>
        {/* </TouchableWithoutFeedback> */}
      </Modal>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date}
      />
    </>
  );
};

export default RecipeScreen;
