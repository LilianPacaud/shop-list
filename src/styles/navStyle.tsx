import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    nav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      backgroundColor: 'rgba(92, 41, 41, 0.8)',
      margin: 10,
      borderRadius: 10
    },
    button: {
      width: 70,
      height: 70,
      padding: 40,
      borderRadius: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topLeft: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    bottomRight: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
});

