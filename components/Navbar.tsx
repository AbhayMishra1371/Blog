import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-brand-navy/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10">
            <img
              src="/icon.png"
              alt="Studzee Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Studzee</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-brand-orange underline underline-offset-8 decoration-2">Blog</Link>
          <Link href="#" className="text-sm font-medium text-white/90 hover:text-brand-orange transition-colors">Pages</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
