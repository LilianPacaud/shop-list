import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
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
    const [checkResto, setCheckResto] = useState(item.resto);
    const [count, setCount] = useState(item.count)
    const [cost, setCost] = useState(item.cost?.toString())
    const [openUpdate, setOpenUpdate] = useState(false)
    const [inputValue, setInputValue] = useState(item.name);

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
      setCheckResto(item.resto);
    }, [item.resto]);

    useEffect(() => {
      setCount(item.count)
    }, [item.count]);

    const docRef = doc(firestore, 'list', item.id);

    const handleChangeCost = (text: string) => {
      text = text.replace(/,/g, '.');
      const cleanedText = text.replace(/[^0-9.]/g, '');
      const parts = cleanedText.split('.');
      if (parts.length > 2) {
        text = parts.shift() + '.' + parts.join('');
        setCost(text);
      } else if (!parseFloat(text) || parseFloat(text) < 100) {
        if(parts[1] && parts[1].length > 2){
          text = parts[0] + '.' + parts[1].slice(0, -1)
        }
        else{
          text = cleanedText;
        }
        setCost(text);
      }
    };

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

    const dismissKeyboard = () => {
      Keyboard.dismiss();
    };

    const handleOpenUpdate = () => {
      setOpenUpdate(true)
    };

    const handleCloseUpdate = () => {
      setOpenUpdate(false);
    };

    const handleSubmit = async () => {
      const docRef = doc(firestore, 'list', item.id);
      try {
        await updateDoc(docRef, {
          name: inputValue,
          cost: !isNaN(parseFloat(cost ?? '0')) ? parseFloat(cost ?? '0') : '0'
        });
        setOpenUpdate(false);
        console.log('Document successfully updated!');
      } catch (error) {
        console.error('Error updating document:', error);
      }
    };

    return(
      <View>
        {id !== 0 && <DashedBorder screen={screen}/>}
        <GestureHandlerRootView>
        <Swipeable renderLeftActions={renderSwipeable} renderRightActions={renderSwipeable}  onSwipeableWillOpen={deleteItem}>
        <View style={itemStyles.item}>
          <TouchableOpacity style={itemStyles.nameCost} onPress={handleOpenUpdate}>
            <View style={itemStyles.nameCostInside}>
              <Text style={itemStyles.itemText}>{item.name}</Text>
              <Text style={[itemStyles.action, itemStyles.cost]}> {item.cost ?? 0}€</Text>
            </View>
          </TouchableOpacity>
          <View style={itemStyles.actions}>
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
            <View style={[itemStyles.action, itemStyles.checkWithIcon]}>
              <Icon name="silverware-fork-knife" size={15} color="#000" />
              <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0}} size={25} checked={checkResto} onPress={() => {updateCheck(!checkResto, 'resto')}} />
            </View>
            <View style={[itemStyles.action, itemStyles.count]}>
              <View style={itemStyles.countArrow}>
                <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-up" size={25} color="#000" onPress={() => updateCount(count ? count + 1 : 1)} />
                <Text style={itemStyles.countText}>{count}</Text>
                <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-down" size={25} color="#000" onPress={() => updateCount(count && count > 1 ? count - 1 : 1)} />
              </View>
            </View>
          </View>
        </View>
        </Swipeable>
        </GestureHandlerRootView>

      <Modal 
      visible={openUpdate} 
      transparent={true} 
      animationType="fade"
      onRequestClose={handleCloseUpdate}
      >
        <TouchableWithoutFeedback onPress={handleCloseUpdate}>
          <View style={itemStyles.modalUpdate}>
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={itemStyles.modalContainer}>
                <TouchableOpacity onPress={handleCloseUpdate} style={itemStyles.modalCloseButton}>
                </TouchableOpacity>
                <TextInput
                  style={itemStyles.inputUpdate}
                  value={inputValue}
                  onChangeText={text => setInputValue(text)}
                  onSubmitEditing={handleSubmit}
                  returnKeyType="done" 
                />
                <View style={itemStyles.costUpdateBlock}>
                <View style={itemStyles.costUpdateBlockInput}>
                    <TextInput
                    style={[itemStyles.costInput]}
                    value={cost}
                    onChangeText={handleChangeCost}
                    keyboardType="numeric" 
                    inputMode={Platform.OS === 'ios' ? 'text' : 'numeric'}
                    onSubmitEditing={handleSubmit}
                    maxLength={5}
                    returnKeyType="done" 
                    />
                  </View>
                <View style={itemStyles.actionsUpdate}>
                  <View style={itemStyles.actionsCheck}>
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
                    <View style={[itemStyles.action, itemStyles.checkWithIcon]}>
                      <Icon name="silverware-fork-knife" size={15} color="#000" />
                      <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0}} size={25} checked={checkResto} onPress={() => {updateCheck(!checkResto, 'resto')}} />
                    </View>
                  </View>
                  <View style={[itemStyles.action, itemStyles.count]}>
                    <View style={itemStyles.countArrow}>
                      <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-up" size={25} color="#000" onPress={() => updateCount(count ? count + 1 : 1)} />
                      <Text style={itemStyles.countText}>{count}</Text>
                      <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-down" size={25} color="#000" onPress={() => updateCount(count && count > 1 ? count - 1 : 1)} />
                    </View>
                  </View>
                </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    )
}

export default ItemComponent