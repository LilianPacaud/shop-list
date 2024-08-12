import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  blockElements: {
    width: '85%',
    height: '75%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 10
  },
  elements: {
    position: 'relative',
    height: '85%',
    overflow: 'scroll'
  },
});

