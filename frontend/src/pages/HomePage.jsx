
import Header from "../components/Header";
import SearchBarHome from "../components/SearchBarHome"; // Arama çubuğu için yeni bir component


function HomePage() {
  return (
    <div className="min-h-screen sticky top-0 z-50 flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <SearchBarHome />
     
        </div>
      </div>
    </div>
  );
}

export default HomePage;