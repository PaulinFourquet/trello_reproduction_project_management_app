import { StyleSheet } from 'react-native';

// --------------------------------------------------------------------- WorkSpace component styles ---------------------------------------------------------------------

export default StyleSheet.create({
    container: {
      flexGrow: 1,
      flex: 1,
      backgroundColor: "#F8F8FF",
    },
    scrollViewContainer: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 70,
    },
    boardContainer: {
      width: '90%',
      height: 'auto',
      height: 220,
      marginVertical: 10,
      borderRadius: 10,
      overflow: "hidden",
      position: 'relative',
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    boardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      position: 'absolute',
      bottom: 10,
      left: 10,
      color: 'white',
    },
    updateButton: {
      position: 'absolute',
      padding: 5,
      borderRadius: 5,
      top: 10,
      right: 70,
      backgroundColor: 'green',
    },
    updateButtonText: {
      color: 'white',
    },
    deleteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'red',
      padding: 5,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: 'white',
    },
    addButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 10,
      zIndex: 1,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      width: '100%',
    },
    addButton2: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
    },
    cancelButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    pickerContainer: {
      width: "100%",
      marginBottom: 10,
    },
    picker: {
      width: "100%",
      borderColor: 'gray',
      borderWidth: 1,
    },
});