import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
        <AlertTriangle size={36} className="text-red-500" />
      </div>
      <h1 className="text-6xl font-bold text-slate-800 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-slate-700 mb-3">Page Not Found</h2>
      <p className="text-slate-500 text-sm mb-8 max-w-sm">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
