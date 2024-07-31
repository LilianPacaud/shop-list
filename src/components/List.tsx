import React from 'react';
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
    return(
      <View style={styles.blockElements}>
        <ScrollView style={styles.elements}>
          {items.map((item: Item, i: number) =>
          <View>
            <ItemComponent id={i} item={item} screen={screen} />
          </View>
          )}
        </ScrollView>
        <Result screen={screen} />
      </View>
    )
}

export default List