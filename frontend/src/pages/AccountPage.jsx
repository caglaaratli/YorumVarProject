import { useEffect, useState } from 'react';
import { getUserProfile, getUserReviewCount } from '../services/api';

import iconSet from '../assets/selection.json';
import Icon from 'react-icomoon';

function AccountPage() {
  const [user, setUser] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
        const reviewCountResponse = await getUserReviewCount();
        setReviewCount(reviewCountResponse.data.reviewCount);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-center space-x-3 mb-4">
          <Icon iconSet={iconSet} icon="user-filled" className="h-6 w-6 text-gray-500" />
            <p className="text-gray-700 flex-1"><span className="font-medium">Name:</span> {user.name}</p>
          </div>
          <div className="flex items-center space-x-3 mb-4">
          <Icon iconSet={iconSet} icon="user-filled" className="h-6 w-6 text-gray-500" />
            <p className="text-gray-700 flex-1"><span className="font-medium">Surname:</span> {user.surname}</p>
          </div>
          <div className="flex items-center space-x-3 mb-4">
          <Icon iconSet={iconSet} icon="user-circle" className="h-6 w-6 text-gray-500" />
            <p className="text-gray-700 flex-1"><span className="font-medium">Username:</span> {user.username}</p>
          </div>
          <div className="flex items-center space-x-3 mb-4">
          <Icon iconSet={iconSet} icon="email" className="h-6 w-6 text-gray-500" />
            <p className="text-gray-700 flex-1"><span className="font-medium">E-mail:</span> {user.mail}</p>
          </div>
          <div className="flex items-center space-x-3 mb-4">
          <Icon iconSet={iconSet} icon="telephone" className="h-6 w-6 text-gray-500" />
            <p className="text-gray-700 flex-1"><span className="font-medium">Phone Number:</span> {user.phone}</p>
          </div>
          <div className="flex items-center space-x-3 mb-4">
          <Icon iconSet={iconSet} icon="review" className="h-6 w-6 text-gray-500" />
            <p className="text-gray-700 flex-1"><span className="font-medium">Review Count:</span> {reviewCount}</p>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Yükleniyor...</p>
      )}
    </div>
  );
}

export default AccountPage;
``
