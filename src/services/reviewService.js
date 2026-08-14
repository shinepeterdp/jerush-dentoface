import { apiClient } from "./api";
import { reviews } from "../data/reviews";

export const reviewService = {
  getReviews: async () => {
    try {
      return await apiClient.get('/reviews.php');
    } catch (e) {
      console.warn("API failed, falling back to mock reviews:", e);
      return reviews;
    }
  },

  getFeaturedReviews: async (limit = 3) => {
    try {
      return await apiClient.get(`/reviews.php?limit=${limit}`);
    } catch (e) {
      console.warn("API failed, falling back to mock featured reviews:", e);
      return reviews.slice(0, limit);
    }
  },

  addReview: async (data) => {
    return apiClient.post('/reviews.php', data);
  },

  updateReview: async (id, data) => {
    return apiClient.put(`/reviews.php?id=${id}`, data);
  },

  deleteReview: async (id) => {
    return apiClient.delete(`/reviews.php?id=${id}`);
  }
};

