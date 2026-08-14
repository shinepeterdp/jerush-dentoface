import { apiClient } from "./api";
import { doctors } from "../data/doctors";

export const doctorService = {
  getDoctors: async () => {
    try {
      return await apiClient.get('/doctors.php');
    } catch (e) {
      console.warn("API failed, falling back to mock doctors:", e);
      return doctors;
    }
  },
  
  getDoctorById: async (id) => {
    try {
      return await apiClient.get(`/doctors.php?id=${id}`);
    } catch (e) {
      console.warn(`API failed, falling back to mock doctor id ${id}:`, e);
      const doctor = doctors.find(d => String(d.id) === String(id));
      if (!doctor) throw new Error("Doctor not found");
      return doctor;
    }
  },

  addDoctor: async (data) => {
    return apiClient.post('/doctors.php', data);
  },

  updateDoctor: async (id, data) => {
    return apiClient.put(`/doctors.php?id=${id}`, data);
  },

  deleteDoctor: async (id) => {
    return apiClient.delete(`/doctors.php?id=${id}`);
  }
};

