import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Judix</h1>
        <p className="text-xl md:text-2xl text-blue-100 mb-12">
          Your ultimate task management solution for staying organized and productive
        </p>

        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-blue-700 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors border-2 border-white"
          >
            Sign Up
          </button>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg border border-white border-opacity-20">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="text-white font-bold mb-2">Easy to Use</h3>
            <p className="text-blue-100 text-sm">Simple and intuitive interface for managing your tasks</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg border border-white border-opacity-20">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-white font-bold mb-2">Secure</h3>
            <p className="text-blue-100 text-sm">Your data is protected with industry-leading security</p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg border border-white border-opacity-20">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-white font-bold mb-2">Track Progress</h3>
            <p className="text-blue-100 text-sm">Monitor your task completion with detailed statistics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
