import { apiClient } from "./api";
import { highlights as mockHighlights } from "../data/highlights";

// Helper to manage localStorage cache
const getLocalHighlights = () => {
  const local = localStorage.getItem('jerush_highlights');
  if (!local) {
    try {
      localStorage.setItem('jerush_highlights', JSON.stringify(mockHighlights));
    } catch (e) {
      console.warn("Failed to initialize mock highlights in localStorage:", e);
    }
    return mockHighlights;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return mockHighlights;
  }
};

const saveLocalHighlights = (list) => {
  try {
    localStorage.setItem('jerush_highlights', JSON.stringify(list));
  } catch (e) {
    console.warn("localStorage quota exceeded, skipping local sync:", e);
  }
};

export const highlightService = {
  getHighlights: async () => {
    try {
      return await apiClient.get('/highlights.php');
    } catch (e) {
      console.warn("API failed, falling back to localStorage highlights:", e);
      return getLocalHighlights();
    }
  },

  getHighlightById: async (id) => {
    try {
      return await apiClient.get(`/highlights.php?id=${id}`);
    } catch (e) {
      console.warn(`API failed, falling back to localStorage highlight id ${id}:`, e);
      const list = getLocalHighlights();
      const highlight = list.find(h => String(h.id) === String(id));
      if (!highlight) throw new Error("Highlight not found");
      return highlight;
    }
  },

  addHighlight: async (data) => {
    try {
      const res = await apiClient.post('/highlights.php', data);
      // Synchronize localStorage just in case
      const list = getLocalHighlights();
      const newItem = { ...data, id: res.id || Date.now() };
      list.unshift(newItem);
      saveLocalHighlights(list);
      return res;
    } catch (e) {
      console.warn("API failed, performing add in localStorage:", e);
      const list = getLocalHighlights();
      const newItem = { 
        ...data, 
        id: Date.now(),
        // If image is base64 or file object, keep it
        image: data.image || '/images/jerush-banner1.webp'
      };
      list.unshift(newItem);
      saveLocalHighlights(list);
      return { success: true, id: newItem.id };
    }
  },

  updateHighlight: async (id, data) => {
    try {
      const res = await apiClient.put(`/highlights.php?id=${id}`, data);
      // Synchronize localStorage
      const list = getLocalHighlights();
      const idx = list.findIndex(h => String(h.id) === String(id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data };
        saveLocalHighlights(list);
      }
      return res;
    } catch (e) {
      console.warn("API failed, performing update in localStorage:", e);
      const list = getLocalHighlights();
      const idx = list.findIndex(h => String(h.id) === String(id));
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...data };
        saveLocalHighlights(list);
        return { success: true };
      }
      throw new Error("Highlight not found in local storage");
    }
  },

  deleteHighlight: async (id) => {
    try {
      const res = await apiClient.delete(`/highlights.php?id=${id}`);
      // Synchronize localStorage
      const list = getLocalHighlights();
      const filtered = list.filter(h => String(h.id) !== String(id));
      saveLocalHighlights(filtered);
      return res;
    } catch (e) {
      console.warn("API failed, performing delete in localStorage:", e);
      const list = getLocalHighlights();
      const filtered = list.filter(h => String(h.id) !== String(id));
      saveLocalHighlights(filtered);
      return { success: true };
    }
  }
};
