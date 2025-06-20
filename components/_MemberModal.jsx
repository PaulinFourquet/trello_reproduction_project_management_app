import React from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";
import { CheckBox } from "react-native-elements";

const _MemberModal = ({
  visible,
  onClose,
  members,
  selectedMembers,
  addMemberToCard,
  removeMemberFromCard,
  cardMembers,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Members</Text>
          <View style={styles.memberList}>
            {members.map((member) => (
              <CheckBox
                key={member.id}
                title={member.fullName}
                checked={selectedMembers.includes(member.id)}
                onPress={() => {
                  if (selectedMembers.includes(member.id)) {
                    removeMemberFromCard(member.id);
                  } else {
                    addMemberToCard(member.id);
                  }
                }}
              />
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={cardMembers} />
            <Button title="Cancel" color="red" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  memberList: {
    width: "100%",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default _MemberModal;
