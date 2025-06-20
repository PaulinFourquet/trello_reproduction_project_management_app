import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, Pressable, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { FontAwesome5, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native';

import CreateForm from "./_CreateForm";
import EditForm from "./_EditForm";
import CardForm from "./_CardForm";
import EditCard from "./_EditCard";
import { fetchLists, handleCreateList, handleNewCard, handleUpdateList, updateCard, deleteCard, archiveList, CardMembers, toggleCheckItem } from '../apis/BoardAPI';
import MemberModal from "./_MemberModal";
import styles from './BoardStyle';


const Board = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [lists, setLists] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedListName, setSelectedListName] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [selectedCardName, setSelectedCardName] = useState(null);
  const [selectedCardDesc, setSelectedCardDesc] = useState(null);
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const [selectedCardMembers, setSelectedCardMembers] = useState([]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [checklists, setChecklists] = useState([]);
  const route = useRoute();
  const { boardId } = route.params;

  useEffect(() => {
    fetchBoardData();
  }, []);

  const fetchBoardData = async () => {
    try {
      const { lists: fetchedLists, members: fetchedMembers } = await fetchLists(boardId);
      setLists(fetchedLists);
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Error fetching board data:", error);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleShowMore = (index) => {
    setShowMoreIndex(showMoreIndex === index ? null : index);
  };

  const handleArchiveButtonClick = async (listId, isArchived) => {
    try {
      await archiveList(listId, isArchived);
      fetchBoardData();
    } catch (error) {
      console.error("Error archiving list:", error);
    }
  };

  const handleNewCardButton = (listId) => {
    setSelectedListId(listId);
    setShowNewCardForm(true);
  };

  const handleEditButtonClick = (listId, listName) => {
    setSelectedListId(listId);
    setSelectedListName(listName);
    setShowEditForm(true);
  };

  const handleEditCardButton = (cardId, cardName, cardDesc) => {
    setSelectedCardId(cardId);
    setSelectedCardName(cardName);
    setSelectedCardDesc(cardDesc);
    setShowEditCard(true);
  };

  const openMemberModal = (cardId, currentMembers) => {
    setSelectedCardId(cardId);
    setSelectedCardMembers(currentMembers);
    setShowMemberModal(true);
  };

  const closeMemberModal = () => {
    setShowMemberModal(false);
  };

  const addMemberToCard = (memberId) => {
    setSelectedCardMembers([...selectedCardMembers, memberId]);
  };

  const removeMemberFromCard = (memberId) => {
    const updatedMembers = selectedCardMembers.filter((id) => id !== memberId);
    setSelectedCardMembers(updatedMembers);
  };

  const handleCardMembersUpdate = async () => {
    try {
      await CardMembers(selectedCardId, selectedCardMembers);
  
      fetchBoardData();
      closeMemberModal();
      setSelectedCardId(null);
      setSelectedCardMembers([]);
      setShowMemberModal(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour des membres de la carte :", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button
          title="Create New List"
          color="black"
          onPress={() => setShowCreateForm(true)}
          style={{ marginTop: 20 }}
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10, flexGrow: 1, height: "95%" }}
      >
        {lists &&
          lists.map((list, index) => (
            <Card
              key={index}
              containerStyle={styles.cardContainer}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Card.Title style={{ fontSize: 18 }}>{list.name}</Card.Title>
                <Card.Divider color="black" />
                <Pressable onPress={toggleOptions}>
                  <FontAwesome6 name="ellipsis" size={24} color="black" />
                </Pressable>
                {showOptions && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Button
                      title="Edit"
                      onPress={() => handleEditButtonClick(list.id, list.name)}
                    />
                    <Button
                      title="Archive"
                      onPress={() => handleArchiveButtonClick(list.id)}
                      color="red"
                    />
                  </View>
                )}
              </View>
              <ScrollView style={styles.cardScrollView}>
                {list.cards.map((card) => (
                  <Card
                    key={card.id}
                    containerStyle={styles.innerCardContainer}
                  >
                    <Text>{card.name}</Text>
                    <Text>{card.desc}</Text>
                    <View style={styles.membersContainer}>
                      {card.members &&
                        card.members.map((member) => (
                          <Text key={member.id} style={{ color: "red" }}>
                            {member.fullName}
                          </Text>
                        ))}
                    </View>
                    <View style={styles.IconContainer}>
                      <Pressable onPress={async () => {
                        await deleteCard(card.id);
                        fetchBoardData();
                      }}>
                        <MaterialIcons name="delete" size={20} color="black" />
                      </Pressable>
                      <Pressable onPress={async () => {
                        await updateCard(card.id, card.name, card.desc);
                        fetchBoardData();
                      }}>
                        <MaterialIcons name="edit" size={20} color="black" />
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          openMemberModal(card.id, card.members || [])
                        }
                      >
                        <FontAwesome5
                          name="user-plus"
                          size={18}
                          color="black"
                        />
                      </Pressable>
                    </View>
                    {card.checklists.map((checklist, index) => (
                      <View key={index}>
                        <View style={styles.itemContainer}>
                          <Text style={styles.itemName}>{checklist.name}</Text>
                          <TouchableOpacity
                            onPress={() => toggleShowMore(index)}
                          >
                            <Text style={styles.showMoreButton}>{showMoreIndex === index ? "Show less" : "Show more"}</Text>
                          </TouchableOpacity>
                        </View>
                        {showMoreIndex === index && (
                          <View>
                            {checklist.checkItems.map((item, itemIndex) => (
                              <View
                                style={styles.itemContainer}
                                key={itemIndex}
                              >
                                <Text style={styles.itemName}>{item.name}</Text>
                                <TouchableOpacity
                                  style={[
                                    styles.checkbox,
                                    item.state === "complete" &&
                                      styles.checkboxChecked,
                                  ]}
                                  onPress={async () => {
                                    await toggleCheckItem(card.id, checklist.id, item.id, item.state);
                                    fetchBoardData();
                                  }}
                                >
                                  {item.state === "complete" && <Text>X</Text>}
                                </TouchableOpacity>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </Card>
                ))}
                <View style={styles.plusIconContainer}>
                  <Pressable onPress={() => handleNewCardButton(list.id)}>
                    <MaterialCommunityIcons
                      name="plus-circle"
                      size={36}
                      color="black"
                    />
                  </Pressable>
                </View>
              </ScrollView>
            </Card>
          ))}
        <Card containerStyle={styles.cardMemberContainer}>
          <View style={styles.listHeader}>
            <Card.Title style={styles.listTitle}>Members</Card.Title>
            <Card.Divider color="black" />
            <View style={styles.cardScrollView}>
              {members.map((member, index) => (
                <Text style={styles.memberName} key={index}>
                  {member.fullName}
                </Text>
              ))}
            </View>
          </View>
        </Card>
      </ScrollView>
      <CreateForm
        visible={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={async (listName) => {
          await handleCreateList(boardId, listName);
          fetchBoardData();
        }}
      />

      <EditForm
        visible={showEditForm}
        onClose={() => setShowEditForm(false)}
        onUpdate={async (name) => {
          await handleUpdateList(selectedListId, name);
          fetchBoardData();
        }}
        initialValue={selectedListName}
      />

      <CardForm
        visible={showNewCardForm}
        onClose={() => setShowNewCardForm(false)}
        onSubmit={async (name, description) => {
          await handleNewCard(selectedListId, name, description);
          fetchBoardData();
        }}
      />

      <EditCard
        visible={showEditCard}
        onClose={() => setShowEditCard(false)}
        onUpdate={async (name, description) => {
          await updateCard(selectedCardId, name, description);
          fetchBoardData();
        }}
        initialValue={selectedCardName}
      />
      <MemberModal
        visible={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        members={members}
        selectedMembers={selectedCardMembers}
        addMemberToCard={addMemberToCard}
        removeMemberFromCard={removeMemberFromCard}
        cardMembers={handleCardMembersUpdate}
      />
    </View>
  );
};

export default Board;