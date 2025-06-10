import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API endpoints - replace with your actual API
  const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      
      // Check for stored auth token
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        // In a real app, verify token with backend
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (err) {
      setError('Failed to verify authentication');
      // Clear invalid stored data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      // Mock login API call
      // In a real app, replace with actual login endpoint
      const response = await fetch(`${API_BASE_URL}/users/1`);
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const userData = await response.json();
      
      // Mock authentication success
      const authData = {
        ...userData,
        email: credentials.email,
        token: 'mock-jwt-token-' + Date.now()
      };
      
      // Store authentication data
      localStorage.setItem('authToken', authData.token);
      localStorage.setItem('user', JSON.stringify(authData));
      
      setUser(authData);
      return { success: true, user: authData };
      
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Mock registration API call
      // In a real app, replace with actual registration endpoint
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        username: userData.email.split('@')[0],
        phone: userData.phone || '',
        website: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: { lat: '', lng: '' }
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: ''
        }
      };

      const authData = {
        ...mockUser,
        token: 'mock-jwt-token-' + Date.now()
      };

      // Store authentication data
      localStorage.setItem('authToken', authData.token);
      localStorage.setItem('user', JSON.stringify(authData));

      setUser(authData);
      return { success: true, user: authData };

    } catch (err) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      // Clear stored authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      setUser(null);
      setError(null);
      
      return { success: true };
    } catch (err) {
      const errorMessage = 'Logout failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Mock profile update
      const updatedUser = { ...user, ...updates };
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };

    } catch (err) {
      const errorMessage = err.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [user]);

  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Mock password change
      // In a real app, this would call your password change endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true, message: 'Password changed successfully' };

    } catch (err) {
      const errorMessage = err.message || 'Password change failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [user]);

  const forgotPassword = useCallback(async (email) => {
    try {
      setLoading(true);
      setError(null);

      // Mock forgot password
      // In a real app, this would call your forgot password endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true, message: 'Password reset instructions sent to your email' };

    } catch (err) {
      const errorMessage = err.message || 'Failed to send reset instructions';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      setLoading(true);
      setError(null);

      // Mock reset password
      // In a real app, this would call your reset password endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));

      return { success: true, message: 'Password reset successfully' };

    } catch (err) {
      const errorMessage = err.message || 'Password reset failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Utility functions
  const isAuthenticated = !!user;
  const getToken = () => localStorage.getItem('authToken');
  const getUserId = () => user?.id;
  const getUserRole = () => user?.role || 'user';
  const hasPermission = (permission) => {
    // Mock permission check
    const userRole = getUserRole();
    const permissions = {
      user: ['read:own', 'write:own'],
      admin: ['read:all', 'write:all', 'delete:all'],
      moderator: ['read:all', 'write:all']
    };
    return permissions[userRole]?.includes(permission) || false;
  };

  return {
    // State
    user,
    loading,
    error,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    checkAuthStatus,

    // Utilities
    getToken,
    getUserId,
    getUserRole,
    hasPermission,

    // Clear error
    clearError: () => setError(null)
  };
};

export default useAuth;