import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-950/90 backdrop-blur-md text-gray-300 py-6 px-4 border-t border-gray-800 shadow-inner flex flex-col items-center justify-center text-center">
      <p className="text-sm sm:text-base mb-1">
        © {new Date().getFullYear()} <span className="font-medium text-white">CineSpot</span> — All rights reserved.
      </p>
      <span className="text-xs sm:text-sm text-gray-400">
        Made with <span className="text-red-500">❤️</span> by{" "}
        <a
          href="https://github.com/Kunal"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-400 font-semibold transition-all duration-300 hover:underline"
        >
          Kunal
        </a>
      </span>

      {/* Optional social icons section */}
      <div className="flex gap-4 mt-3">
        <a
          href="https://github.com/Kunal"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-5 h-5"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform duration-300"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
            alt="LinkedIn"
            className="w-5 h-5"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
