
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-semibold">YorumVar</h2>
          <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="text-white hover:text-gray-400">About Us</a>
          <a href="#" className="text-white hover:text-gray-400">Contact</a>
          <a href="#" className="text-white hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="text-white hover:text-gray-400">Terms of Service</a> 
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

