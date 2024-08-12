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
    const [totalResto, setTotalResto] = useState<number>(0);
    const [totalNotResto, setTotalNotResto] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    function roundTo(num: number) {
      const factor = Math.pow(10, 2)
      return Math.round(num * factor) / factor
    }

    useEffect(() => {
      setTotalResto(0)
      setTotalNotResto(0)
      setTotal(0)

      items.forEach(item => {
      const itemCost = typeof item.cost === 'string' ? parseFloat(item.cost) : item.cost;
      if (itemCost && !isNaN(itemCost)) {
        if (item.resto) {
          setTotalResto(prevCount => roundTo(prevCount + itemCost))
        }
        if (!item.resto) {
          setTotalNotResto(prevCount => roundTo(prevCount + itemCost));
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
            <Icon name="silverware-fork-knife" size={15} color="#000" />
            <Text style={styles.resultsText}>{totalResto}€</Text>
          </View>
          <View style={styles.resultsBlock}>
            <Icon name="home" size={15} color="#000" />
            <Text style={styles.resultsText}>{totalNotResto}€</Text>
          </View>
        </View>
        <Text style={[styles.totalFinal, {color}]}>{total}€</Text>
      </View>
    )
}

export default Result