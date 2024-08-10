import React, { useEffect, useState } from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import itemStyles from '../styles/itemStyles';
import DashedBorder from './DashedBorder';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { GestureHandlerRootView, Swipeable, TextInput } from 'react-native-gesture-handler';
import { Item } from '../types';
import { getScreenColor } from '../functions';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import Animated from 'react-native-reanimated';

type ItemProps = {
  id: number,
  item: Item,
  screen: string,
  onDelete: (itemId: string) => void,
}

const ItemComponent: React.FC<ItemProps> = ({ id, item, screen, onDelete }: ItemProps) => {
    const [checkPrimary, setCheckPrimary] = useState(item.primary);
    const [checkSecondary, setCheckSecondary] = useState(item.secondary);
    const [checkValid, setCheckValid] = useState(item.valid);
    const [count, setCount] = useState(item.count)
    const [cost, setCost] = useState('0')
    const [costWidth, setCostWidth] = useState(10)

    let color = getScreenColor(screen, '1')

    useEffect(() => {
      setCheckPrimary(item.primary);
    }, [item.primary]);
    
    useEffect(() => {
      setCheckSecondary(item.secondary);
    }, [item.secondary]);

    useEffect(() => {
      setCheckValid(item.valid);
    }, [item.valid]);

    useEffect(() => {
      setCount(item.count)
    }, [item.count]);

    const handleChangeText = (text: string) => {
      const numericValue = text.replace(/[^0-9]/g, '');
      const num = parseInt(numericValue, 10);
      if(!isNaN(num) && cost === '0'){
          setCost(num.toString())
          setCostWidth(10)
      } else if (!isNaN(num) && num >= 0 && num <= 99) {
          setCost(numericValue);
          if(num <= 9){
              setCostWidth(10)
          }
          else{
              setCostWidth(20)
          }
      } else if (text === '') {
        setCostWidth(10)
        setCost('0');
      }
    };

    const docRef = doc(firestore, 'list', item.id);


    const updateCheck = async (check: boolean, type: string) => {
      try {
        await updateDoc(docRef, { [type]: check });
      } catch (error) {
        console.error('Error updating document:', error);
      }
    };

    const updateCount = async (count: number) => {
      try {
        await updateDoc(docRef, {count});
        setCount(count)
      } catch (error) {
        console.error('Error updating document:', error);
      }
    };

    const deleteItem = async () => {
      try {
        await deleteDoc(docRef);
        onDelete(item.id);
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    };
  
    const renderSwipeable = () => {
      return (
        <Animated.View style={[itemStyles.actionContainer]} />
      );
    };


    return(
      <View>
        {id !== 0 && <DashedBorder screen={screen}/>}
        <TouchableOpacity onPress={openUpdateFct}>
        <GestureHandlerRootView>
        <Swipeable renderLeftActions={renderSwipeable} renderRightActions={renderSwipeable}  onSwipeableWillOpen={deleteItem}>
        <View style={itemStyles.item}>
          <Text style={itemStyles.itemText}>{item.name}</Text>
          <View style={itemStyles.actions}>
            <View style={[itemStyles.action, itemStyles.cost]}>
              <TextInput
                style={[itemStyles.costInput, {width: costWidth}]}
                value={cost}
                onChangeText={handleChangeText}
                keyboardType="numeric"
              />
              <Text>€</Text>
            </View>
            <View style={[itemStyles.action, itemStyles.checkWithIcon]}>
              <Icon name="numeric-1-circle-outline" size={15} color="#000" />
              <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0}} size={25} checked={checkPrimary} onPress={() => {updateCheck(!checkPrimary, 'primary')}} />
            </View>
            <View style={[itemStyles.action, itemStyles.checkWithIcon]}>
              <Icon name="numeric-2-circle-outline" size={15} color="#000" />
              <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0}} size={25} checked={checkSecondary} onPress={() => {updateCheck(!checkSecondary, 'secondary')}}/>
            </View>
            <View style={[itemStyles.action, itemStyles.checkWithIcon]}>
              <Icon name="check-circle-outline" size={15} color="#000" />
              <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0 }} size={25} checked={checkValid} onPress={() => {updateCheck(!checkValid, 'valid')}}/>
            </View>
            <View style={[itemStyles.action, itemStyles.count]}>
              <View style={itemStyles.countArrow}>
                <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-up" size={25} color="#000" onPress={() => updateCount(count ? count + 1 : 1)} />
                <Text>{count}</Text>
                <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-down" size={25} color="#000" onPress={() => updateCount(count && count > 1 ? count - 1 : 1)} />
              </View>
            </View>
          </View>
        </View>
        </Swipeable>
        </GestureHandlerRootView>
        </TouchableOpacity>

      </View>
    )
}

export default ItemComponent