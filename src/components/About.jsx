import React, { useState } from 'react';
import { Github, ExternalLink, Code, Zap, Palette, Smartphone, Moon, Puzzle, Settings, Link, Save, ChevronRight, Star, Heart } from 'lucide-react';

// Modern Card Component
const Card = ({ children, className = '', hover = true, gradient = false }) => {
  const baseClasses = `relative overflow-hidden rounded-2xl backdrop-blur-sm transition-all duration-500 ${
    hover ? 'hover:scale-105 hover:-translate-y-1' : ''
  }`;
  
  const bgClasses = gradient 
    ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20'
    : 'bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50';
    
  const shadowClasses = hover 
    ? 'shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10'
    : 'shadow-md';

  return (
    <div className={`${baseClasses} ${bgClasses} ${shadowClasses} ${className}`}>
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Modern Button Component
const Button = ({ children, variant = 'primary', size = 'md', onClick, className = '', ...props }) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    outline: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500',
    ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
  };
  
  return (
    <button 
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const About = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const technologies = [
    {
      name: 'React 18+',
      description: 'Latest React with Server Components, Suspense, and Concurrent Features',
      icon: Code,
      color: 'from-sky-500 to-blue-500',
      bgColor: 'bg-sky-50 dark:bg-sky-900/20'
    },
    {
      name: 'Tailwind CSS 3',
      description: 'Modern utility-first CSS with JIT engine and custom animations',
      icon: Palette,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20'
    },
    {
      name: 'Vite 5.0',
      description: 'Next-gen frontend tooling with HMR and optimized build performance',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      name: 'React Router 6',
      description: 'Modern client-side routing with data loading and TypeScript support',
      icon: Link,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20'
    },
    {
      name: 'Modern Hooks',
      description: 'Advanced hooks patterns with custom hooks and state management',
      icon: Settings,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      name: 'Context + Reducers',
      description: 'Scalable state management with Context API and useReducer patterns',
      icon: Puzzle,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50 dark:bg-violet-900/20'
    }
  ];

  const features = [
    {
      title: 'Responsive Design',
      description: 'Flawless experience across all devices and screen sizes',
      icon: Smartphone,
      gradient: 'from-blue-600 to-cyan-600'
    },
    {
      title: 'Dark Mode Support',
      description: 'Elegant theme switching with persistent preferences',
      icon: Moon,
      gradient: 'from-purple-600 to-indigo-600'
    },
    {
      title: 'Component Architecture',
      description: 'Modular, reusable components following best practices',
      icon: Puzzle,
      gradient: 'from-green-600 to-teal-600'
    },
    {
      title: 'Performance Optimized',
      description: 'Lightning-fast loading with modern optimization techniques',
      icon: Zap,
      gradient: 'from-yellow-600 to-orange-600'
    },
    {
      title: 'API Integration',
      description: 'Seamless data fetching with error handling and caching',
      icon: Link,
      gradient: 'from-red-600 to-pink-600'
    },
    {
      title: 'Local Storage',
      description: 'Persistent data with intelligent state management',
      icon: Save,
      gradient: 'from-indigo-600 to-purple-600'
    }
  ];

  const stats = [
    { label: 'Components', value: '25+', icon: Puzzle },
    { label: 'Pages', value: '8', icon: Code },
    { label: 'Hooks', value: '12', icon: Settings },
    { label: 'Features', value: '15+', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 mb-8">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Built with passion
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About This
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Project</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                A comprehensive React application showcasing modern web development 
                practices, component architecture, and cutting-edge design patterns.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6" gradient>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Technologies Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                Built With Modern Technologies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Leveraging the latest tools and frameworks for optimal performance and developer experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <Card key={index} className={`group p-8 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 ${tech.bgColor} border border-gray-200/50 dark:border-gray-700/50`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <tech.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {tech.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features & Capabilities
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Every feature is crafted with attention to detail and user experience in mind
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-8 group">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Project Highlights */}
          <Card className="p-12 mb-16" gradient>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Development Highlights
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                      Architecture & Design
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-5">
                      <li>• Component-based modular architecture</li>
                      <li>• Separation of concerns and single responsibility</li>
                      <li>• Reusable UI components with consistent styling</li>
                      <li>• Responsive design using Tailwind CSS utilities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-3"></div>
                      Performance & UX
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-5">
                      <li>• Fast development and build times with Vite</li>
                      <li>• Optimized re-renders with React 18 features</li>
                      <li>• Smooth animations and micro-interactions</li>
                      <li>• Cross-browser compatibility and accessibility</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/50">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Ready to Explore?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Dive into the source code and see these features in action
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        variant="primary" 
                        size="md"
                        className="group"
                        onClick={() => window.open('https://github.com/WayneChibeu/week-3-react-js-assignment-WayneChibeu-1', '_blank')}
                      >
                        <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        View Source
                      </Button>
                      <Button 
                        variant="outline" 
                        size="md"
                        onClick={() => window.open('https://reactjs.org', '_blank')}
                      >
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Learn React
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="p-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none">
              <h2 className="text-3xl font-bold mb-4">
                Start Building Something Amazing
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Use this project as a foundation for your next React application. 
                Modern, scalable, and ready for production.
              </p>
              <Button 
                variant="ghost" 
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50"
              >
                Get Started Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;