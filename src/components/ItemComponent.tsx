import React, { useState } from 'react';
import { Text, View } from 'react-native';
import itemStyles from '../styles/itemStyles';
import DashedBorder from './DashedBorder';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput } from 'react-native-gesture-handler';
import { Item } from '../types';
import { getScreenColor } from '../functions';

type ItemProps = {
  id: number,
  item: Item,
  screen: string 
}

const ItemComponent: React.FC<ItemProps> = ({ id, item, screen }: ItemProps) => {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [checkValid, setCheckValid] = useState(false);
    const [count, setCount] = useState(1)
    const [cost, setCost] = useState('0')
    const [costWidth, setCostWidth] = useState(10)

    let color = getScreenColor(screen, '1')

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



    return(
      <View>
        {id !== 0 && <DashedBorder screen={screen}/>}
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
              <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0}} size={25} checked={check1} onPress={() => setCheck1(!check1)} />
            </View>
            <View style={[itemStyles.action, itemStyles.checkWithIcon]}>
              <Icon name="numeric-2-circle-outline" size={15} color="#000" />
              <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0}} size={25} checked={check2} onPress={() => setCheck2(!check2)}/>
            </View>
            <View style={[itemStyles.action, itemStyles.checkWithIcon]}>
              <Icon name="check-circle-outline" size={15} color="#000" />
              <CheckBox checkedColor={color} wrapperStyle={{marginLeft: -2, marginRight: -7}} containerStyle={{padding: 0 }} size={25} checked={checkValid} onPress={() => setCheckValid(!checkValid)}/>
            </View>
            <View style={[itemStyles.action, itemStyles.count]}>
              <View style={itemStyles.countArrow}>
                <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-up" size={25} color="#000" onPress={() => setCount(count + 1)} />
                <Text>{count}</Text>
                <Icon style={{marginTop: -7, marginBottom: -7}} name="chevron-down" size={25} color="#000" onPress={() => setCount(count !== 1 ? count - 1: 1)} />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
}

export default ItemComponent