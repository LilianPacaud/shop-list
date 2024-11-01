import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from '../styles/listStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { Item } from '../types';
import Ingredient from './Ingredient';

type ListProps = {
  ingredients: Item[],
  recipeIngredients: Item[]
  setRecipeIngredients: any
  screen: string 
}

const ListIngredients: React.FC<ListProps> = ({ ingredients, setRecipeIngredients, recipeIngredients, screen }: ListProps) => {
  const [currentItems, setCurrentItems] = useState<Item[]>(ingredients);
  
  useEffect(() => {
    setCurrentItems(ingredients);
  }, [ingredients]);

  const handleItemDeleted = (deletedItemId: string) => {
    setCurrentItems(prevItems => prevItems.filter(item => item.id !== deletedItemId));
  };

  return(
    <View style={styles.blockElementsIngredients}>
      <ScrollView style={styles.elements}>
        {currentItems.map((item: Item, i: number) =>
        <View key={item.id}>
          <Ingredient recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients} key={item.id} id={i} item={item} screen={screen} onDelete={handleItemDeleted} />
        </View>
        )}
      </ScrollView>
    </View>
  )
}

export default ListIngredients