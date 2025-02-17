import React, { useEffect, useState } from 'react';
import { View, Image, Text, Modal, TouchableWithoutFeedback, Keyboard, TextInput, TouchableHighlight, Platform } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DayRecipe, Item, RootStackParamList, State } from '../types';
import styles from '../styles/screensStyle';
import { firestore } from '../../firebaseConfig';
import {doc, collection, onSnapshot, orderBy, query, updateDoc, addDoc, Timestamp, arrayUnion } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListRecipe from '../components/ListRecipe';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import modalStyle from '../styles/modalStyle';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import ListIngredients from '../components/ListIngredients';
import { CheckBox } from 'react-native-elements';

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
  const [meal, setMeal] = useState('none')
  const [specificDate, setSpecificDate] = useState(false)
  const [country, setCountry] = React.useState();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const TouchableComponent = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableOpacity;

  const handleChangeMeal= () => {
    switch (meal) {
      case 'none' :
        setMeal('breakfast')
        break;
      case 'breakfast':
        setMeal('lunch')
        break;
      case 'lunch':
        setMeal('dinner')
        break;
      case 'dinner':
        setMeal('none')
        break;
      default:
        setMeal('lunch')
    }
  };

  const handleCloseAdd = () => {
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
      if(specificDate){
        const recipeDate = recipe.date instanceof Timestamp ? recipe.date.toDate() : recipe.date;
        return normalizeDate(recipeDate).getTime() === normalizeDate(date).getTime();
      }
      else {
        return recipe.date === null;
      }
    });
    try {
      if (existingRecipe) {
        const docId = existingRecipe.id; 
        const docRef = doc(firestore, 'recipe', docId);
        await updateDoc(docRef, {
          recipes: arrayUnion(
            {
              name: recetteNameAdd,
              meal: meal === 'none' ? null : meal,
              mealOrder: meal === 'none' ? 0 : meal === 'breakfast' ? 1 : meal === 'sun' ? 2 : meal === 'moon' ? 3 : 4,
              ingredients: recipeIngredients
            }
          )
        });
       } else {
        await addDoc(collection(firestore, 'recipe'), {
          date,
          recipes: [
            {
              name: recetteNameAdd,
              meal: meal === 'none' ? null : meal,
              mealOrder: meal === 'none' ? 0 : meal === 'breakfast' ? 1 : meal === 'sun' ? 2 : meal === 'moon' ? 3 : 4,
              ingredients: recipeIngredients
            }
          ]
        });
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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

  const IconLunch = () => {
    if(meal === 'none'){
      return <AntDesign onPress={handleChangeMeal} name={'question'} size={20} color={"#000"} />
    } else if (meal === 'breakfast') {
      return <Feather onPress={handleChangeMeal} name={'sunrise'} size={20} color={"#D9A262"} />
    } else if (meal === 'lunch') {
      return <Octicons onPress={handleChangeMeal} name={'sun'} size={20} color={"#a7aa00"} />
    } else if (meal === 'dinner') {
      return <Octicons onPress={handleChangeMeal} name={'moon'} size={20} color={"#A0ADC8"} />
    }
  }

  return (
    <>
      <TouchableComponent onPress={() => {
          navigation.navigate('Home')
          setAppState((prevState: React.SetStateAction<State>) => ({
            ...prevState,
            activeButton: 'Home',
            gradientColors: ['#FFFFFF', '#FFB6C1'],
            bottomNavBgColor: 'rgba(92,41,41,0.49)',
          }));
        }} >
        <Image style={styles.navigateRecipe} source={require('../../assets/images/L.png')}/>
      </TouchableComponent>
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
      onRequestClose={handleCloseAdd}
      >
        {/* <TouchableWithoutFeedback onPress={handleCloseUpdate}> */}
          <View style={modalStyle.modal}>
              <View style={modalStyle.modalContainer}>
                <Text style={modalStyle.titleAddRecipe}>Ajouter une recette</Text>
                <TextInput
                  style={modalStyle.inputAddRecipe}
                  placeholder='Nom de la recette'
                  value={recetteNameAdd}
                  onChangeText={text => setRecetteNameAdd(text)}
                  returnKeyType="done" 
                />
                <View style={modalStyle.specificDate}>
                  <Text>Spécifier une date</Text>
                  <CheckBox checked={specificDate} onPress={() => {setSpecificDate(!specificDate)}} checkedColor='#ab62ff' />
                  <IconLunch />
                </View>
                { specificDate && 
                  <View style={modalStyle.datePickerBlock}>
                  <TouchableWithoutFeedback onPress={showDatePicker}>
                      <View style={modalStyle.datePicker} >
                        <Text>{formatDate(date)}</Text>
                      </View>
                  </TouchableWithoutFeedback>
                </View>
                }

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
                <AntDesign style={modalStyle.closeRecipeModal} onPress={handleCloseAdd} name={'close'} size={20}/>
              </View>
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
}
;

export default RecipeScreen;
