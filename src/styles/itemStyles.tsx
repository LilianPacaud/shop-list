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
});

