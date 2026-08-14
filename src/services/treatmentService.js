import { apiClient } from "./api";
import { treatments } from "../data/treatments";

export const treatmentService = {
  getTreatments: async () => {
    try {
      const apiData = await apiClient.get('/treatments.php');
      if (Array.isArray(apiData) && apiData.length >= treatments.length) {
        return apiData;
      } else if (Array.isArray(apiData) && apiData.length > 0) {
        // Merge API overrides over static list
        const apiMap = new Map(apiData.map(t => [t.id, t]));
        const merged = treatments.map(t => apiMap.get(t.id) || t);
        // Include any new treatments added via Admin API that aren't in static file
        apiData.forEach(t => {
          if (!merged.some(m => m.id === t.id)) {
            merged.push(t);
          }
        });
        return merged;
      }
      return treatments;
    } catch (e) {
      console.warn("API failed, falling back to mock treatments:", e);
      return treatments;
    }
  },

  getTreatmentsByCategory: async (category) => {
    const all = await treatmentService.getTreatments();
    if (!category || category === 'all') {
      return all;
    }
    return all.filter((t) => t.category === category);
  },

  getTreatmentById: async (id) => {
    try {
      const res = await apiClient.get(`/treatments.php?id=${id}`);
      if (res && res.id) return res;
    } catch (e) {
      console.warn(`API failed or bypassed for treatment id ${id}:`, e);
    }
    
    // Check mock treatments list
    const treatment = treatments.find(t => String(t.id).toLowerCase() === String(id).toLowerCase());
    if (treatment) return treatment;

    // Smart fallback for any new SEO treatment slug:
    const formattedTitle = String(id)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: id,
      title: formattedTitle,
      category: id.includes('hair') ? 'hair' : id.includes('skin') || id.includes('laser') || id.includes('peel') || id.includes('acne') ? 'cosmetic' : 'dental',
      desc: `Comprehensive clinical ${formattedTitle} procedure at Jerush Dentoface Hospital with state-of-the-art diagnostic and therapeutic technology.`,
      iconName: 'ShieldCheck',
      image: '/images/treatments/dental_implants.png',
      details: `Our expert team at Jerush Dentoface provides specialized ${formattedTitle} using international medical standards, advanced sterilization, and personalized patient care.`,
      benefits: ['International clinical standards', 'Board-certified specialists', 'State-of-the-art pain-free technology']
    };
  },

  addTreatment: async (data) => {
    return apiClient.post('/treatments.php', data);
  },

  updateTreatment: async (id, data) => {
    return apiClient.put(`/treatments.php?id=${id}`, data);
  },

  deleteTreatment: async (id) => {
    return apiClient.delete(`/treatments.php?id=${id}`);
  }
};

