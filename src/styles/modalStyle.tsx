import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  modalContainerResult: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent:'space-between'
  },
  inputUpdate: {
    fontFamily: 'inter-regular',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  inputUpdateResult: {
    width: 'auto', 
    minWidth: 80, 
    textAlign:'center', 
    marginTop: 0, 
    padding: 0
  }
});