import apiClient from './client';

// Posts API functions
export const postsApi = {
  // Get all posts with pagination
  async getAllPosts(page = 1, limit = 10) {
    const params = {
      _page: page,
      _limit: limit
    };
    return apiClient.get('/posts', params);
  },
  
  // Get a single post by ID
  async getPost(id) {
    return apiClient.get(`/posts/${id}`);
  },
  
  // Get posts by user ID
  async getPostsByUser(userId) {
    return apiClient.get('/posts', { userId });
  },
  
  // Create a new post
  async createPost(postData) {
    return apiClient.post('/posts', postData);
  },
  
  // Update a post
  async updatePost(id, postData) {
    return apiClient.put(`/posts/${id}`, postData);
  },
  
  // Delete a post
  async deletePost(id) {
    return apiClient.delete(`/posts/${id}`);
  },
  
  // Search posts by title
  async searchPosts(query) {
    const allPosts = await apiClient.get('/posts');
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.body.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Users API functions
export const usersApi = {
  // Get all users
  async getAllUsers() {
    return apiClient.get('/users');
  },
  
  // Get a single user by ID
  async getUser(id) {
    return apiClient.get(`/users/${id}`);
  }
};

// Comments API functions
export const commentsApi = {
  // Get comments for a post
  async getCommentsByPost(postId) {
    return apiClient.get('/comments', { postId });
  },
  
  // Get all comments
  async getAllComments() {
    return apiClient.get('/comments');
  }
};