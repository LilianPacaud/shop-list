import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    item: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nameCost: {
      width: '45%',
    },
    nameCostInside: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      paddingLeft: 10,
    },
    itemText: {
      fontFamily: 'inter-regular',
      width: 'auto',
      maxWidth: '80%'
    },
    actions: {
      display: 'flex',
      width: '70%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 0
    },
    actionsUpdate: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 10
    },
    actionsCheck: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    action: {
      paddingLeft: 0
    },
    cost:{
      fontFamily: 'inter-regular',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    costInput: {
      fontFamily: 'inter-regular',
      width: 70,
      borderWidth: 1,
      borderRadius: 5,
      padding: 3,
      textAlign: 'center'
    },
    costUpdateBlock: {
      display: 'flex', 
      flexDirection: 'row', 
      width: '100%', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginTop: 20
    },
    costUpdateBlockInput: {
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center',
      width: '30%'
    },
    estimatedCost: {
      fontFamily: 'inter-regular',
      width: '70%'
    },
    costUpdateEuroSymbol: { 
      fontSize: 20, 
      marginLeft: 3 
    },
    checkWithIcon: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    count: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    countArrow: {
      display: 'flex',
      alignItems: 'center'
    },
    countText: {
      fontFamily: 'inter-regular'
    },
    actionContainer: {
      flex: 1,
    },
    deleteButton: {
      backgroundColor: '#fff',
      padding: 20,
    },
    deleteText: {
      color: 'white',
      fontWeight: 'bold',
    },
    modalUpdate: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20,
    },
    modalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    modalCloseButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      fontSize: 20,
      color: '#333',
    },
    inputUpdate: {
      fontFamily: 'inter-regular',
      width: '100%',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
    },
});

