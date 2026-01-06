import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function Privacy() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">

          {/* Section 1 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 1 – Information Collected
            </h2>
            <p>We may collect the following:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Personal details (Name, Email, Phone, Address)</li>
              <li>KYC documents (PAN, Aadhaar, Business Registration)</li>
              <li>Banking & payment details (Account, UPI, Wallet)</li>
              <li>Transaction data & payout history</li>
              <li>Communication records & support interactions</li>
              <li>API logs, tokens, and usage tracking</li>
              <li>Device & browser information</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 2 – Use of Information
            </h2>
            <p>We use your information to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Process payouts, settlements, and royalty distribution</li>
              <li>Verify identity and perform compliance checks</li>
              <li>Manage taxation, reporting, and accounting requirements</li>
              <li>Provide customer support and resolve disputes</li>
              <li>Enhance platform features and service performance</li>
              <li>Prevent fraud and secure accounts</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 3 – Data Sharing
            </h2>
            <p>We only share information with trusted and necessary parties such as:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Banks, payment gateways, and financial partners</li>
              <li>Regulatory and government authorities (where required)</li>
              <li>Streaming or digital distribution partners</li>
              <li>Internal teams and service providers (hosting, analytics, security)</li>
            </ul>
            <p className="mt-3 font-semibold">We never sell your data.</p>
          </div>

          {/* Section 4 */}
          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 4 – Data Security
            </h2>
            <p>We follow strict security practices including:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Encryption and secure payment processing</li>
              <li>Protected and monitored servers</li>
              <li>Restricted access controls</li>
              <li>API authentication and token security</li>
            </ul>
            <p className="mt-3">
              However, no digital system is 100% secure, and risks cannot be fully eliminated.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 5 – Data Retention
            </h2>
            <p>
              We retain data only as long as necessary for legal compliance, business operations,
              taxation, and dispute resolution. After the required duration, data is securely deleted.
            </p>
          </div>

          {/* Section 6 */}
          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 6 – Client Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Request access to your stored personal information</li>
              <li>Request updates or corrections to inaccurate data</li>
              <li>Request deletion unless restricted by legal regulations</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </div>

          {/* Section 7 */}
          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 7 – Cookies
            </h2>
            <p>We may use cookies to enhance experience, including:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Login session management</li>
              <li>Usage analytics and performance insights</li>
              <li>User interface improvements</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 8 – Consent
            </h2>
            <p className="text-gray-700">
              By using our payout and digital distribution services, you consent to our Privacy Policy
              and the processing of your information as described above.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Privacy
