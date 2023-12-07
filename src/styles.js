import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center', // Center items vertically
    borderBottomWidth: 1, // Add a bottom border
    borderColor: '#ccc', // Set border color
    marginBottom: 10
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
    backgroundColor: '#007bff', // Change to the desired shade of blue
    borderRadius: 20, // Adjust the value to control the roundness of the edges
    padding: 10,
    width: "50%",
    alignSelf: 'center',
    marginBottom: 10
  },
  
  addButtonText: {
    color: '#fff', // Set the text color to white
    fontSize: 18, // Set the font size
    textAlign: 'center', // Center the text horizontally within the button
  },

  endButton: {
    backgroundColor: '#fef200',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
  endButtonContainer: {
    marginBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonImage: {
    width: 20,
    height: 20,
    marginLeft: 17,
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
  passengerButton: {
    fontSize: 15,
    padding: 10,
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black'
  },
  passengerItem: {
    marginTop: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // This ensures vertical alignment
    padding: 10, // Adjust the padding as needed
  },
  leftText: {
    flex: 1,
    textAlign: 'left', // Align text to the left
  },
  rightText: {
    flex: 0,
    textAlign: 'right', // Align text to the right
  },
  modalView: {
    height: 300,
    width: 200,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  closeButton: {
    backgroundColor: '#007bff', // Change to the desired shade of blue
    borderRadius: 20, // Adjust the value to control the roundness of the edges
    padding: 10,
    width: "50%",
    alignSelf: 'center',
    marginBottom: 10

  },
  closeButtonText:{
    color: '#fff', // Set the text color to white'
    textAlign: "center",
  },
  closeMainButton: {
    backgroundColor: '#007bff', // Change to the desired shade of blue
    borderRadius: 20, // Adjust the value to control the roundness of the edges
    padding: 10,
    width: "50%",
    alignSelf: 'center',
    marginBottom: 10

  },
  closeMainButtonText:{
    color: '#fff', // Set the text color to white'
    textAlign: "center",
  },
  tripItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tripText: {
    fontSize: 18,
  }
});