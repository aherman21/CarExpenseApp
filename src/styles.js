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
    height: 40, // Specify the height of the button
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
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
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    padding: 10, 
  },
  leftText: {
    flex: 1,
    textAlign: 'left', 
  },
  rightText: {
    flex: 0,
    textAlign: 'right', 
  },
  modalView: {
    height: 500,
    width: 200,
    backgroundColor: "#EFEFEF",
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
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: "#78C5EF",
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Align items at each end
    alignItems: 'center', // Center items vertically
    paddingHorizontal: 16, // Add some horizontal padding
    borderRadius: 8, // Add border radius for a rounded appearance
  },
  
  removeButton: {
    backgroundColor: "#E74C3C", // Use a different color for the button
    paddingVertical: 8, // Adjust vertical padding
    paddingHorizontal: 12, // Adjust horizontal padding
    borderRadius: 6, // Add border radius for a rounded appearance
  },
  
  removeButtonText: {
    color: "#FFFFFF", // Text color for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  tripText: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#EFEFEF',
  },
  passengerItem: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  passengerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  passengerInfo: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666666', // Slightly lighter gray text color
  },
  bolded: {
    fontWeight: 'bold',
  }
});