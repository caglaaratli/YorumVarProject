import Header from "../components/Header";
import SearchBarHome from "../components/SearchBarHome";
import Footer from "../components/Footer"; // Footer'ı import edin

function HomePage() {
  return (
    <div className="min-h-screen relative bg-logo-pattern bg-cover bg-center flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-50 z-10">
          <SearchBarHome />
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default HomePage;
