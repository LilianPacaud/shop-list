import { Text, View } from 'react-native';
import styles from '../styles/resultStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getScreenColor } from '../functions';
import { Item } from '../types';
import { useEffect, useState } from 'react';

type ResultProps = {
  screen: string,
  items: Item[]
}

const Result: React.FC<ResultProps> = ({ screen, items }: ResultProps) => {
    const [totalPrimary, setTotalPrimary] = useState<number>(0);
    const [totalSecondary, setTotalSecondary] = useState<number>(0);
    const [totalValid, setTotalValid] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    function roundTo(num: number) {
      const factor = Math.pow(10, 2)
      return Math.round(num * factor) / factor
    }

    useEffect(() => {
      setTotalPrimary(0)
      setTotalSecondary(0)
      setTotalValid(0)
      setTotal(0)

      items.forEach(item => {
      const itemCost = typeof item.cost === 'string' ? parseFloat(item.cost) : item.cost;
      if (itemCost && !isNaN(itemCost)) {
        if (item.primary) {
          setTotalPrimary(prevCount => roundTo(prevCount + itemCost))
        }
        if (item.secondary) {
          setTotalSecondary(prevCount => roundTo(prevCount + itemCost));
        }
        if (item.valid) {
          setTotalValid(prevCount => roundTo(prevCount + itemCost));
        }
        setTotal(prevCount => roundTo(prevCount + itemCost));
      }
      });
    }, [items]);

    let color = getScreenColor(screen, '1')
    return(
      <View style={[styles.results, {borderTopColor: color}]}>
        <View style={styles.resultsLeft}>
          <View style={styles.resultsBlock}>
            <Icon name="numeric-1-circle-outline" size={15} color="#000" />
            <Text style={styles.resultsText}>{totalPrimary}€</Text>
          </View>
          <View style={styles.resultsBlock}>
            <Icon name="numeric-2-circle-outline" size={15} color="#000" />
            <Text style={styles.resultsText}>{totalSecondary}€</Text>
          </View>
          <View style={styles.resultsBlock}>
            <Icon name="check-circle-outline" size={15} color="#000" />
            <Text style={styles.resultsText}>{totalValid}€</Text>
          </View>
        </View>
        <Text style={[styles.totalFinal, {color}]}>{total}€</Text>
      </View>
    )
}

export default Result