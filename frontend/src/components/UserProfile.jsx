import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../store';
import { authAPI } from '../services/api';

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);
  const [profile, setProfile] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: user?.name || '', bio: user?.bio || '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data.user);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await authAPI.updateProfile(editData);
      setProfile(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate('/login');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {profile?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{profile?.name}</p>
          <p className="text-xs text-gray-600">{profile?.email}</p>
        </div>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>

            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  className="input-field"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Name"
                />
                <textarea
                  className="input-field"
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  placeholder="Bio"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button onClick={handleUpdateProfile} className="btn-primary flex-1 text-sm">
                    Save
                  </button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary flex-1 text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Email:</span> {profile?.email}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Bio:</span> {profile?.bio || 'No bio added'}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary text-sm w-full"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
