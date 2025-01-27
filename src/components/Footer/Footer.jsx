import {
    FaInstagram,
    FaFacebookF,
    FaTiktok,
    FaLinkedinIn,
} from "react-icons/fa";
import logo from "./logo.jpg";

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto flex flex-col items-center">
          <div className="text-center mb-6">
            <div className="flex items-center mb-6">
              <img
                src={logo}
                alt="Logo"
                className="h-12 mr-4"
              />
              <h5 className="text-lg font-semibold">
                Welcome to the CTD Practicum Blog App
              </h5>
            </div>
          </div>
  
          <div className="flex space-x-6 mb-6">
            <a
              href="https://www.instagram.com/code_the_dream/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500" // Updated hover color
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/CodeTheDream/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500" // Updated hover color
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="https://www.tiktok.com/@codethedream"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500" // Updated hover color
            >
              <FaTiktok className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/school/code-the-dream/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500" // Updated hover color
            >
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 Code the Dream. | All Rights Reserved. |{" "}
            <a
              href="https://codethedream.org/privacy-policy"
              className="hover:underline text-gray-300"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
