import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from '../styles/listStyles';
import { ScrollView } from 'react-native-gesture-handler';
import ItemComponent from './ItemComponent';
import Result from './Result';
import { Item } from '../types';

type ListProps = {
  items: Item[],
  screen: string 
}

const List: React.FC<ListProps> = ({ items, screen }: ListProps) => {
  const [currentItems, setCurrentItems] = useState<Item[]>(items);
  
  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const handleItemDeleted = (deletedItemId: string) => {
    setCurrentItems(prevItems => prevItems.filter(item => item.id !== deletedItemId));
  };

  return(
    <View style={styles.blockElements}>
      <ScrollView style={styles.elements}>
        {currentItems.map((item: Item, i: number) =>
        <View key={item.id}>
          <ItemComponent key={item.id} id={i} item={item} screen={screen} onDelete={handleItemDeleted} />
        </View>
        )}
      </ScrollView>
      <Result screen={screen} items={items} />
    </View>
  )
}

export default List