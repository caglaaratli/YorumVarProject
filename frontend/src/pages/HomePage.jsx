import Header from "../components/Header";
import SearchBarHome from "../components/SearchBarHome"; 

function HomePage() {
  return (
    <div className="min-h-screen relative bg-logo-pattern bg-cover bg-center">
      <Header />
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-50 z-10">
          <SearchBarHome />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
