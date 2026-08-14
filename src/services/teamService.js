import { apiClient } from "./api";
import { teamMembers } from "../data/team";

export const teamService = {
  getTeamMembers: async () => {
    try {
      return await apiClient.get('/team.php');
    } catch (e) {
      console.warn("API failed, falling back to mock team:", e);
      return teamMembers;
    }
  },

  addTeamMember: async (data) => {
    return apiClient.post('/team.php', data);
  },

  updateTeamMember: async (id, data) => {
    return apiClient.put(`/team.php?id=${id}`, data);
  },

  deleteTeamMember: async (id) => {
    return apiClient.delete(`/team.php?id=${id}`);
  }
};
