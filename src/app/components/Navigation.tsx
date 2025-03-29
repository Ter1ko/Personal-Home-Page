'use client';

import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex space-x-24">
          <Link href="/" className="text-gray-800 hover:text-alice-primary transition-colors duration-300 text-lg">
            Home
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-alice-primary transition-colors duration-300 text-lg">
            About
          </Link>
          <Link href="/work" className="text-gray-800 hover:text-alice-primary transition-colors duration-300 text-lg">
            Work
          </Link>
          <Link href="/contact" className="text-gray-800 hover:text-alice-primary transition-colors duration-300 text-lg">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 