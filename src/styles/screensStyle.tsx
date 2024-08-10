import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    homeSeparator:  {
      width: '30%', 
      backgroundColor: 'rgba(92,41,41,1)', 
      height: 2, 
      margin: 30
    },      
    inputAdd: {
      height: 40,
      margin: 12,
      padding: 10,
      borderBottomWidth: 1
    },
    iconAdd: {
      position: 'absolute', 
      right: -25
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
      alignItems: 'center',
    },
    element: {
      padding: 10,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    icon: {
      marginBottom: 10,
    },
    checkboxContainer: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    checkboxText: {
      fontSize: 16,
    },
});

