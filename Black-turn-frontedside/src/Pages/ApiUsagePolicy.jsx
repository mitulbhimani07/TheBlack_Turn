import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function ApiUsagePolicy() {
  return (

    <>

      <Header />
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          API USAGE POLICY
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p className="">
            <span className='text-gray-900'>This policy governs the use of our</span> <span className="font-semibold text-gray-900"> Collection API and Payout API.</span>
          </p>



          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              Section 1 - API Access
            </h2>
            <p className=" text-gray-700 font-semibold text-[18px]">
              To access the API, Clients must:  </p>

            <p className="text-gray-700 mt-2">
              ● 	Complete KYC
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Maintain an active account
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Use secure and authorized servers
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Hold valid API keys provided by us
            </p>






          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              Section 2 - API Security Requirements
            </h2>
            <p className=" text-gray-700 font-semibold text-[18px]">
              Clients must: </p>

            <p className="text-gray-700 mt-2">
              ● 	Keep API keys confidential
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Implement IP whitelisting and server-level security
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Use HTTPS only
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Not share credentials with third parties
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Report unauthorized access immediately
            </p>
            <p className="text-gray-800 mt-4 text-[18px] font-semibold">

              We may revoke access if security is compromised.
            </p>

          </div>



          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              Section 3 - Allowed Use Cases

            </h2>
            <p className=" text-gray-700 font-semibold text-[18px]">
              API may be used for:</p>

            <p className="text-gray-700 mt-2">
              ● 	Automating royalty collection

            </p>
            <p className="text-gray-700 mt-2">
              ● 	Triggering payouts for artists

            </p>
            <p className="text-gray-700 mt-2">
              ● 	Checking transactions, statements, balances

            </p>
            <p className="text-gray-700 mt-2">
              ● 	Integrating financial workflows
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              Section 4 - Prohibited Use Cases

            </h2>
            <p className=" text-gray-700 font-semibold text-[18px]">
              Clients may not:
            </p>

            <p className="text-gray-700 mt-2">
              ● 	Use API for illegal or unverified transactions
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Attempt to manipulate streaming or royalty data </p>
            <p className="text-gray-700 mt-2">
              ● 	Overload the API with excessive hits
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Reverse-engineer the system
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Bypass rate limits or authentication
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              Section 5 -API Limits & Monitoring

            </h2>
            <p className=" text-gray-700 font-semibold text-[18px]">
              We may implement:
            </p>

            <p className="text-gray-700 mt-2">
              ● 	Rate limits
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Access throttling
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Automated monitoring for fraud
            </p>
            <p className="text-gray-700 mt-2">
              ● 	Temporary suspension for misuse
            </p>

          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              Section 6 - API Terms of Liability

            </h2>
            <p className=" text-gray-700 font-semibold text-[18px]">
              We are not liable for:
            </p>

            <p className="text-gray-700 mt-2">
              ● 	Loss due to incorrect API implementation

            </p>
            <p className="text-gray-700 mt-2">
              ● 	Delays caused by banks or payment gateways

            </p>
            <p className="text-gray-700 mt-2">
              ● 	Downtime caused by maintenance
            </p>
            <p className="text-gray-800 mt-4 text-[18px] font-semibold">

              Clients must test API in sandbox before production use.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ApiUsagePolicy