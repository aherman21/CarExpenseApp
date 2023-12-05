import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#000',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#0000FF',
    borderRadius: 20,
    padding: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    padding: 20,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFA500',
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  innerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  editButtonText: {
    color: '#000',
    marginRight: 10,
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#ddd',
  },
});