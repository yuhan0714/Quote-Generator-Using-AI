'use client';

import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const menuItems = [
  { key: 'HomePage.Header.Home', href: '/' },
  { key: 'HomePage.Header.Incorrect quote generator', href: '/incorrectquotegenerator' },
  { key: 'HomePage.Header.Inspirational quote generator', href: '/inspirationalquotegenerator' },
  { key: 'HomePage.Header.AI quote generator', href: '/aiquotegenerator' },
  { key: 'HomePage.Header.Random quote generator', href: '/randomquotegenerator' },
];

export default function ClientSideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  return (
    <nav className="ml-2 sm:ml-2 md:ml-16 lg:ml-52 xl:ml-62">
      {/* Desktop menu */}
      <ul className={`hidden sm:flex space-x-10`}>
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link href={item.href} className="text-gray-600 hover:text-gray-900">
              {t(item.key)}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu button */}
      <button
        className="sm:hidden absolute right-2 top-5 text-gray-600 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col items-center justify-center flex-grow space-y-8 bg-gray-200" style={{ padding: 20 }}>
              {menuItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
