import { apiClient } from './api';
import { defaultMarqueeSettings, defaultMarqueeItems } from '../data/marqueeNews';

const STORAGE_KEY_ITEMS = 'jerush_marquee_items';
const STORAGE_KEY_SETTINGS = 'jerush_marquee_settings';
export const MARQUEE_UPDATE_EVENT = 'jerush_marquee_updated';

// Helper to notify all active listeners (e.g. Header Marquee component)
export const notifyMarqueeUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MARQUEE_UPDATE_EVENT));
  }
};

// Local Storage helpers
const getLocalItems = () => {
  const local = localStorage.getItem(STORAGE_KEY_ITEMS);
  if (!local) {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(defaultMarqueeItems));
    } catch (e) {
      console.warn("Failed to save default marquee items:", e);
    }
    return defaultMarqueeItems;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return defaultMarqueeItems;
  }
};

const saveLocalItems = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    notifyMarqueeUpdate();
  } catch (e) {
    console.warn("Quota exceeded or error saving marquee items:", e);
  }
};

const getLocalSettings = () => {
  const local = localStorage.getItem(STORAGE_KEY_SETTINGS);
  if (!local) {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(defaultMarqueeSettings));
    } catch (e) {
      console.warn("Failed to save default marquee settings:", e);
    }
    return defaultMarqueeSettings;
  }
  try {
    return { ...defaultMarqueeSettings, ...JSON.parse(local) };
  } catch (e) {
    return defaultMarqueeSettings;
  }
};

const saveLocalSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    notifyMarqueeUpdate();
  } catch (e) {
    console.warn("Quota exceeded or error saving marquee settings:", e);
  }
};

export const marqueeService = {
  // Get list of news items
  getItems: async () => {
    try {
      const res = await apiClient.get('/marquee.php');
      return res.items || res;
    } catch (e) {
      return getLocalItems();
    }
  },

  // Get settings
  getSettings: async () => {
    try {
      const res = await apiClient.get('/marquee_settings.php');
      return res.settings || res;
    } catch (e) {
      return getLocalSettings();
    }
  },

  // Add new item
  addItem: async (itemData) => {
    try {
      await apiClient.post('/marquee.php', itemData);
    } catch (e) {
      // Local sync fallback
    }
    const list = getLocalItems();
    const newItem = {
      ...itemData,
      id: itemData.id || Date.now(),
      isActive: itemData.isActive !== undefined ? itemData.isActive : true,
      priority: itemData.priority || list.length + 1,
    };
    list.unshift(newItem);
    saveLocalItems(list);
    return { success: true, item: newItem };
  },

  // Update item
  updateItem: async (id, itemData) => {
    try {
      await apiClient.put(`/marquee.php?id=${id}`, itemData);
    } catch (e) {
      // Local sync fallback
    }
    const list = getLocalItems();
    const idx = list.findIndex(i => String(i.id) === String(id));
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...itemData };
      saveLocalItems(list);
    }
    return { success: true };
  },

  // Toggle Item Active Status
  toggleActive: async (id) => {
    const list = getLocalItems();
    const idx = list.findIndex(i => String(i.id) === String(id));
    if (idx !== -1) {
      list[idx].isActive = !list[idx].isActive;
      saveLocalItems(list);
      try {
        await apiClient.put(`/marquee.php?id=${id}`, { isActive: list[idx].isActive });
      } catch (e) {}
    }
    return { success: true };
  },

  // Delete item
  deleteItem: async (id) => {
    try {
      await apiClient.delete(`/marquee.php?id=${id}`);
    } catch (e) {
      // Local sync fallback
    }
    const list = getLocalItems();
    const filtered = list.filter(i => String(i.id) !== String(id));
    saveLocalItems(filtered);
    return { success: true };
  },

  // Update Settings
  updateSettings: async (newSettings) => {
    try {
      await apiClient.put('/marquee_settings.php', newSettings);
    } catch (e) {
      // Local sync fallback
    }
    const current = getLocalSettings();
    const updated = { ...current, ...newSettings };
    saveLocalSettings(updated);
    return { success: true, settings: updated };
  }
};
