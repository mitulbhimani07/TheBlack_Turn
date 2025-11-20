import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function Refunds() {
  return (

    <>
    <Header/>
   <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
        REFUND & CANCELLATION POLICY
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
           SECTION 1 – Digital Distribution Services
          </h2>
          <p className=" text-gray-700">
          Once content is delivered to partner platforms, no refund is applicable.
          </p>
         

        </div>

        <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
           SECTION 2 – Subscription or Platform Fees
          </h2>
          <p className=" text-gray-700">
          • Fees paid for subscriptions, dashboard access, or distribution packages are non-refundable.
          </p>
           <p className=" text-gray-700">
          • Any promotional or discounted plan is not eligible for refunds.
          </p>

        </div>


        <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
           SECTION 3 – Payout Transactions
          </h2>
        
           <p className=" text-gray-700">
          • Payments already processed via bank, UPI, or API cannot be reversed.
          </p>
           <p className=" text-gray-700">
           • Incorrect beneficiary information submitted by the Client is not refundable.
          </p>
          

        </div>

      <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
           SECTION 4 – Error-Based Reversals
          </h2>
          <p className=" text-gray-700">
           We may reverse or adjust funds only if:
          </p>
           <p className=" text-gray-700">
          • Duplicate payout was made
          </p>
           <p className=" text-gray-700">
           • Internal processing errors occurred
          </p>
           <p className=" text-gray-700">
          • Partner platform refunds incorrect settlement
          </p>
           <p className=" text-gray-700">
          Requests must be made within 7 days of noticing the issue.
          </p>

        </div>

      
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Refunds