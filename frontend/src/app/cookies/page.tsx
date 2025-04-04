import React from 'react';

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Remembering your preferences</li>
            <li>Understanding how you use our website</li>
            <li>Improving your browsing experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
          <h3 className="text-xl font-medium mb-2">2.1 Essential Cookies</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
          </p>

          <h3 className="text-xl font-medium mb-2">2.2 Analytics Cookies</h3>
          <p className="mb-4">
            We use analytics cookies to understand how visitors interact with our website. This helps us improve our content and user experience.
          </p>

          <h3 className="text-xl font-medium mb-2">2.3 Preference Cookies</h3>
          <p className="mb-4">
            These cookies remember your settings and preferences, such as language preferences and location settings.
          </p>

          <h3 className="text-xl font-medium mb-2">2.4 Marketing Cookies</h3>
          <p className="mb-4">
            These cookies track your online activity to help advertisers deliver more relevant advertising or to limit how many times you see an ad.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How to Control Cookies</h2>
          <p className="mb-4">
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
          <p className="mb-4">
            We use services from third parties that may also set cookies on your device. These include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Google Analytics</li>
            <li>Social media platforms</li>
            <li>Advertising networks</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at:
            <br />
            Email: legal@chivoyage.com
          </p>
        </section>
      </div>
    </div>
  );
} 