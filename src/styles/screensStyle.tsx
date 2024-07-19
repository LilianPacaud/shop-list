import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10
    },
    logo: {
      marginTop: 17,
      height: 65
    },
    logoFlex: {
      display: 'flex',
      flexDirection: 'row'
    },
    addElement: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewElements: {
      width: '80%',
      height: '70%',
      backgroundColor: 'black',
      marginTop: 10,
      borderRadius: 10
    },
});

