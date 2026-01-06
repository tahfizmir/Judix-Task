import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAPI } from '../services/api';
import { setAuth } from '../store';

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setApiError('');

      const response = await authAPI.signup({
        name: data.name,
        email: data.email,
        password: data.password
      });

      const { token, user } = response.data;
      dispatch(setAuth({ user, token }));
      navigate('/dashboard');
    } catch (error) {
      setApiError(error.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4 py-8">
      {/* Server Status Banner */}
      <div className="fixed top-0 left-0 right-0 bg-amber-50 border-b border-amber-200 px-4 py-3 z-50">
        <div className="max-w-md mx-auto flex items-start gap-3">
          <div className="text-amber-600 text-xl mt-0.5">⚠️</div>
          <div className="text-sm">
            <p className="font-semibold text-amber-900">Free Server Note</p>
            <p className="text-amber-800 mt-1">This uses a free Render server that goes to sleep after 15 minutes of inactivity. First request may take up to 50 seconds to respond.</p>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-md mt-20">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Judix</h1>
          <p className="text-center text-gray-600 mb-8">Create Your Account</p>

          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                {...register('name', {
                  required: 'Name is required',
                  maxLength: {
                    value: 50,
                    message: 'Name must not exceed 50 characters'
                  }
                })}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
