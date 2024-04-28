import  { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';
import { getUserReviewCount } from '../services/api';


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
      <p className="text-gray-700"><span className="font-medium">Name:</span> {user.name}</p>
      <p className="text-gray-700"><span className="font-medium">Surname:</span> {user.surname}</p>
      <p className="text-gray-700"><span className="font-medium">Username:</span> {user.username}</p>
      <p className="text-gray-700"><span className="font-medium">E-mail:</span> {user.mail}</p>
      <p className="text-gray-700"><span className="font-medium">Phone Number:</span> {user.phone}</p>
      <p className="text-gray-700"><span className="font-medium">Review Count:</span> {reviewCount}</p>
    </div>
  ) : (
    <p className="text-lg text-gray-500">Yükleniyor...</p>
  )}
</div>

  );
}

export default AccountPage;
