import React, { useState } from "react";
import { View, Button, TextInput, Modal, StyleSheet } from "react-native";

const _CardForm = ({ visible, onClose, onSubmit }) => {
    const [newCardName, setNewCardName] = useState("");
    const [newCardDesc, setNewCardDesc] = useState("");
  
    const handleCreateCard = () => {
      if (newCardName.trim() !== "") {
        onSubmit(newCardName.trim(), newCardDesc.trim());
        setNewCardName("");
        setNewCardDesc("")
      }
    };
  
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter new name card"
              placeholderTextColor={"#AAA"}
              value={newCardName}
              onChangeText={(text) => setNewCardName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="New description"
              placeholderTextColor={"#AAA"}
              value={newCardDesc}
              onChangeText={(text) => setNewCardDesc(text)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Create" onPress={handleCreateCard} />
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

export default _CardForm