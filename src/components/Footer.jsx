import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'API Data', href: '/api-data' },
    { name: 'About', href: '/about' }
  ];
  
  const socialLinks = [
    { 
      name: 'GitHub', 
      href: 'https://github.com/WayneChibeu', 
      icon: Github,
      hoverColor: 'hover:text-gray-100'
    },
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/wayne-chibeu/', 
      icon: Linkedin,
      hoverColor: 'hover:text-blue-400'
    }
  ];
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">ReactApp</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              A modern React application demonstrating component architecture, 
              state management, and API integration with beautiful Tailwind CSS styling.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${link.hoverColor} transition-colors duration-200`}
                  aria-label={link.name}
                >
                  <link.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="text-gray-300 space-y-3">
              <a 
                href="mailto:jllbonny@gmail.com" 
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                <span>jllbonny@gmail.com</span>
              </a>
              <a 
                href="tel:+254114472943" 
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
                <span>+254 114 472 943</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Mombasa, KE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} ReactApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;