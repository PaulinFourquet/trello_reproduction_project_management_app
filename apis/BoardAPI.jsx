import { API_KEY, TOKEN } from '../env.js';

import { axiosInstance } from './configs/axiosConfigs';

export const fetchLists = async (boardId) => {
  try {
      const response = await axiosInstance.get(`/boards/${boardId}/lists`, {
          params: {
              key: API_KEY,
              token: TOKEN,
              fields: 'id,name',
          },
      });
      const data = response.data;
      const listsWithData = await Promise.all(
          data.map(async (list) => {
              const cardsResponse = await axiosInstance.get(`/lists/${list.id}/cards`, {
                  params: {
                      key: API_KEY,
                      token: TOKEN,
                  },
              });
              const cardsData = cardsResponse.data;
              const cardsWithData = await Promise.all(
                  cardsData.map(async (card) => {
                      const checklistsData = await fetchChecklistsForCard(card.id);
                      const membersData = await fetchMembersForCard(card.id);
                      return {
                          ...card,
                          checklists: checklistsData,
                          members: membersData,
                      };
                  })
              );
              return { ...list, cards: cardsWithData };
          })
      );
      const membersResponse = await axiosInstance.get(`/boards/${boardId}/members`, {
          params: {
              key: API_KEY,
              token: TOKEN,
          },
      });
      const membersData = membersResponse.data;
      return { lists: listsWithData, members: membersData };
  } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
  }
};
  
export const handleCreateList = async (boardId, name) => {
  try {
    const response = await axiosInstance.post(`/lists`, {
      name: name,
      idBoard: boardId,
      key: API_KEY,
      token: TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating new list:", error);
    throw error;
  }
};
  
export const handleNewCard = async (listId, name, description) => {
  try {
    const response = await axiosInstance.post(`/cards`, {
      name: name,
      idList: listId,
      desc: description,
      key: API_KEY,
      token: TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating new card:", error);
    throw error;
  }
};
  
export const handleUpdateList = async (listId, name) => {
  try {
    console.log("Updating list with ID:", listId, "to name:", name);
    const response = await axiosInstance.put(`/lists/${listId}`, {
      name: name,
      key: API_KEY,
      token: TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating list:", error);
    throw error;
  }
};
  
export const updateCard = async (cardId, name, description) => {
  try {
    const response = await axiosInstance.put(`/cards/${cardId}`, {
      name: name,
      desc: description,
      key: API_KEY,
      token: TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating card:", error);
    throw error;
  }
};
  
export const deleteCard = async (cardId) => {
  try {
    const response = await axiosInstance.delete(`/cards/${cardId}`, {
      params: {
        id: cardId,
        key: API_KEY,
        token: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting card:", error);
    throw error;
  }
};
  
export const archiveList = async (listId, isArchived) => {
  try {
    const response = await axiosInstance.put(`/lists/${listId}`, {
      closed: !isArchived,
      key: API_KEY,
      token: TOKEN,
    });
    return response.data;
  } catch (error) {
    console.error("Error archiving list:", error);
    throw error;
  }
};

export const CardMembers = async (cardId, membersList) => {
  try {
    const response = await axiosInstance.put(`/cards/${cardId}/idMembers`, {
      key: API_KEY,
      token: TOKEN,
      value: membersList.join(","),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching card members:", error);
    throw error;
  }
};

export const fetchChecklistsForCard = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}/checklists`, {
      params: {
        key: API_KEY,
        token: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching checklists for card:", error);
    throw error;
  }
};

export const fetchMembersForCard = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}/members`, {
      params: {
        key: API_KEY,
        token: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members for card:", error);
    throw error;
  }
};

// export const getAttachmentURL = async (cardId) => {
//   try {
//     const response = await axiosInstance.get(`/cards/${cardId}/attachments/`, {
//       params: {
//         key: API_KEY,
//         token: TOKEN,
//       },
//     });
//     if (response.data.length > 0) {
//       return response.data[0].url;
//     } else {
//       console.warn("No attachments found for card:", cardId);
//       return null;
//     }
//   } catch (error) {
//     if (error.response && error.response.status === 429) {
//       await new Promise(resolve => setTimeout(resolve, 60000));
//       return getAttachmentURL(cardId);
//     } else {
//       console.error("Error fetching attachment URL:", error);
//       throw error;
//     }
//   }
// };

export const toggleCheckItem = async (cardId, checklistId, itemId, currentState) => {
  try {
    const newState = currentState === "complete" ? "incomplete" : "complete";
    await axiosInstance.put(`/cards/${cardId}/checklist/${checklistId}/checkItem/${itemId}`, 
      {
        state: newState,
        key: API_KEY,
        token: TOKEN,
      },
      {
        headers: {
          Authorization: TOKEN,
          APIKey: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la modification de l'état de l'élément de la liste de contrôle :",
      error
    );
  }
};