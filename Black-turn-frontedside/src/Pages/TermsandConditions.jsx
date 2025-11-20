import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function TermsandConditions() {
  return (

    <>

      <Header />
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p className="">
            Welcome to <span className="font-semibold text-gray-900">The Black Turn</span> we By accessing or using our website, platform, tools, distribution services, payment gateway, or API services , you agree to the following Terms & Conditions and Policies.
          </p>



          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              1.1 Definitions
            </h2>
            <p className=" text-gray-700">
              <span className="font-semibold text-gray-900">•	Client/Artist/User </span>:- Any individual, label, or entity using our Services.
            </p>

            <p className=" text-gray-700">
              <span className="font-semibold text-gray-900">•	Royalties  </span>:- Earnings generated from streaming, licensing, downloads, and digital distribution.
            </p>

            <p className=" text-gray-700">
              <span className="font-semibold text-gray-900">•	API Services </span>:- Automated collection and payout solutions provided by us.
            </p>

            <p className=" text-gray-700">
              <span className="font-semibold text-gray-900">• Wallet Balance  </span>:- Amount available in your dashboard for withdrawal.
            </p>







          </div>

          <div className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              Section 2 - Scope of Services
            </h2>
            <p className=" text-gray-700">
              <p className=" text-gray-700">
                We provide:
              </p>
            </p>
            <p className="mt-4 text-gray-700">
              •	Media & digital content distribution
            </p>
            <p className="mt-4 text-gray-700">
               •	Royalty and earnings collection
            </p>
            <p className="mt-4 text-gray-700">
              •	Payout services to artists, labels, and rights owners
            </p>
            <p className="mt-4 text-gray-700">
              •	API-based automated collection and disbursement
            </p>
            <p className="mt-4 text-gray-700">
              •	Dashboard to track statements and payments
            </p>
          </div>

          <div className="mt-6">
            <h2 className=" text-xl uppercase font-medium text-gray-800 mb-4">
              Section 3 - User Obligations
            </h2>
            <p className=" text-gray-700">
              Users must:
            </p>
            <p className="mt-4 text-gray-700">
              •	Provide accurate identity, KYC, and bank details.
            </p>
            <p className="mt-4 text-gray-700">
              •	Own or have legal rights to all submitted content.
            </p>
            <p className="mt-4 text-gray-700">
              •	Not upload infringing, illegal, or misleading content.
            </p>
            <p className="mt-4 text-gray-700">
              •	Maintain security of account credentials and API keys.
            </p>
          </div>

          <div className="mt-6">
            <h2 className=" text-xl font-medium text-gray-800 mb-4 ">
              SECTION 4 – Payments, Royalties & Withdrawals
            </h2>
            <p className=" text-gray-700">
              •	We collect revenue on behalf of Clients from platforms.
            </p>
            <p className="mt-4 text-gray-700">
              •	Payouts are processed to the registered bank account via manual or API-driven release.
            </p>
            <p className="mt-4 text-gray-700">
              •	Minimum thresholds, settlement timelines, and charges may apply.
            </p>
             <p className="mt-4 text-gray-700">
              •	Taxes, TDS, and statutory deductions will be applied as per law.
            </p>
             <p className="mt-4 text-gray-700">
              •	Funds may be withheld for legal disputes, copyright claims, or suspicious activity.
            </p>
          </div>

          <div className="mt-6">
            <h2 className=" text-2xl font-medium text-gray-800 mb-4">
              SECTION 5 – Intellectual Property
            </h2>
            <p className=" text-gray-700">
             • Users retain 100% ownership of content.
            </p>
            <p className="mt-4 text-gray-700">
              • A limited license is granted to us for distribution.
            </p>
            <p className="mt-4 text-gray-700">
              • Users are responsible for copyright or content-related disputes.
            </p>
       

          </div>

          <div className="mt-6">
            <h2 className=" text-2xl font-medium text-gray-800 mb-4">
              SECTION 6 – Liability Limitation
            </h2>
            <p className=" text-gray-700">
              We are not liable for:
            </p>
            <p className="mt-4 text-gray-700">
              • Delayed revenue reports from platforms
            </p>
            <p className="mt-4 text-gray-700">
              • Incorrect bank details submitted by clients
            </p>
             <p className="mt-4 text-gray-700">
              • Loss of earnings due to content platform policy changes
            </p>
             <p className="mt-4 text-gray-700">
              • Indirect or consequential damages
            </p>
             <p className="mt-4 text-gray-700">
              Our maximum liability is limited to fees paid by the Client in the last 12 months.
            </p>
          </div>

          <div className="mt-6">
            <h2 className=" text-2xl font-medium text-gray-800 mb-4">
              SECTION 7 – Termination
            </h2>
            <p className=" text-gray-700">
              We may suspend or terminate services if:
            </p>
            <p className="mt-4 text-gray-700">
              • Fraud or manipulation (e.g., artificial streaming) is detected
            </p>
            <p className="mt-4 text-gray-700">
              • Legal or banking compliance requires it
            </p>
            <p className="mt-4 text-gray-700">
              • User violates these Terms
            </p>
          </div>

          <div className="mt-6">
            <h2 className=" text-2xl font-medium text-gray-800 mb-4">
              SECTION 8 – Governing Law
            </h2>
            <p className=" text-gray-700">
              These Terms are governed by the laws of India, under the jurisdiction of [City] Courts.
            </p>
          
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TermsandConditions