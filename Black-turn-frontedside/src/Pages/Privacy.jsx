import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function Privacy() {
  return (
    <>
    <Header/>
     <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Privacy Policy
      </h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
            SECTION 1 – Information We Collect
          </h2>
          <p className=" text-gray-700">
            We may collect the following:
          </p>

           <p className=" text-gray-700 mt-4">
           • Personal details (Name, Email, Phone, Address)
          </p>

          <p className=" text-gray-700 mt-4">
            • KYC documents (PAN, Aadhaar, Business Registration)
          </p>
          <p className=" text-gray-700 mt-4">
            • Payment details (bank account, UPI, wallet information)
          </p>
          <p className=" text-gray-700 mt-4">
            • Content metadata, earnings information
          </p>
          <p className=" text-gray-700 mt-4">
            • API logs, access tokens, and usage activity
          </p>
          <p className=" text-gray-700 mt-4">
            • Device and browser information
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
            SECTION 2 – How We Use Information
          </h2>
          <p className=" text-gray-700">
           We use your information to:
          </p>
          <p className="mt-4 text-gray-700">
           • Process payouts and collect earnings
          </p>
          <p className="mt-4 text-gray-700">
            • Verify identity and comply with KYC/AML regulations
          </p>
          <p className="mt-4 text-gray-700">
            • Provide API functionality and secure integration
          </p>
           <p className="mt-4 text-gray-700">
            • Improve platform features
          </p>
           <p className="mt-4 text-gray-700">
            • Prevent fraud and unauthorized access
          </p>
           <p className="mt-4 text-gray-700">
            • Maintain legal and regulatory compliance
          </p>
        </div>

         <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
           SECTION 3 – Sharing of Information
          </h2>
          <p className=" text-gray-700">
           We may share data with:
          </p>
           <p className="mt-4 text-gray-700">
            • Banks, payment gateways, and payout partners
          </p>
           <p className="mt-4 text-gray-700">
            • Digital media and streaming platforms
          </p>
           <p className="mt-4 text-gray-700">
            • Regulatory authorities (for compliance)
          </p>
           <p className="mt-4 text-gray-700">
            • Third-party vendors (hosting, analytics, support)
          </p>
           <p className="mt-4 text-gray-700">
            We never sell your data.
          </p>

        </div>

         <div className="mt-6 ">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
            SECTION 4 – Data Security
          </h2>
          <p className=" text-gray-700">
            We implement:
          </p>

           <p className=" text-gray-700 mt-4">
            • Encryption
          </p>

          <p className=" text-gray-700 mt-4">
            • Secure servers
          </p>

          <p className=" text-gray-700 mt-4">
            • Access restrictions
          </p>
          <p className=" text-gray-700 mt-4">
            • API authentication
          </p>
          <p className=" text-gray-700 mt-4">
          However, no digital system is 100% secure.
          </p>
        </div>



         <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
            SECTION 5 – User Rights
          </h2>
          <p className=" text-gray-700">
            You may:
          </p>

           <p className=" text-gray-700 mt-4">
           • Request access to your data
          </p>

          <p className=" text-gray-700 mt-4">
            • Update or correct information
          </p>
          <p className=" text-gray-700 mt-4">
            • Request deletion (subject to legal requirements)
          </p>

          <p className=" text-gray-700 mt-4">
            • Withdraw consent for marketing communications
          </p>

        </div>

         <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
           SECTION 6 – Cookies
          </h2>
          <p className=" text-gray-700">
           We may use cookies for:
          </p>
           <p className=" text-gray-700">
          • Login sessions
          </p>
           <p className=" text-gray-700">
           • Analytics
          </p>
           <p className=" text-gray-700">
          • Improving user experience
          </p>

        </div>

        

      </div>


    </div>

    <Footer/>
    </>
  )
}

export default Privacy
