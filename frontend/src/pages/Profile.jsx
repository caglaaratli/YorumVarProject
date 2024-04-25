import Header from "../components/Header";
import { useEffect, useState } from 'react';

import { getUserProfile } from '../services/api'; // API fonksiyonunu import edin

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data); // Sunucudan gelen kullanıcı bilgilerini ayarla
      } catch (error) {
        console.error('Profile fetch failed:', error);
        // Hata yönetimi yapabilirsiniz, örneğin kullanıcıyı login sayfasına yönlendirme
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {user ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800 mb-6">
              {user.name}
            </p>
            <p>{user.id}</p>
            <p>{user.username}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Profile;