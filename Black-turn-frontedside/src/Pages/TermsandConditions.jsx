import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function TermsandConditions() {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          TERMS & CONDITIONS FOR ARTIST, CREATOR & MEDIA COMPANY PAYOUTS
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed text-base md:text-lg">
          {/* Intro */}
          <p>
            These Terms & Conditions govern payout-related services provided by{' '}
            <span className="font-semibold text-gray-900">The Black Turn Digital Private Limited</span> to artists,
            creators, labels, and media companies. By using our payout and distribution
            services, you agree to the terms outlined below.
          </p>

          {/* 1. Eligibility for Payouts */}
          <section className="mt-4 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              1. Eligibility for Payouts
            </h2>
            <p>
              To be eligible to receive payouts, Clients must:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Complete KYC verification as required by law.</li>
              <li>Provide accurate and valid bank account details.</li>
              <li>Maintain an active and compliant account on our platform.</li>
              <li>
                Be legally entitled to receive earnings, royalties, or revenue generated
                through their content or services.
              </li>
            </ul>
          </section>

          {/* 2. Nature of Payouts */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              2. Nature of Payouts
            </h2>
            <p>
              Payouts made by us to Clients may include, but are not limited to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Service fees or platform fees payable to the Client.</li>
              <li>Royalties from digital content, media, or music streams.</li>
              <li>Engagement- or performance-based income (where applicable).</li>
              <li>Revenue share from partners, platforms, or ad networks.</li>
              <li>Any other approved earnings as per specific agreements or campaigns.</li>
            </ul>
          </section>

          {/* 3. Payout Schedule & Timelines */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              3. Payout Schedule & Timelines
            </h2>
            <p>
              Payout schedules are subject to the timelines of banks, payment gateways,
              and our partners. While we strive to process payouts promptly, the actual
              credit to the Client’s bank account may vary due to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Bank processing times and holidays.</li>
              <li>Delays from third-party partners or platforms.</li>
              <li>Compliance checks or regulatory requirements.</li>
              <li>Technical or operational issues beyond our control.</li>
            </ul>
            <p className="mt-2">
              Any such delays shall not render us liable for penalties or damages, unless
              explicitly agreed otherwise in writing.
            </p>
          </section>

          {/* 4. Fees, Deductions & Taxes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              4. Fees, Deductions & Taxes
            </h2>
            <p>
              All payouts are subject to applicable platform fees, deductions, and taxes.
              This may include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Platform fees or commission as per agreed terms.</li>
              <li>
                Statutory taxes such as TDS, GST, or any other applicable government levies.
              </li>
              <li>Bank charges, payment gateway fees, or currency conversion charges.</li>
            </ul>
            <p className="mt-2">
              Clients are responsible for providing accurate tax details (such as PAN, GSTIN,
              etc.) and for complying with their own tax obligations under applicable law.
            </p>
          </section>

          {/* 5. Client Responsibilities */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              5. Client Responsibilities
            </h2>
            <p>
              To ensure smooth payout processing, Clients agree to:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide accurate and up-to-date personal, business, and bank information.</li>
              <li>Avoid any fraudulent, illegal, or suspicious activity on the platform.</li>
              <li>Promptly update bank and contact details if they change.</li>
              <li>
                Review payout statements and report any discrepancies as soon as possible.
              </li>
            </ul>
          </section>

          {/* 6. Payment Failures & Reversals */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              6. Payment Failures & Reversals
            </h2>
            <p>
              Payouts may fail or be reversed in situations such as:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Incorrect or invalid bank account details provided by the Client.</li>
              <li>Compliance holds, sanctions, or KYC issues.</li>
              <li>Ongoing disputes, chargebacks, or reversals from partners.</li>
              <li>Legal orders or regulatory restrictions.</li>
            </ul>
            <p className="mt-2">
              In such cases, funds may be kept on hold in the Client’s wallet or returned to
              the originating source until the issue is resolved.
            </p>
          </section>

          {/* 7. Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              7. Dispute Resolution
            </h2>
            <p>
              Any dispute related to payouts, amounts, or statements must be raised within{' '}
              <span className="font-semibold">10 business days</span> from the date of the
              payout or statement. Clients must provide:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Relevant screenshots, transaction IDs, or bank references.</li>
              <li>Detailed description of the issue or discrepancy.</li>
            </ul>
            <p className="mt-2">
              We will review and respond to such disputes on a best-effort basis in accordance
              with our internal policies and partner guidelines.
            </p>
          </section>

          {/* 8. Account Holds & Suspension */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              8. Account Holds & Suspension
            </h2>
            <p>
              We reserve the right to place holds on funds or suspend payout access if:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Fraud, artificial activity, or policy violations are suspected.</li>
              <li>There is non-compliance with KYC, tax, or regulatory requirements.</li>
              <li>We receive legal, regulatory, or law-enforcement instructions.</li>
              <li>
                There are unresolved disputes, chargebacks, or claims from partners or
                platforms.
              </li>
            </ul>
            <p className="mt-2">
              Any such action will be taken at our discretion to protect the ecosystem and
              comply with applicable laws.
            </p>
          </section>

          {/* 9. Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              9. Changes to Terms
            </h2>
            <p>
              These payout Terms & Conditions may be updated or modified from time to time.
              Updated terms will be reflected on our platform or communicated through
              appropriate channels.
            </p>
            <p className="mt-2">
              Continued use of our services after such updates will be deemed as acceptance
              of the revised terms. Clients are advised to review this page periodically.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TermsandConditions
