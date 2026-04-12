import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle } from 'lucide-react';

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-sm w-full mx-4">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Logged Out</h2>
        <p className="text-slate-500 text-sm mb-7">You've been successfully logged out of the admin panel.</p>
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
        >
          <LogOut size={16} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Logout;
