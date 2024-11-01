import { Keyboard, Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback, Platform } from 'react-native';
import styles from '../styles/resultStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getScreenColor } from '../functions';
import { Item } from '../types';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import modalStyle from '../styles/modalStyle';
import { database } from '../../firebaseConfig';
import { ref, onValue, set } from 'firebase/database';

type ResultProps = {
  screen: string,
  items: Item[]
}

const Result: React.FC<ResultProps> = ({ screen, items }: ResultProps) => {
  const [totalResto, setTotalResto] = useState<number>(0);
  const [totalNotResto, setTotalNotResto] = useState<number>(0);
  const [totalRestoFinal, setTotalRestoFinal] = useState<number>(0);
  const [totalNotRestoFinal, setTotalNotRestoFinal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [inputrestoMax, setInputrestoMax] = useState<string>('');
  const [restoMax, setRestoMax] = useState<number>(0);

  function roundTo(num: number) {
    const factor = Math.pow(10, 2)
    return Math.round(num * factor) / factor
  }

  useEffect(() => {
    const restoMaxRef = ref(database, 'restoMax');
    const unsubscribe = onValue(restoMaxRef, (snapshot) => {
      if (snapshot.exists()) {
        const value = snapshot.val();
        setRestoMax(value);
      } else {
        setRestoMax(0);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if(totalResto > restoMax) {
      setTotalRestoFinal(restoMax)
      setTotalNotRestoFinal(roundTo(totalResto - restoMax + totalNotResto))
    }
    else{
      setTotalRestoFinal(totalResto)
      setTotalNotRestoFinal(totalNotResto)
    }
  }, [restoMax, items]);

  useEffect(() => {
    setTotalResto(0);
    setTotalNotResto(0);
    setTotal(0);
    setTotalRestoFinal(0)
    setTotalNotRestoFinal(0)

    items.forEach(item => {
      const itemCost = typeof item.cost === 'string' ? parseFloat(item.cost) : item.cost;
      if (itemCost && !isNaN(itemCost)) {
        if (item.resto) {
          setTotalResto(prevCount => roundTo(prevCount + itemCost));
        }
        if (!item.resto) {
          setTotalNotResto(prevCount => roundTo(prevCount + itemCost));
        }
        setTotal(prevCount => roundTo(prevCount + itemCost));
      }
    });
  }, [items]);

  useEffect(() => {
    if (totalResto > restoMax) {
      setTotalRestoFinal(restoMax);
      setTotalNotRestoFinal(roundTo(totalResto - restoMax + totalNotResto));
    } else {
      setTotalRestoFinal(totalResto);
      setTotalNotRestoFinal(totalNotResto);
    }
  }, [totalResto, totalNotResto, restoMax]);

  const handleOpenUpdate = () => {
    setInputrestoMax(restoMax.toString())
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleSubmit = async () => {
    set(ref(database, 'restoMax'), !isNaN(parseFloat(inputrestoMax)) ? parseFloat(inputrestoMax).toString() : '25');
    setOpenUpdate(false);
  };

  let color = getScreenColor(screen, '1');

  return (
    <View style={[styles.results, { borderTopColor: color }]}>
      <View style={styles.resultsLeft}>
        <TouchableOpacity style={styles.resultsBlock} onPress={handleOpenUpdate}>
          <Icon name="silverware-fork-knife" size={15} color="#000" />
          <Text style={styles.resultsText}>{totalRestoFinal}€</Text>
        </TouchableOpacity>
        <View style={styles.resultsBlock}>
          <Icon name="home" size={15} color="#000" />
          <Text style={styles.resultsText}>{totalNotRestoFinal}€</Text>
        </View>
      </View>
      <Text style={[styles.totalFinal, { color }]}>{total}€</Text>

      <Modal 
        visible={openUpdate} 
        transparent={true} 
        animationType="fade"
        onRequestClose={handleCloseUpdate}
      >
        <TouchableWithoutFeedback onPress={handleCloseUpdate}>
          <View style={modalStyle.modal}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={[modalStyle.modalContainer, modalStyle.modalContainerResult]}>
                <Text>Total Carte Resto Max: </Text>
                <TextInput
                  style={[modalStyle.inputUpdate, modalStyle.inputUpdateResult]}
                  value={inputrestoMax}
                  keyboardType="numeric" 
                  inputMode={Platform.OS === 'ios' ? 'text' : 'numeric'}
                  onChangeText={text => setInputrestoMax(text)}
                  onSubmitEditing={handleSubmit}
                  maxLength={5}
                  returnKeyType="done" 
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default Result;
