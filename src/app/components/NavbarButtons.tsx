// components/NavbarButtons.tsx
import Link from 'next/link';
import React from 'react';

const NavbarButtons: React.FC = () => {
  return (
    <div className="absolute top-4 right-4 space-x-4 z-50">
      <Link href="/login" passHref>
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          Login
        </button>
      </Link>
      <Link href="/signup" passHref>
        <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
          Signup
        </button>
      </Link>
    </div>
  );
};

export default NavbarButtons;
