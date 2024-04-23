import Header from "../components/Header"; // Varsayılan olarak Header componentini import et

function Profile() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
           asdasdasd
          </h1>
        </div>
      </div>
    </>
  );
}

export default Profile;
