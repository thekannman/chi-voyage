'use client';

import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactClient() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get in touch with the Chi Voyage team.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href="mailto:hello@chivoyage.com"
                      className="flex items-center text-blue-600 hover:text-blue-500"
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-2" />
                      hello@chivoyage.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Chicago, IL
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Support Hours</h2>
            <p className="mt-4 text-base text-gray-500">
              Monday - Friday: 9:00 AM - 5:00 PM CST
            </p>
            <p className="mt-2 text-base text-gray-500">
              Saturday - Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 