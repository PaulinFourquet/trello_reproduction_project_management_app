import { API_KEY, TOKEN } from '../env.js';

import { axiosInstance } from './configs/axiosConfigs';

export const fetchOrganizations = async () => {
  try {
    const response = await axiosInstance.get(`/members/me/organizations`, {
      params: {
        key: API_KEY,
        token: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Fetch Organization : ", error);
    throw error;
  }
};

export const createOrganization = async (displayName) => {
    try {
      const response = await axiosInstance.post(`/organizations`, {
        displayName: displayName,
      }, {
        params: {
          key: API_KEY,
          token: TOKEN,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error creating organization : ", error);
      throw error;
    }
  };

export const updateOrganization = async (orgId, displayName) => {
  try {
    const response = await axiosInstance.put(`/organizations/${orgId}`, {
      displayName: displayName,
    }, {
        params: {
            key: API_KEY,
            token: TOKEN,
        },
    });
    return response.data;
  } catch (error) {
    console.log("Error Update Org : ", error);
    throw error;
  }
};

export const deleteOrganization = async (orgId) => {
    try {
      const response = await axiosInstance.delete(`/organizations/${orgId}`, {
        params: {
          key: API_KEY,
          token: TOKEN,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error deleting organization: ", error);
      throw error;
    }
};