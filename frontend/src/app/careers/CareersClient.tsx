'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function CareersClient() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Join Our Team</h1>
          <p className="text-lg mb-8">
            We&apos;re always looking for talented individuals to join our team. If you&apos;re passionate about travel and technology, we&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Our Culture</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-base text-gray-500">
                At Chi Voyage, we&apos;re passionate about helping people discover the best of Chicago. 
                We believe in creating a collaborative environment where innovation and creativity thrive. 
                Our team is dedicated to providing the most comprehensive and up-to-date information about 
                the city&apos;s restaurants, attractions, and activities.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Interested in Working With Us?</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-base text-gray-500">
                While we don&apos;t have any open positions at the moment, we&apos;re always interested in 
                connecting with talented individuals who share our passion for Chicago. If you&apos;d 
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Why Work With Us?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Flexible work environment</li>
                <li>Competitive compensation</li>
                <li>Opportunities for growth</li>
                <li>Work on exciting travel technology</li>
                <li>Help travelers discover amazing places</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Current Openings</h2>
              <p className="mb-4">
                We&apos;re currently looking for the following positions:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Frontend Developer</li>
                <li>Backend Developer</li>
                <li>Product Designer</li>
                <li>Content Writer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 