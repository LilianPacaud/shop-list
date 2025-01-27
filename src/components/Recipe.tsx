import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import itemStyles from '../styles/itemStyles';
import style from '../styles/recipeStyles';
import DashedBorder from './DashedBorder';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { DayRecipe, Ingredient } from '../types';
import { deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import RecipeItem from './RecipeItem';

type RecipeProps = {
  id: number,
  dayRecipe: DayRecipe,
  allRecipes: DayRecipe[]
  screen: string,
  onDelete: (itemId: string) => void,
}

const formatDateToFrench = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return formatter.format(date);
};

const Recipe: React.FC<RecipeProps> = ({ id, dayRecipe, allRecipes, screen, onDelete }: RecipeProps) => {
    const [chevronLunch, setChevronLunch] = useState<string>('chevron-down');
    const [displayedIngredientsLunch, setDisplayedIngredientsLunch] = useState<'none' | 'flex'>('none');

    const [chevronDinner, setChevronDinner] = useState<string>('chevron-down');
    const [displayedIngredientsDinner, setDisplayedIngredientsDinner] = useState<'none' | 'flex'>('none');

    const recipeRef = doc(firestore, 'recipe', dayRecipe.id);

    let date = null
    let formattedDate = null

    if(dayRecipe?.date?.toDate()){
      date = dayRecipe?.date?.toDate();
      formattedDate = formatDateToFrench(date); 
    } else {
      formattedDate = 'Sans date'
    }

    const renderSwipeable = () => {
      return (
        <Animated.View style={[itemStyles.actionContainer]} />
      );
    };

    return(
      <View>
        {id !== 0 && <DashedBorder screen={screen}/>}
        <GestureHandlerRootView>
        <View>
          <View>
            <View style={style.recipe}>
                <Text style={{textAlign: 'center'}}>{formattedDate}</Text>
              {dayRecipe.recipes.map((recipe: { name: string, meal: string, ingredients: any }) => 
              <RecipeItem allRecipes={allRecipes} recipe={recipe} recipeRef={recipeRef} date={date}/>
              )}
            </View>
          </View>
        </View>
        </GestureHandlerRootView>
    </View>
    )
}

export default Recipe