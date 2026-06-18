// services/category.service.js

import api from "./axois";

/**
 * Category API Endpoints
 */
const CATEGORY_ENDPOINTS = {
  GET_MENU_LIST: "/menu",
};

export const getMenuList = async () => {
  try {
    const response = await api.get(CATEGORY_ENDPOINTS.GET_MENU_LIST);
    return response.data;
  } catch (error) {
    throw (
      error?.response?.data || {
        success: false,
        message: "Failed to fetch menu list",
      }
    );
  }
};
