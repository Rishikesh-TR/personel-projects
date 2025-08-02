import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Map } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-800 mb-6">Page Not Found</h2>
        <p className="text-neutral-600 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center"
          >
            <Home size={18} className="mr-2" />
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/editor/new')}
            className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 flex items-center"
          >
            <Map size={18} className="mr-2" />
            Start New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;