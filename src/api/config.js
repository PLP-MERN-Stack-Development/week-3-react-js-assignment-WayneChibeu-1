// API Configuration
const config = {
  // Base URLs for different environments
  development: {
    apiUrl: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    retryAttempts: 3
  },
  production: {
    apiUrl: 'https://jsonplaceholder.typicode.com', // Replace with your production API
    timeout: 10000,
    retryAttempts: 3
  },
  test: {
    apiUrl: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
    retryAttempts: 1
  }
};

// Get current environment
const getEnvironment = () => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'development';
  }
  return 'production';
};

const currentEnv = getEnvironment();
const currentConfig = config[currentEnv] || config.development;

// API Endpoints
export const API_ENDPOINTS = {
  // Posts
  POSTS: '/posts',
  POST_BY_ID: (id) => `/posts/${id}`,
  POSTS_BY_USER: (userId) => `/posts?userId=${userId}`,
  
  // Users
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,
  
  // Comments
  COMMENTS: '/comments',
  COMMENT_BY_ID: (id) => `/comments/${id}`,
  COMMENTS_BY_POST: (postId) => `/comments?postId=${postId}`,
  
  // Albums
  ALBUMS: '/albums',
  ALBUM_BY_ID: (id) => `/albums/${id}`,
  ALBUMS_BY_USER: (userId) => `/albums?userId=${userId}`,
  
  // Photos
  PHOTOS: '/photos',
  PHOTO_BY_ID: (id) => `/photos/${id}`,
  PHOTOS_BY_ALBUM: (albumId) => `/photos?albumId=${albumId}`,
  
  // Todos
  TODOS: '/todos',
  TODO_BY_ID: (id) => `/todos/${id}`,
  TODOS_BY_USER: (userId) => `/todos?userId=${userId}`
};

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Request configuration
export const REQUEST_CONFIG = {
  timeout: currentConfig.timeout,
  retryAttempts: currentConfig.retryAttempts,
  retryDelay: 1000, // milliseconds
  headers: DEFAULT_HEADERS
};

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// API response transformers
export const RESPONSE_TRANSFORMERS = {
  // Default transformer - returns data as is
  default: (data) => data,
  
  // Transform user data
  user: (user) => ({
    ...user,
    fullName: user.name,
    initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
  }),
  
  // Transform post data
  post: (post) => ({
    ...post,
    excerpt: post.body.substring(0, 100) + (post.body.length > 100 ? '...' : ''),
    readTime: Math.ceil(post.body.split(' ').length / 200), // Estimated read time in minutes
    createdAt: new Date().toISOString(), // Mock creation date
    updatedAt: new Date().toISOString()
  }),
  
  // Transform todo data
  todo: (todo) => ({
    ...todo,
    priority: Math.random() > 0.5 ? 'high' : 'normal', // Mock priority
    dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random due date within 7 days
    tags: ['work', 'personal', 'urgent'][Math.floor(Math.random() * 3)] // Random tag
  }),
  
  // Transform comment data
  comment: (comment) => ({
    ...comment,
    createdAt: new Date().toISOString(),
    likes: Math.floor(Math.random() * 50) // Random likes count
  })
};

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

// Cache configuration
export const CACHE_CONFIG = {
  enabled: true,
  ttl: 5 * 60 * 1000, // 5 minutes in milliseconds
  maxSize: 100 // Maximum number of cached items
};

// Rate limiting
export const RATE_LIMIT = {
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
  message: 'Too many requests, please try again later.'
};

// Authentication configuration
export const AUTH_CONFIG = {
  tokenKey: 'authToken',
  userKey: 'user',
  refreshTokenKey: 'refreshToken',
  tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  refreshThreshold: 5 * 60 * 1000 // Refresh token when 5 minutes left
};

// Export the main configuration
export default {
  API_URL: currentConfig.apiUrl,
  TIMEOUT: currentConfig.timeout,
  RETRY_ATTEMPTS: currentConfig.retryAttempts,
  ENVIRONMENT: currentEnv,
  ...currentConfig
};