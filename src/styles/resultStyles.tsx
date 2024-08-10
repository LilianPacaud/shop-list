import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  results: {
    height: '15%',
    borderWidth: 2,
    borderBottomColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  resultsLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    alignItems: 'center'
  },
  totalFinal: {
    fontFamily: 'inter-bold',
    fontSize: 40,
  },
  resultsBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  resultsText: {
    fontFamily: 'inter-regular',
    fontSize: 18,
  }
});

