import { useState } from 'react';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NewReview from './NewReview';
import AccountPage from './AccountPage';
import UserReviewPage from './UserReviewPage';
import AccountSettings from './AccountSettingsPage';

function Profile() {
 
  const [content, setContent] = useState('account'); 

 
  const renderContent = () => {
    switch (content) {
      case 'account':
        return <AccountPage />;
      case 'login-user-review':
        return <UserReviewPage />;
      case 'add-review':
        return <NewReview />;
      case 'account-settings':
        return <AccountSettings />;
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