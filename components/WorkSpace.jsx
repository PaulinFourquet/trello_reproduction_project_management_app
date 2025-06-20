import { StyleSheet, View, Text, Modal, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { fetchBoards, addBoard, createBoardFromTemplate, updateBoardName, deleteBoard } from '../apis/WorkSpaceAPI';
import styles from './WorkSpaceStyle';

const WorkSpace = () => {
  const navigation = useNavigation();

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [boards, setBoards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatingIndex, setUpdatingIndex] = useState(-1);
  const route = useRoute();
  const { orgId } = route.params;

  const reloadBoards = () => {
    fetchBoards(orgId).then(data => setBoards(data));
  };

  useEffect(() => {
    reloadBoards();
  }, [orgId]);

  const handleBoardPress = (boardId, boardName) => {
    navigation.navigate("Board", { boardId: boardId });
    navigation.setOptions({ name: boardName });
  };

  const selectTemplate = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddBoard = async () => {
    try {
      if (selectedTemplate === null) {
        await addBoard(orgId, boardName);
      } else {
        await createBoardFromTemplate(orgId, boardName, selectedTemplate);
      }
      setSelectedTemplate(null);
      setBoardName('');
      toggleModal();
      reloadBoards();
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  const handleUpdateBoardName = async (boardId, newBoardName) => {
    try {
      await updateBoardName(orgId, boardId, newBoardName);
      setUpdatingIndex(-1);
      reloadBoards();
    } catch (error) {
      console.error("Error updating board name:", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(orgId, boardId);
      reloadBoards();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return (
    <View style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}> Workspace </Text>
        {boards.map((board, index) => (
          <View key={index} style={styles.boardContainer}>
            {updatingIndex === index ? (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new board name"
                  value={boardName}
                  onChangeText={text => setBoardName(text)}
                />
                <TouchableOpacity onPress={() => handleUpdateBoardName(board.id, boardName)} style={styles.updateButton}>
                  <Text style={styles.updateButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={() => handleBoardPress(board.id, board.name)}>
                  <Image source={{ uri: board.prefs.backgroundImage }} style={styles.backgroundImage} />
                  <Text style={styles.boardTitle}>{board.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setUpdatingIndex(index)} style={styles.updateButton}>
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity onPress={() => handleDeleteBoard(board.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
          </View>
        ))}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Board</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter board name"
              value={boardName}
              onChangeText={(text) => setBoardName(text)}
            />
            <Text style={styles.modalTitle}>You can choose a template</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTemplate}
                onValueChange={(itemValue) => selectTemplate(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select a template" value="" />
                <Picker.Item label="1-on-1 Meeting Agenda" value="65f82167f501a55b1b85114a" />
                <Picker.Item label="Kanban Template" value="65f821808624ac883576d43f" />
                <Picker.Item label="Go To Market Strategy" value="65f821902a44b7a51ba25286" />
                <Picker.Item label="Agile Board Template | Trello" value="65f821778c61523f46095c8a" />
              </Picker>
            </View>
            <TouchableOpacity onPress={handleAddBoard} style={styles.addButton2}>
              <Text style={styles.addButtonText}>Add Board</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Board</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkSpace;