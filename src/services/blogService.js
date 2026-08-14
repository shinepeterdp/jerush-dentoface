import { apiClient } from "./api";
import { blogs } from "../data/blogs";

export const blogService = {
  getBlogs: async () => {
    try {
      return await apiClient.get('/blogs.php');
    } catch (e) {
      console.warn("API failed, falling back to mock blogs:", e);
      return blogs;
    }
  },

  getBlogBySlug: async (slug) => {
    try {
      return await apiClient.get(`/blogs.php?slug=${slug}`);
    } catch (e) {
      console.warn(`API failed, falling back to mock blog slug ${slug}:`, e);
      const blog = blogs.find(b => b.slug === slug);
      if (!blog) throw new Error("Blog not found");
      return blog;
    }
  },

  getRecentBlogs: async (limit = 3) => {
    try {
      return await apiClient.get(`/blogs.php?status=published&limit=${limit}`);
    } catch (e) {
      console.warn("API failed, falling back to mock recent blogs:", e);
      return blogs.filter(b => b.status === 'published' || !b.status).slice(0, limit);
    }
  },

  getRelatedBlogs: async (currentSlug, category, limit = 3) => {
    try {
      let all;
      try {
        all = await apiClient.get('/blogs.php?status=published');
      } catch (e) {
        console.warn("API failed in getRelatedBlogs, using mock blogs:", e);
        all = blogs;
      }
      const filtered = all.filter((b) => b.category === category && b.slug !== currentSlug);
      if (filtered.length < limit) {
        const others = all.filter((b) => b.slug !== currentSlug && b.category !== category);
        return [...filtered, ...others].slice(0, limit);
      }
      return filtered.slice(0, limit);
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  addBlog: async (data) => {
    return apiClient.post('/blogs.php', data);
  },

  updateBlog: async (slug, data) => {
    return apiClient.put(`/blogs.php?slug=${slug}`, data);
  },

  deleteBlog: async (slug) => {
    return apiClient.delete(`/blogs.php?slug=${slug}`);
  }
};

