import React, { useState } from 'react';
import { Text, View } from 'react-native';
import itemStyles from '../styles/itemStyles';
import { Item } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

type ItemProps = {
  id: number,
  item: Item,
  recipeIngredients: Item[]
  setRecipeIngredients: any
  screen: string,
  onDelete: (itemId: string) => void,
}

const Ingredient: React.FC<ItemProps> = ({ id, item, recipeIngredients, setRecipeIngredients, screen, onDelete }: ItemProps) => {
    const [currentIcon, setCurrentIcon] = useState('minus');
    const [color, setColor] = useState('red');

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
      <TouchableWithoutFeedback style={itemStyles.ingredientBlock}>
        <Icon onPress={() => {updateIngredient()}} style={{color}} name={currentIcon} size={20} color="#000" />
        <Text onPress={() => {updateIngredient()}} style={[itemStyles.ingredientText, {color}]}>{item.name}</Text>
      </TouchableWithoutFeedback>
    )
}

export default Ingredient