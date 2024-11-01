import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    homeIcon: {
      width: 50,
      height: 50
    },
    homeSeparator:  {
      width: '30%', 
      backgroundColor: 'rgba(92,41,41,1)', 
      height: 2, 
      margin: 15
    },      
    inputAdd: {
      fontFamily: 'inter-regular',
      height: 40,
      margin: 12,
      padding: 10,
      borderBottomWidth: 1,
      width: '35%'
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
    navigateRecipe: {
      position: 'absolute',
      left: 20,
      top: 20,
      width: 50,
      height: 50,
    },
    buttonAddRecipe: {
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      borderRadius: 10,
      fontFamily: 'inter-regular',
      padding: 15,
      margin: 10
    },
    buttonAddRecipeText: {
      marginLeft: 5
    },
});

