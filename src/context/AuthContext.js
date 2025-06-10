import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const authToken = localStorage.getItem('authToken');
        
        if (savedUser && authToken) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData, token = 'mock-jwt-token') => {
    try {
      setLoading(true);
      
      // In a real app, you would validate the token with your backend
      // For demo purposes, we're using mock data
      const userWithDefaults = {
        id: userData.id || Date.now(),
        name: userData.name || 'Demo User',
        email: userData.email || 'demo@example.com',
        avatar: userData.avatar || null,
        role: userData.role || 'user',
        preferences: userData.preferences || {
          theme: 'light',
          notifications: true
        },
        createdAt: userData.createdAt || new Date().toISOString()
      };

      // Save to localStorage (in production, consider more secure storage)
      localStorage.setItem('user', JSON.stringify(userWithDefaults));
      localStorage.setItem('authToken', token);
      
      setUser(userWithDefaults);
      setIsAuthenticated(true);
      
      return { success: true, user: userWithDefaults };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear all auth data
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      
      setUser(null);
      setIsAuthenticated(false);
      
      // Optional: Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = (updates) => {
    try {
      if (!user) return;
      
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: error.message };
    }
  };

  const refreshToken = async () => {
    try {
      // In a real app, this would call your auth API to refresh the token
      const currentToken = localStorage.getItem('authToken');
      if (!currentToken) {
        throw new Error('No token to refresh');
      }
      
      // Mock token refresh
      const newToken = 'refreshed-mock-jwt-token';
      localStorage.setItem('authToken', newToken);
      
      return { success: true, token: newToken };
    } catch (error) {
      console.error('Token refresh error:', error);
      logout(); // Force logout if refresh fails
      return { success: false, error: error.message };
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Mock permission system
    const userPermissions = {
      user: ['read:own', 'write:own'],
      admin: ['read:all', 'write:all', 'delete:all'],
      moderator: ['read:all', 'write:all']
    };
    
    const permissions = userPermissions[user.role] || [];
    return permissions.includes(permission);
  };

  const value = {
    // State
    user,
    loading,
    isAuthenticated,
    
    // Actions
    login,
    logout,
    updateUser,
    refreshToken,
    hasPermission,
    
    // Computed values
    isAdmin: user?.role === 'admin',
    isModerator: user?.role === 'moderator',
    userName: user?.name || 'Guest',
    userInitials: user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'G'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};