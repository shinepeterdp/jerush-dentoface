import { apiClient } from './api';
import { defaultCamps, defaultCampInquiries, CAMP_STATS, CAMP_SERVICES, CAMP_CATEGORIES } from '../data/campsData';

const STORAGE_KEY_CAMPS = 'jerush_dental_camps_v2';
const STORAGE_KEY_INQUIRIES = 'jerush_camp_inquiries_v2';
export const CAMPS_UPDATE_EVENT = 'jerush_camps_updated';

export const notifyCampsUpdate = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CAMPS_UPDATE_EVENT));
  }
};

const getLocalCamps = () => {
  if (typeof window === 'undefined') return defaultCamps;
  const local = localStorage.getItem(STORAGE_KEY_CAMPS);
  if (!local) {
    try {
      localStorage.setItem(STORAGE_KEY_CAMPS, JSON.stringify(defaultCamps));
    } catch (e) {
      console.warn("Failed to initialize camps in storage:", e);
    }
    return defaultCamps;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return defaultCamps;
  }
};

const saveLocalCamps = (camps) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CAMPS, JSON.stringify(camps));
    notifyCampsUpdate();
  } catch (e) {
    console.warn("Error saving camps:", e);
  }
};

const getLocalInquiries = () => {
  if (typeof window === 'undefined') return defaultCampInquiries;
  const local = localStorage.getItem(STORAGE_KEY_INQUIRIES);
  if (!local) {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(defaultCampInquiries));
    } catch (e) {
      console.warn("Failed to initialize camp inquiries:", e);
    }
    return defaultCampInquiries;
  }
  try {
    return JSON.parse(local);
  } catch (e) {
    return defaultCampInquiries;
  }
};

const saveLocalInquiries = (inquiries) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    notifyCampsUpdate();
  } catch (e) {
    console.warn("Error saving camp inquiries:", e);
  }
};

export const campsService = {
  getCategories: () => CAMP_CATEGORIES,
  getServices: () => CAMP_SERVICES,
  getStats: () => CAMP_STATS,

  getCamps: async () => {
    try {
      const data = await apiClient.get('/camps.php');
      if (Array.isArray(data) && data.length > 0) {
        saveLocalCamps(data);
        return data;
      }
      return getLocalCamps();
    } catch (e) {
      console.warn("API /camps.php failed, falling back to local data:", e);
      return getLocalCamps();
    }
  },

  getCampById: async (id) => {
    try {
      const data = await apiClient.get(`/camps.php?id=${id}`);
      if (data && data.id) return data;
      const camps = getLocalCamps();
      return camps.find(c => String(c.id) === String(id)) || null;
    } catch (e) {
      const camps = getLocalCamps();
      return camps.find(c => String(c.id) === String(id)) || null;
    }
  },

  createCamp: async (campData) => {
    try {
      const res = await apiClient.post('/camps.php', campData);
      const newCamp = {
        ...campData,
        id: res && res.id ? res.id : `camp-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      const camps = getLocalCamps();
      saveLocalCamps([newCamp, ...camps]);
      return newCamp;
    } catch (e) {
      console.warn("API createCamp failed, saving locally:", e);
      const camps = getLocalCamps();
      const newCamp = {
        ...campData,
        id: campData.id || `camp-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      saveLocalCamps([newCamp, ...camps]);
      return newCamp;
    }
  },

  updateCamp: async (id, updatedFields) => {
    try {
      await apiClient.put(`/camps.php?id=${id}`, updatedFields);
    } catch (e) {
      console.warn("API updateCamp failed, updating locally:", e);
    }
    const camps = getLocalCamps();
    const index = camps.findIndex(c => String(c.id) === String(id));
    if (index !== -1) {
      camps[index] = { ...camps[index], ...updatedFields, updatedAt: new Date().toISOString() };
      saveLocalCamps(camps);
      return camps[index];
    }
    return updatedFields;
  },

  deleteCamp: async (id) => {
    try {
      await apiClient.delete(`/camps.php?id=${id}`);
    } catch (e) {
      console.warn("API deleteCamp failed, deleting locally:", e);
    }
    const camps = getLocalCamps();
    const filtered = camps.filter(c => String(c.id) !== String(id));
    saveLocalCamps(filtered);
    return true;
  },

  registerForCamp: async (campId, registration) => {
    const camps = getLocalCamps();
    const index = camps.findIndex(c => c.id === campId);
    if (index !== -1) {
      camps[index].registeredCount = (camps[index].registeredCount || 0) + 1;
      saveLocalCamps(camps);
    }
    return { success: true, token: `JERUSH-CAMP-${Math.floor(100000 + Math.random() * 900000)}` };
  },

  getInquiries: async () => {
    return getLocalInquiries();
  },

  submitInquiry: async (inquiryData) => {
    const inquiries = getLocalInquiries();
    const newInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    const updated = [newInquiry, ...inquiries];
    saveLocalInquiries(updated);
    return newInquiry;
  },

  updateInquiryStatus: async (id, status) => {
    const inquiries = getLocalInquiries();
    const index = inquiries.findIndex(i => i.id === id);
    if (index === -1) throw new Error("Inquiry not found");

    inquiries[index] = { ...inquiries[index], status, updatedAt: new Date().toISOString() };
    saveLocalInquiries(inquiries);
    return inquiries[index];
  },

  deleteInquiry: async (id) => {
    const inquiries = getLocalInquiries();
    const filtered = inquiries.filter(i => i.id !== id);
    saveLocalInquiries(filtered);
    return true;
  }
};
