import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useApi from '../hooks/useApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { CheckCircle2, MessageCircle, Folder, FileText } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    todayTasks: 0
  });

  // Fetch user posts for dashboard statistics
  const { data: posts, loading: postsLoading } = useApi('https://jsonplaceholder.typicode.com/posts?userId=1');
  const { data: todos, loading: todosLoading } = useApi('https://jsonplaceholder.typicode.com/todos?userId=1');

  useEffect(() => {
    if (todos) {
      const completed = todos.filter(todo => todo.completed).length;
      const pending = todos.filter(todo => !todo.completed).length;
      
      setStats({
        totalTasks: todos.length,
        completedTasks: completed,
        pendingTasks: pending,
        todayTasks: Math.floor(Math.random() * 5) + 1 // Mock today's tasks
      });
    }
  }, [todos]);

  const recentActivity = [
    { id: 1, action: 'Completed task "Review project proposal"', time: '2 hours ago', type: 'task' },
    { id: 2, action: 'Added new task "Update documentation"', time: '4 hours ago', type: 'task' },
    { id: 3, action: 'Commented on "Team Meeting Notes"', time: '1 day ago', type: 'comment' },
    { id: 4, action: 'Created new project "Website Redesign"', time: '2 days ago', type: 'project' }
  ];

  const getActivityIcon = (type) => {
    const iconClasses = "w-5 h-5";
    switch (type) {
      case 'task': return <CheckCircle2 className={`${iconClasses} text-green-500`} />;
      case 'comment': return <MessageCircle className={`${iconClasses} text-blue-500`} />;
      case 'project': return <Folder className={`${iconClasses} text-yellow-500`} />;
      default: return <FileText className={`${iconClasses} text-gray-500`} />;
    }
  };

  if (postsLoading || todosLoading) {
    return <Loading size="lg" text="Loading dashboard..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Card.Content className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalTasks}</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </Card.Content>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Card.Content className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completedTasks}</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </Card.Content>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Card.Content className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingTasks}</p>
                </div>
                <div className="text-4xl">⏳</div>
              </div>
            </Card.Content>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Card.Content className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.todayTasks}</p>
                </div>
                <div className="text-4xl">📅</div>
              </div>
            </Card.Content>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/tasks'}
                  >
                    <span className="mr-2">➕</span>
                    Add New Task
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/tasks'}
                  >
                    <span className="mr-2">📋</span>
                    View All Tasks
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/api-data'}
                  >
                    <span className="mr-2">📊</span>
                    View Reports
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="md"
                    className="w-full justify-start"
                    onClick={() => window.location.href = '/about'}
                  >
                    <span className="mr-2">⚙️</span>
                    Settings
                  </Button>
                </div>
              </Card.Content>
            </Card>

            {/* Progress Overview */}
            <Card className="mt-6">
              <Card.Header>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Progress Overview</h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Task Completion</span>
                      <span className="text-gray-900 dark:text-white">
                        {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Week's Goal</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">🎯</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Complete 20 tasks
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2 dark:bg-gray-700">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((stats.completedTasks / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>

        {/* Recent Posts Preview */}
        {posts && posts.length > 0 && (
          <Card className="mt-8">
            <Card.Header>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Posts</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.location.href = '/api-data'}
                >
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.body}
                    </p>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;