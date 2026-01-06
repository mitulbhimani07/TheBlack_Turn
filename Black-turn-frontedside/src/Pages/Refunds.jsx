import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function Refunds() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          REFUND & CANCELLATION / SETTLEMENT POLICY
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed text-lg">

          {/* Section 1 */}
          <section className="mt-6">
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 1 – No Refund on Successful Payouts
            </h2>
            <p>
              All successful payout transactions are final and non-refundable. Once funds are
              credited to the Client’s registered bank account or UPI, the transaction cannot be
              reversed.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 2 – Refunds for Failed Transactions
            </h2>
            <p>
              Refunds or reversals may be initiated only under the following conditions:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>If the payout fails at the bank or payment gateway level</li>
              <li>If compliance or regulatory reversals occur</li>
              <li>If funds bounce back due to invalid or closed bank accounts</li>
            </ul>
            <p className="mt-3">
              In such cases, the amount will be automatically reprocessed or returned to the
              Client’s wallet balance.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 3 – Digital Distribution & Subscription Fees
            </h2>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Once content is delivered to partner platforms, refund is not applicable.</li>
              <li>Platform subscription fees, dashboard usage, or distribution packages are
                non-refundable.</li>
              <li>Promotional or discounted plans are not eligible for refunds.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 4 – Settlement Adjustments
            </h2>
            <p>Adjustments may occur under the following conditions:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Dispute resolutions or claim settlements</li>
              <li>Chargebacks or partner dispute reports</li>
              <li>Fraud detection or artificial earnings manipulation</li>
              <li>Corrected earnings data from distribution or streaming platforms</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 5 – Settlement Cycles
            </h2>
            <p>
              Settlement timelines depend on streaming partners, distribution platforms, banking
              cycles, and internal processing schedules. Delays may occur due to external
              factors or regulatory requirements.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 6 – Cancellation of Earnings
            </h2>
            <p>
              Earnings may be cancelled or withheld if:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Fraudulent or artificial activity is detected (e.g., bot streams)</li>
              <li>Ownership or copyright disputes arise</li>
              <li>Platform or legal authorities request restriction</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
              SECTION 7 – Support & Dispute Window
            </h2>
            <p>
              All refund or settlement-related issues must be raised within
              <span className="font-semibold"> 7–10 business days </span> from the date of transaction.
            </p>
            <p className="mt-2">
              Cases submitted after this period may not be eligible for review.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Refunds
