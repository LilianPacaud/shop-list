import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import itemStyles from '../styles/itemStyles';
import style from '../styles/recipeStyles';
import { Swipeable, TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { DayRecipe, Ingredient, Item } from '../types';
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import modalStyle from '../styles/modalStyle';
import { CheckBox } from 'react-native-elements';
import ListIngredients from './ListIngredients';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type RecipeItemProps = {
    recipe: any
    recipeRef: any
    date: any,
    allRecipes: DayRecipe[]
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, recipeRef, date, allRecipes }: RecipeItemProps) => {
    const [chevronLunch, setChevronLunch] = useState<string>('chevron-down');
    const [displayedIngredientsLunch, setDisplayedIngredientsLunch] = useState<'none' | 'flex'>('none');
    const [openUpdate, setOpenUpdate] = useState(false);
    const [recipeName, setRecipeName] = useState(recipe.name);
    const [specificDate, setSpecificDate] = useState(date === null ? false : true);
    const [meal, setMeal] = useState(recipe.meal);
    const [ingredients, setIngredients] = useState<Item[]>([]);
    const [recipeIngredients, setRecipeIngredients] = useState(recipe.ingredients);
    const [currentDate, setCurrentDate] = useState(date || new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

      
  const normalizeDate = (date: Date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };

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

    const formatDate = (date: any) => {
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      return date?.toLocaleDateString('fr-FR', options); // Change 'fr-FR' to desired locale
    };
  
    const renderSwipeable = () => {
      return (
        <Animated.View style={[itemStyles.actionContainer]} />
      );
    };

    
    const handleOpenUpdate = () => {
      setOpenUpdate(true)
    };

    const handleCloseUpdate = () => {
      setOpenUpdate(false);
    };

    const handleConfirm = (selectedDate: any) => {
      setCurrentDate(selectedDate);
      hideDatePicker();
    };

    const IconLunchUpdatable = () => {
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


    const IconLunch = () => {
      if(meal === 'none'){
        return <AntDesign name={'question'} size={20} color={"#000"} />
      } else if (meal === 'breakfast') {
        return <Feather name={'sunrise'} size={20} color={"#D9A262"} />
      } else if (meal === 'lunch') {
        return <Octicons name={'sun'} size={20} color={"#a7aa00"} />
      } else if (meal === 'dinner') {
        return <Octicons name={'moon'} size={20} color={"#A0ADC8"} />
      }
    }

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const handleOpenIngredients = (
      chevron: string, 
      setChevron: React.Dispatch<React.SetStateAction<string>>, 
      setDisplayedIngredients: React.Dispatch<React.SetStateAction<'none' | 'flex'>>) => {
      switch(chevron) {
        case 'chevron-down':
          setChevron('chevron-up')
          setDisplayedIngredients('flex')
          break;
        case 'chevron-up':
          setChevron('chevron-down')
          setDisplayedIngredients('none')
          break;
      };
    }

    const deleteRecipe = async (recipe: any) => {
      try {
        await updateDoc(recipeRef, {
          recipes: arrayRemove(recipe)
        });
        if(date !== null) {
          const updatedDoc: any = await getDoc(recipeRef);
          if(!updatedDoc.data().recipes.length) {
            await deleteDoc(recipeRef)
          }
        }
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    };

    const handleUpdateRecipe = async () => {
      if(recipeName === '') return
      if(date === null) {
        const docRefNullDate = doc(firestore, 'recipe', 'chYCcO3hS0aLvHzmhmH6');
        await updateDoc(docRefNullDate, {
          recipes: arrayUnion(
            {
              name: recipeName,
              meal: meal === 'none' ? null : meal,
              mealOrder: meal === 'none' ? 0 : meal === 'breakfast' ? 1 : meal === 'sun' ? 2 : meal === 'moon' ? 3 : 4,
              ingredients: recipeIngredients
            }
          )
        });
      }
      else if (date === currentDate) {
        await updateDoc(recipeRef, {
          recipes: arrayUnion(
            {
              name: recipeName,
              meal: meal === 'none' ? null : meal,
              mealOrder: meal === 'none' ? 0 : meal === 'breakfast' ? 1 : meal === 'sun' ? 2 : meal === 'moon' ? 3 : 4,
              ingredients: recipeIngredients
            }
          )
        });
      } else {
        const existingRecipe = allRecipes.find(currentRecipe => {
          const recipeDate = currentRecipe.date instanceof Timestamp ? currentRecipe.date.toDate() : currentRecipe.date;
          return normalizeDate(recipeDate).getTime() === normalizeDate(currentDate).getTime();
        });
        try {
          if (existingRecipe) {
            const docId = existingRecipe.id; 
            const docRef = doc(firestore, 'recipe', docId);
            await updateDoc(docRef, {
              recipes: arrayUnion(
                {
                  name: recipeName,
                  meal: meal === 'none' ? null : meal,
                  mealOrder: meal === 'none' ? 0 : meal === 'breakfast' ? 1 : meal === 'sun' ? 2 : meal === 'moon' ? 3 : 4,
                  ingredients: recipeIngredients
                }
              )
            });
            } else {
            await addDoc(collection(firestore, 'recipe'), {
              date: currentDate,
              recipes: [
                {
                  name: recipeName,
                  meal: meal === 'none' ? null : meal,
                  mealOrder: meal === 'none' ? 0 : meal === 'breakfast' ? 1 : meal === 'sun' ? 2 : meal === 'moon' ? 3 : 4,
                  ingredients: recipeIngredients
                }
              ]
            });
          }
        }
        catch (error) {
          console.error('Error writing document: ', error);
        }
      }
      await updateDoc(recipeRef, {
        recipes: arrayRemove(recipe)
      });
      if(date !== null) {
        const updatedDoc: any = await getDoc(recipeRef);
        if(!updatedDoc.data().recipes.length) {
          await deleteDoc(recipeRef)
        }
      }
      setOpenUpdate(false);
    }

    const handleSpecificDate = () => {
      if(!specificDate){
        setCurrentDate(Date.now())
      }
      setSpecificDate(!specificDate)
    }
    
    return(
      <>
        <Swipeable renderLeftActions={renderSwipeable} renderRightActions={renderSwipeable} onSwipeableWillOpen={() => deleteRecipe(recipe)}>
        <View>
          <View style={style.nameRecipe}>
            <TouchableOpacity onPress={handleOpenUpdate} style={style.nameLeft}>
              <Text>{recipe.name}</Text>
            </TouchableOpacity>
            <View style={style.nameRight}>
              <IconLunch/>
              <IconCommunity name={chevronLunch} size={25} color="#000" onPress={() => handleOpenIngredients(chevronLunch, setChevronLunch, setDisplayedIngredientsLunch)}/>
            </View>
          </View>
          {recipe.ingredients?.map((ingredient: Ingredient, i: number) =>
            <Text key={`${recipe?.name}_${i}`} style={[style.ingredient, { display: displayedIngredientsLunch }]}>{ingredient.name} {ingredient.valid && <IconCommunity name="check-circle-outline" />}</Text>
          )}
        </View>
      </Swipeable>

      <Modal
      visible={openUpdate} 
      transparent={true} 
      animationType="fade"
      onRequestClose={handleCloseUpdate}
      >
        <View style={modalStyle.modal}>
            <View style={modalStyle.modalContainer}>
              <Text style={modalStyle.titleAddRecipe}>Modifier la recette</Text>
              <TextInput
                style={modalStyle.inputAddRecipe}
                placeholder='Nom de la recette'
                value={recipeName}
                onChangeText={text => setRecipeName(text)}
                returnKeyType="done" 
              />
              <View style={modalStyle.specificDate}>
                <Text>Spécifier une date</Text>
                <CheckBox disabled checked={specificDate} onPress={() => {handleSpecificDate()}} checkedColor='#ab62ff' />
                <IconLunchUpdatable/>
              </View>
              { specificDate && 
                <View style={modalStyle.datePickerBlock}>
                <TouchableOpacity onPress={showDatePicker}>
                    <View style={modalStyle.datePicker} >
                      <Text>{formatDate(currentDate)}</Text>
                    </View>
                </TouchableOpacity>
              </View>
              }

              <ListIngredients ingredients={ingredients} setRecipeIngredients={setRecipeIngredients} recipeIngredients={recipeIngredients} screen={'home'} />
              <View style={modalStyle.blockAddRecipe}>
                <TouchableHighlight onPress={handleUpdateRecipe} style={modalStyle.addRecipe}><Text style={modalStyle.addRecipeText}>MODIFIER</Text></TouchableHighlight>
              </View>
              <AntDesign style={modalStyle.closeRecipeModal} onPress={handleCloseUpdate} name={'close'} size={20}/>
            </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={date}
        />
      </Modal>
      </>
    )
}

export default RecipeItem