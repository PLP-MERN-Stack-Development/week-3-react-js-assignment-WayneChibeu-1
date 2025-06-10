import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  const features = [
    {
      title: 'Task Management',
      description: 'Create, manage, and track your tasks with our intuitive task manager.',
      icon: '📱',
      link: '/about'
    },
    {
      title: 'Dark Mode',
      description: 'Toggle between light and dark themes for comfortable viewing.',
      icon: '🌙',
      link: '/about#theme'
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with external APIs and real-time data updates.',
      icon: '🔄',
      link: '/api-data'
    },
    {
      title: 'Modern Design',
      description: 'Beautiful UI with Tailwind CSS and responsive layouts.',
      icon: '✨',
      link: '/about'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{' '}
            <span className="text-blue-600 dark:text-blue-400">ReactApp</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            A modern React application showcasing component architecture, state management, 
            API integration, and beautiful responsive design with Tailwind CSS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tasks">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link to="/api-data">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} hover className="h-full">
              <div className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <Card.Title className="mb-3">{feature.title}</Card.Title>
                <Card.Content className="mb-4">
                  {feature.description}
                </Card.Content>
                <Link to={feature.link}>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Built with Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                React 18
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Latest React
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                Tailwind
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                CSS Framework
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                Vite
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Build Tool
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                Hooks
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                State Management
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <Card.Header>
              <Card.Title className="text-2xl">Ready to Explore?</Card.Title>
            </Card.Header>
            <Card.Content>
              <p className="mb-6">
                Discover all the features of this React application. From task management 
                to API integration, there's something for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/tasks">
                  <Button className="w-full sm:w-auto">
                    Try Task Manager
                  </Button>
                </Link>
                <Link to="/api-data">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    View API Demo
                  </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;