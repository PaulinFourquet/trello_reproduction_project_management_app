import { API_KEY, TOKEN } from '../env.js';

import { axiosInstance } from './configs/axiosConfigs';

export const fetchBoards = async (orgId) => {
    const response = await axiosInstance.get(`/organizations/${orgId}/boards`, {
        params: {
            key: API_KEY,
            token: TOKEN,
            filter: 'open'
        }
    });
    return response.data;
};

export const addBoard = async (orgId, boardName) => {
    const response = await axiosInstance.post(`/boards`, {
        name: boardName,
        idOrganization: orgId,
        key: API_KEY,
        token: TOKEN
    });
    return response.data;
};

export const createBoardFromTemplate = async (orgId, boardName, templateId) => {
    const response = await axiosInstance.post(`/boards`, {
        name: boardName,
        idOrganization: orgId,
        idBoardSource: templateId,
        key: API_KEY,
        token: TOKEN
    });
    return response.data;
};

export const updateBoardName = async (orgId, boardId, newName) => {
    const response = await axiosInstance.put(`/boards/${boardId}`, {
        name: newName,
        idOrganization: orgId,
        key: API_KEY,
        token: TOKEN
    });
    return response.data;
};

export const deleteBoard = async (orgId, boardId) => {
    const response = await axiosInstance.delete(`/boards/${boardId}`, {
        params: {
            idOrganization: orgId,
            key: API_KEY,
            token: TOKEN
        }
    });
    return response.data;
};