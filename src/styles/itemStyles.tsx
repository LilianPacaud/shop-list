import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    item: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      padding: 10,
      alignItems: 'center',
    },
    itemText: {
      width: '40%'
    },
    actions: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    action: {
      paddingLeft: 0
    },
    cost:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 5
    },
    costInput: {
      width: 15
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
    }
});

