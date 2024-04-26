import  { useEffect, useState } from 'react';
import { getUserProfile } from '../services/api';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NewReview from './NewReview';

function Profile() {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState('account'); // İçerik yönetimi için state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Profile fetch failed:', error);
      }
    };

    fetchProfile();
  }, []);

  const renderContent = () => {
    switch (content) {
      case 'account':
        return user ? (
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800 mb-6">{user.name}</p>
            <p>ID: {user.id}</p>
            <p>Kullanıcı Adı: {user.username}</p>
          </div>
        ) : (
          <p>Yükleniyor...</p>
        );
      case 'reviews':
        return <p>Değerlendirmelerim</p>;
      case 'add-review':
        return <NewReview />;
      case 'account-settings':
        return <p>Account Settings</p>;
      default:
        return <p>Seçim yapınız</p>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex flex-grow flex-col md:flex-row">
        <div className="md:w-1/5 w-full bg-gray-200">
          <Sidebar setContent={setContent} />
        </div>
        <div className="md:w-4/5 w-full bg-gray-100 p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Profile;