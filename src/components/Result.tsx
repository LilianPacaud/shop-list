import { Text, View } from 'react-native';
import styles from '../styles/resultStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getScreenColor } from '../functions';

type ResultProps = {
  screen: string 
}

const Result: React.FC<ResultProps> = ({ screen }: ResultProps) => {
    let color = getScreenColor(screen, '1')
    return(
      <View style={[styles.results, {borderTopColor: color}]}>
        <View style={styles.resultsLeft}>
          <Text style={styles.resultsText}>Total</Text>
          <View>
            <Icon name="numeric-1-circle-outline" size={15} color="#000" />
            <Text style={styles.resultsText}>0€</Text>
          </View>
          <View>
            <Icon name="numeric-2-circle-outline" size={15} color="#000" />
            <Text style={styles.resultsText}>0€</Text>
          </View>
          <View>
            <Icon name="check-circle-outline" size={15} color="#000" />
            <Text style={styles.resultsText}>0€</Text>
          </View>
        </View>
        <Text style={[styles.totalFinal, {color}]}>0€</Text>
      </View>
    )
}

export default Result