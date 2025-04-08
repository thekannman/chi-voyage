import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/blog" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="https://twitter.com/chivoyage" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://facebook.com/realchivoyage" className="text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-[var(--border-color)] pt-8">
          <p className="text-base text-[var(--text-secondary)] text-center">
            © {new Date().getFullYear()} Chi Voyage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 