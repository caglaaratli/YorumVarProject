import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from "../components/Header";
import SearchBarHome from "../components/SearchBarHome";
import Footer from "../components/Footer";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

function HomePage() {
  return (
    <div className="min-h-screen relative bg-logo-pattern bg-cover bg-center flex flex-col font-sans">
      <Header />
      <div className="flex-grow bg-gray-100 bg-opacity-50">
        <div className="flex flex-col items-center justify-center min-h-screen z-10 mt-4">
          <div className="mt-4">
            <SearchBarHome />
          </div>
          <motion.div 
            className="grid grid-cols-1 gap-7 mt-4 max-w-6xl w-full"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="grid grid-cols-2 gap-14">
              <motion.div 
                className="card bg-white p-6 rounded-lg shadow-md w-full h-72"
                variants={cardVariants}
              >
                <h2 className="text-lg font-bold mb-2">Neden YorumVar?</h2>
                <p>
                  YorumVar, kullanıcıların alışveriş deneyimlerini daha bilinçli ve güvenilir bir şekilde yapabilmeleri için önemli bir araçtır. Şeffaf ve tarafsız kullanıcı yorumları sayesinde, potansiyel alıcılar için değerli bir bilgi kaynağı oluşturuyoruz. Ayrıca, markalar ve satıcılar da bu geri bildirimlerden yararlanarak hizmetlerini ve ürünlerini geliştirme fırsatı bulabilirler.
                </p>
                <br></br>
                <p>
                  YorumVar ile güvenli ve bilinçli alışverişin keyfini çıkarın!
                </p>
              </motion.div>
              <motion.div 
                className="card bg-white p-6 rounded-lg shadow-md w-full h-72"
                variants={cardVariants}
              >
                <h2 className="text-lg font-bold mb-2">Neyi Amaçlıyoruz?</h2>
                <p>
                  YorumVar olarak, kullanıcı deneyimini merkeze alan ve topluluk odaklı bir platform oluşturmayı hedefliyoruz. Amacımız, şeffaf ve güvenilir bir ortamda kullanıcıların alışveriş deneyimlerini paylaşmalarını ve herkesin daha bilinçli ve memnun edici alışveriş deneyimleri yaşamasını sağlamaktır. Bu sayede hem tüketicilere hem de satıcılara değer katmaktır.
                </p>
              </motion.div>
            </div>
            <motion.div 
              className="card bg-white p-4 rounded-lg shadow-md text-center col-span-2 w-1/2 mx-auto mt-4"
              variants={cardVariants}
            >
              <h2 className="text-md font-light">Sende ürün değerlendirmek istiyorsan şimdi <Link to="/login"><b>giriş yap!</b></Link></h2>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
