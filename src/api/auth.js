import apiClient from './client';
import config, { AUTH_CONFIG, ERROR_MESSAGES } from './config';

// Authentication API functions
export const authApi = {
  // Login user
  async login(credentials) {
    try {
      const { email, password } = credentials;
      
      // Validate credentials
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Since JSONPlaceholder doesn't have auth endpoints, we'll simulate login
      // In a real app, you would call your actual login endpoint
      const response = await apiClient.get('/users/1'); // Mock user fetch
      
      if (!response.data) {
        throw new Error('Invalid credentials');
      }

      // Simulate successful login
      const userData = {
        ...response.data,
        email: email,
        token: generateMockToken(),
        refreshToken: generateMockToken('refresh'),
        tokenExpiry: Date.now() + AUTH_CONFIG.tokenExpiry,
        loginTime: new Date().toISOString()
      };

      // Store auth data
      localStorage.setItem(AUTH_CONFIG.tokenKey, userData.token);
      localStorage.setItem(AUTH_CONFIG.refreshTokenKey, userData.refreshToken);
      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(userData));

      return {
        success: true,
        data: userData,
        message: 'Login successful'
      };

    } catch (error) {
      return {
        success: false,
        error: error.message || ERROR_MESSAGES.UNAUTHORIZED,
        code: 'LOGIN_FAILED'
      };
    }
  },

  // Register new user
  async register(userData) {
    try {
      const { name, email, password, confirmPassword } = userData;
      
      // Validate input
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('All fields are required');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Simulate user registration
      // In a real app, you would call your registration endpoint
      const newUser = {
        id: Date.now(),
        name: name,
        username: email.split('@')[0],
        email: email,
        phone: userData.phone || '',
        website: userData.website || '',
        address: {
          street: userData.street || '',
          suite: userData.suite || '',
          city: userData.city || '',
          zipcode: userData.zipcode || '',
          geo: {
            lat: '0',
            lng: '0'
          }
        },
        company: {
          name: userData.company || '',
          catchPhrase: '',
          bs: ''
        },
        token: generateMockToken(),
        refreshToken: generateMockToken('refresh'),
        tokenExpiry: Date.now() + AUTH_CONFIG.tokenExpiry,
        registrationTime: new Date().toISOString(),
        role: 'user'
      };

      // Store auth data
      localStorage.setItem(AUTH_CONFIG.tokenKey, newUser.token);
      localStorage.setItem(AUTH_CONFIG.refreshTokenKey, newUser.refreshToken);
      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(newUser));

      return {
        success: true,
        data: newUser,
        message: 'Registration successful'
      };

    } catch (error) {
      return {
        success: false,
        error: error.message || 'Registration failed',
        code: 'REGISTRATION_FAILED'
      };
    }
  },

  // Logout user
  async logout() {
    try {
      // In a real app, you might want to invalidate the token on the server
      // await apiClient.post('/auth/logout');

      // Clear local storage
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      localStorage.removeItem(AUTH_CONFIG.userKey);

      return {
        success: true,
        message: 'Logout successful'
      };

    } catch (error) {
      // Even if server logout fails, clear local data
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      localStorage.removeItem(AUTH_CONFIG.userKey);

      return {
        success: true,
        message: 'Logout completed'
      };
    }
  },

  // Refresh authentication token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      // In a real app, you would call your refresh token endpoint
      // const response = await apiClient.post('/auth/refresh', { refreshToken });

      // Simulate token refresh
      const newToken = generateMockToken();
      const newRefreshToken = generateMockToken('refresh');
      
      // Update stored tokens
      localStorage.setItem(AUTH_CONFIG.tokenKey, newToken);
      localStorage.setItem(AUTH_CONFIG.refreshTokenKey, newRefreshToken);

      // Update user data with new token expiry
      const userData = JSON.parse(localStorage.getItem(AUTH_CONFIG.userKey) || '{}');
      userData.token = newToken;
      userData.refreshToken = newRefreshToken;
      userData.tokenExpiry = Date.now() + AUTH_CONFIG.tokenExpiry;
      userData.lastTokenRefresh = new Date().toISOString();
      
      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(userData));

      return {
        success: true,
        data: {
          token: newToken,
          refreshToken: newRefreshToken,
          tokenExpiry: userData.tokenExpiry
        },
        message: 'Token refreshed successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: error.message || 'Token refresh failed',
        code: 'TOKEN_REFRESH_FAILED'
      };
    }
  },

  // Get current user data
  async getCurrentUser() {
    try {
      const userData = localStorage.getItem(AUTH_CONFIG.userKey);
      
      if (!userData) {
        throw new Error('No user data found');
      }

      const user = JSON.parse(userData);
      
      // Check if token is expired
      if (user.tokenExpiry && user.tokenExpiry < Date.now()) {
        // Try to refresh token
        const refreshResult = await this.refreshToken();
        if (!refreshResult.success) {
          throw new Error('Session expired');
        }
        // Get updated user data
        return this.getCurrentUser();
      }

      return {
        success: true,
        data: user,
        message: 'User data retrieved successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get user data',
        code: 'GET_USER_FAILED'
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    try {
      const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
      const userData = localStorage.getItem(AUTH_CONFIG.userKey);
      
      if (!token || !userData) {
        return false;
      }

      const user = JSON.parse(userData);
      
      // Check if token is expired
      if (user.tokenExpiry && user.tokenExpiry < Date.now()) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  },

  // Update user profile
  async updateProfile(profileData) {
    try {
      const currentUser = await this.getCurrentUser();
      
      if (!currentUser.success) {
        throw new Error('User not authenticated');
      }

      // Validate email if provided
      if (profileData.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
          throw new Error('Please enter a valid email address');
        }
      }

      // In a real app, you would call your update profile endpoint
      // const response = await apiClient.put('/users/profile', profileData);

      // Simulate profile update
      const updatedUser = {
        ...currentUser.data,
        ...profileData,
        lastUpdated: new Date().toISOString()
      };

      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(updatedUser));

      return {
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: error.message || 'Profile update failed',
        code: 'PROFILE_UPDATE_FAILED'
      };
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const { currentPassword, newPassword, confirmNewPassword } = passwordData;
      
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        throw new Error('All password fields are required');
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error('New passwords do not match');
      }

      if (newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
      }

      const currentUser = await this.getCurrentUser();
      
      if (!currentUser.success) {
        throw new Error('User not authenticated');
      }

      // In a real app, you would verify current password and update
      // const response = await apiClient.put('/users/change-password', passwordData);

      // Simulate password change
      const updatedUser = {
        ...currentUser.data,
        passwordChanged: new Date().toISOString()
      };

      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(updatedUser));

      return {
        success: true,
        message: 'Password changed successfully'
      };

    } catch (error) {
      return {
        success: false,
        error: error.message || 'Password change failed',
        code: 'PASSWORD_CHANGE_FAILED'
      };
    }
  }
};

// Utility function to generate mock tokens
function generateMockToken(type = 'access') {
  const prefix = type === 'refresh' ? 'refresh_' : 'access_';
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${prefix}${timestamp}_${randomStr}`;
}

// Utility function to validate token format
export function validateToken(token) {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Check if token has the expected format
  const tokenPattern = /^(access_|refresh_)[a-z0-9]+_[a-z0-9]+$/;
  return tokenPattern.test(token);
}

// Utility function to decode mock token (for debugging)
export function decodeMockToken(token) {
  try {
    if (!validateToken(token)) {
      throw new Error('Invalid token format');
    }

    const parts = token.split('_');
    const type = parts[0];
    const timestamp = parseInt(parts[1], 36);
    const randomPart = parts[2];

    return {
      type: type,
      timestamp: new Date(timestamp),
      randomPart: randomPart,
      isValid: true
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
}

// Export the auth API as default
export default authApi;