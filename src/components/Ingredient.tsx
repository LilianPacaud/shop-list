import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import itemStyles from '../styles/itemStyles';
import { Item } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type ItemProps = {
  id: number,
  item: Item,
  recipeIngredients: Item[]
  setRecipeIngredients: any
}

const Ingredient: React.FC<ItemProps> = ({ id, item, recipeIngredients, setRecipeIngredients }: ItemProps) => {
    const [currentIcon, setCurrentIcon] = useState(recipeIngredients.find((recipe) => recipe.name === item.name) ? 'plus' : 'minus');
    const [color, setColor] = useState(recipeIngredients.find((recipe) => recipe.name === item.name) ? 'green' : 'red');

    const updateIngredient = async () => {
      switch (currentIcon) {
        case 'plus':
          setCurrentIcon('minus')
          setColor('red')
          setRecipeIngredients(recipeIngredients.filter(ingredient => ingredient.id !== `list/${item.id}`))
          break;
        case 'minus':
          setCurrentIcon('plus')
          setColor('green')
          recipeIngredients.push({id: `list/${item.id}`, name: item.name, valid: item.valid})
          break;
        default:
          setCurrentIcon('minus')
          setColor('red')
      }

    };

    return(
      <TouchableOpacity onPress={() => {updateIngredient()}} style={itemStyles.ingredientBlock}>
        <Icon style={{color}} name={currentIcon} size={20} color="#000" />
        <Text style={[itemStyles.ingredientText, {color}]}>{item.name}</Text>
      </TouchableOpacity>
    )
}

export default Ingredient