import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from '../styles/listStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { DayRecipes } from '../types';
import Recipe from './Recipe';

type ListProps = {
  recipes: DayRecipes[],
  screen: string 
}

const ListRecip: React.FC<ListProps> = ({ recipes, screen }: ListProps) => {
  const [currentRecipes, setCurrentRecipes] = useState<DayRecipes[]>(recipes);
  
  useEffect(() => {
    setCurrentRecipes(recipes);
  }, [recipes]);

  return(
    <View style={styles.blockElements}>
      <ScrollView style={styles.elements}>
        {currentRecipes?.map((dayRecipes: DayRecipes, i: number) =>
        <View key={dayRecipes.id}>
          <Recipe key={dayRecipes.id} id={i} dayRecipe={dayRecipes} screen={screen} />
        </View>
        )}
      </ScrollView>
    </View>
  )
}

export default ListRecip