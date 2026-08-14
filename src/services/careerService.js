import { apiClient } from "./api";
import { defaultCareers } from "../data/careers";

export const careerService = {
  getCareers: async () => {
    try {
      const res = await apiClient.get('/careers.php');
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.data)) return res.data;
      return defaultCareers;
    } catch (e) {
      console.warn("API failed, falling back to mock careers:", e);
      return defaultCareers;
    }
  },

  getCareerById: async (id) => {
    try {
      return await apiClient.get(`/careers.php?id=${id}`);
    } catch (e) {
      console.warn(`API failed, falling back to mock career id ${id}:`, e);
      const career = defaultCareers.find(c => String(c.id) === String(id));
      if (!career) throw new Error("Career vacancy not found");
      return career;
    }
  },

  saveCareersList: async (careersList) => {
    return true;
  },

  addCareer: async (careerData) => {
    return apiClient.post('/careers.php', careerData);
  },

  updateCareer: async (id, careerData) => {
    return apiClient.put(`/careers.php?id=${id}`, careerData);
  },

  deleteCareer: async (id) => {
    return apiClient.delete(`/careers.php?id=${id}`);
  },

  submitApplication: async (applicationData) => {
    const payload = {
      ...applicationData,
      submitted_at: new Date().toISOString()
    };
    
    // Save to LocalStorage fallback
    try {
      const existing = JSON.parse(localStorage.getItem('jerush_career_applications') || '[]');
      existing.unshift({ id: Date.now(), ...payload });
      localStorage.setItem('jerush_career_applications', JSON.stringify(existing));
    } catch (e) {
      console.warn("Failed saving application to localStorage:", e);
    }

    try {
      return await apiClient.post('/career_applications.php', payload);
    } catch (e) {
      console.warn("API submission fallback to localStorage:", e);
      return { success: true, message: "Application stored locally" };
    }
  },

  getApplications: async () => {
    try {
      const res = await apiClient.get('/career_applications.php');
      return res || [];
    } catch (e) {
      try {
        return JSON.parse(localStorage.getItem('jerush_career_applications') || '[]');
      } catch (err) {
        return [];
      }
    }
  },

  deleteApplication: async (id) => {
    try {
      const list = JSON.parse(localStorage.getItem('jerush_career_applications') || '[]');
      const filtered = list.filter(item => String(item.id) !== String(id));
      localStorage.setItem('jerush_career_applications', JSON.stringify(filtered));
    } catch (e) {}

    try {
      return await apiClient.delete(`/career_applications.php?id=${id}`);
    } catch (e) {
      return true;
    }
  }
};

