import { StyleSheet } from 'react-native';

export default StyleSheet.create({
modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent:'space-between',
  },
  inputUpdate: {
    fontFamily: 'inter-regular',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  titleAddRecipe: {
    fontWeight: 'bold'
  },
  inputAddRecipe: {
    fontFamily: 'inter-regular',
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  addIngredient: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1
  },
  inputAddIngredient: {
    fontFamily: 'inter-regular',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  inputUpdateResult: {
    width: 'auto', 
    minWidth: 80, 
    textAlign:'center', 
    marginTop: 0, 
    padding: 0
  },
  datePickerBlock:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20
  },
  datePicker: {
    borderColor: 'black',
    padding: 5,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginRight: 20
  },
  blockAddRecipe: {
    width: '100%',
    marginLeft: '10%',
    marginTop: 30
  },
  closeRecipeModal: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  addRecipe: {
    padding: 8,
    backgroundColor: '#997CB0',
    borderRadius: 5,
    width: '90%',
  },
  addRecipeText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  viewBtnEditItem: {
    width: '100%',
    marginLeft: '10%',
  },
  btnEditItem: {
    padding: 8,
    borderRadius: 5,
    width: '90%',
    marginTop: 10
  },
  closeItemModal: {
    position: 'absolute',
    top: 5,
    right: 5
  },
});