'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function CareersClient() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Join Our Team
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Help us build the future of Chicago exploration.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Our Culture</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-base text-gray-500">
                At Chi Voyage, we're passionate about helping people discover the best of Chicago. 
                We believe in creating a collaborative environment where innovation and creativity thrive. 
                Our team is dedicated to providing the most comprehensive and up-to-date information about 
                the city's restaurants, attractions, and activities.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Interested in Working With Us?</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-base text-gray-500">
                While we don't have any open positions at the moment, we're always interested in 
                connecting with talented individuals who share our passion for Chicago. If you'd 
                like to be considered for future opportunities, please reach out to us.
              </p>
              <div className="mt-6">
                <a
                  href="mailto:careers@chivoyage.com"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 