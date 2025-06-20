import React, { useState } from "react";
import { View, Button, TextInput, Modal, StyleSheet } from "react-native";

const _EditForm = ({ visible, onClose, onUpdate, initialValue }) => {
    const [updatedListName, setUpdatedListName] = useState(initialValue);
  
    const handleUpdate = () => {
      if (updatedListName.trim() !== "") {
        onUpdate(updatedListName.trim());
      }
    };
  
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter updated list name"
              placeholderTextColor={"#AAA"}
              value={updatedListName}
              onChangeText={(text) => setUpdatedListName(text)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Update" onPress={handleUpdate} />
              <Button title="Cancel" color="red" onPress={onClose} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8FF",
      alignItems: "center",
      justifyContent: "center",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    },
    modalContent: {
      backgroundColor: "#fff",
      width: "80%",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
  });
export default _EditForm