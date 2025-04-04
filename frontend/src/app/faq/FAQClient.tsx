'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'What is Chi Voyage?',
    answer: 'Chi Voyage is a platform dedicated to helping you discover the best places in Chicago. We provide comprehensive guides to restaurants, attractions, activities, and events in the city.',
  },
  {
    question: 'How do I search for places?',
    answer: 'You can search for places using the search bar at the top of any page. Enter keywords like "restaurants", "museums", or specific names of places. You can also use filters to narrow down your search by category, price range, or rating.',
  },
  {
    question: 'How are ratings calculated?',
    answer: 'Ratings are based on our comprehensive evaluation criteria. We consider factors like quality, service, atmosphere, and value for money. Each place is rated on a scale of 1 to 5 stars.',
  },
  {
    question: 'Can I suggest a new place to be added?',
    answer: 'Yes! We welcome suggestions for new places. You can submit a place through our contact form or email us at hello@chivoyage.com with the details.',
  },
  {
    question: 'How do I report incorrect information about a place?',
    answer: 'If you notice any incorrect information about a place listing, you can report it by clicking the "Report Issue" button on the place\'s page. Alternatively, you can contact our support team at hello@chivoyage.com.',
  },
  {
    question: 'Is Chi Voyage free to use?',
    answer: 'Yes, Chi Voyage is completely free to use. You can browse places, read reviews, and get recommendations without any cost.',
  },
  {
    question: 'How often is the information updated?',
    answer: 'We strive to keep our information as up-to-date as possible. Our team regularly reviews and updates place information, including hours, prices, and other details. If you notice outdated information, please let us know.',
  },
  {
    question: 'Do you have a mobile app?',
    answer: 'Currently, Chi Voyage is available as a web application that works on all devices. We are working on a mobile app that will be available in the future.',
  },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find answers to common questions about Chi Voyage.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 py-5 sm:px-6 flex justify-between items-center text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
                    <p className="text-base text-gray-500">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Still have questions?</h2>
            <p className="mt-4 text-base text-gray-500">
              Contact our support team for additional assistance.
            </p>
            <div className="mt-6">
              <a
                href="mailto:hello@chivoyage.com"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 