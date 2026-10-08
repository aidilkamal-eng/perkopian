import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-amber-50">
      <div className="max-w-md w-full text-center">
        <Coffee className="h-16 w-16 text-amber-600 mx-auto" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mt-4 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;