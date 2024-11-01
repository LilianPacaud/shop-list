import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from '../styles/listStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { DayRecipe } from '../types';
import Recipe from './Recipe';

type ListProps = {
  recipes: DayRecipe[],
  screen: string 
}

const ListRecip: React.FC<ListProps> = ({ recipes, screen }: ListProps) => {
  const [currentRecipes, setCurrentRecipes] = useState<DayRecipe[]>(recipes);
  
  useEffect(() => {
    setCurrentRecipes(recipes);
  }, [recipes]);

  const handleRecipeDeleted = (deletedItemId: string) => {
    setCurrentRecipes(prevItems => prevItems.filter(recipe => recipe.id !== deletedItemId));
  };

  return(
    <View style={styles.blockElements}>
      <ScrollView style={styles.elements}>
        {currentRecipes?.map((dayRecipes: DayRecipe, i: number) =>
        <View key={dayRecipes.id}>
          <Recipe key={dayRecipes.id} id={i} dayRecipe={dayRecipes} screen={screen} onDelete={handleRecipeDeleted}/>
        </View>
        )}
      </ScrollView>
    </View>
  )
}

export default ListRecip