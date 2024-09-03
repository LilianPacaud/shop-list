import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import itemStyles from '../styles/itemStyles';
import style from '../styles/recipeStyles';
import DashedBorder from './DashedBorder';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { DayRecipes, Ingredient } from '../types';

type RecipeProps = {
  id: number,
  dayRecipe: DayRecipes,
  screen: string,
}

const formatDateToFrench = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return formatter.format(date);
};

const Recipe: React.FC<RecipeProps> = ({ id, dayRecipe, screen }: RecipeProps) => {
    const [chevronLunch, setChevronLunch] = useState<string>('chevron-down');
    const [displayedIngredientsLunch, setDisplayedIngredientsLunch] = useState<'none' | 'flex'>('none');

    const [chevronDinner, setChevronDinner] = useState<string>('chevron-down');
    const [displayedIngredientsDinner, setDisplayedIngredientsDinner] = useState<'none' | 'flex'>('none');

    let date = null
    let formattedDate = null

    if(dayRecipe?.date?.toDate()){
      date = dayRecipe?.date?.toDate();
      formattedDate = formatDateToFrench(date); 
    }

    const renderSwipeable = () => {
      return (
        <Animated.View style={[itemStyles.actionContainer]} />
      );
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

    return(
      <View>
        {id !== 0 && <DashedBorder screen={screen}/>}
        <GestureHandlerRootView>
        <Swipeable renderLeftActions={renderSwipeable} renderRightActions={renderSwipeable}>
        <View>
          <View>
            <View style={style.recipe}>
              <TouchableOpacity>
                <Text style={{textAlign: 'center'}}>{formattedDate}</Text>
              </TouchableOpacity>
              {dayRecipe?.lunch && <TouchableOpacity onPress={() => handleOpenIngredients(chevronLunch, setChevronLunch, setDisplayedIngredientsLunch)}>
                <View style={style.nameRecipe}>
                  <View style={style.nameLeft}>
                    <Text>{dayRecipe.lunch.name}</Text>
                    <IconCommunity name={chevronLunch} size={25} color="#000" />
                  </View>
                  <Octicons name="sun" size={20} color="#000" />
                </View>
                {dayRecipe.lunch.ingredients?.map((ingredient: Ingredient, i: number) =>
                  <Text key={`${dayRecipe.lunch?.name}_${i}`} style={[style.ingredient, { display: displayedIngredientsLunch }]}>{ingredient.name} {ingredient.valid && <IconCommunity name="check-circle-outline" />}</Text>
                )}
              </TouchableOpacity>}
              {dayRecipe?.dinner && <TouchableOpacity onPress={() => handleOpenIngredients(chevronDinner, setChevronDinner, setDisplayedIngredientsDinner)}>
                <View style={style.nameRecipe}>
                  <View style={style.nameLeft}>
                    <Text>{dayRecipe.dinner.name}</Text>
                    <IconCommunity name={chevronDinner} size={25} color="#000" />
                  </View>
                  <Octicons name="moon" size={20} color="#000" />
              </View>
                {dayRecipe.dinner.ingredients?.map((ingredient: Ingredient, i: number) =>
                   <Text key={`${dayRecipe.dinner?.name}_${i}`} style={[style.ingredient, {display: displayedIngredientsDinner}]}>{ingredient.name} {ingredient.valid && <IconCommunity name="check-circle-outline" />}</Text>
                )}
              </TouchableOpacity> }
            </View>
          </View>
        </View>
        </Swipeable>
        </GestureHandlerRootView>
    </View>
    )
}

export default Recipe