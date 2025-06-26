import React from 'react'
import Header from '../Header_Footer/Header'
import Footer from '../Header_Footer/Footer'

function Refunds() {
  return (

    <>
    <Header/>
   <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Refund Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <h2 className='font-medium text-lg'>Returns & Refund</h2>

        <p>There are no returns and refunds on the services offered by us</p>
        <p>Refunds (if applicable)</p>
        <p>A refund will happen in case of your uploaded song does not pass our Quality Check test. In this case, you will be notified about the uploaded content failing our Quality Check and the amount will be refunded to you within 7-8 days</p>
        <p>A refund can be asked via mail till your song status is processing, QC Pending, QC Approved. Once your song status changes to Completed we won’t be able to offer a refund.</p>
        <p>We will refund the full amount in case your song is not LIVE on any platform within 15 days of upload.</p>
        <p>We will refund your song if we will takedown your song from our end
Refunds are also offered if there are defects but there are no refunds on subscriptions that have concluded.</p>

            <h2 className='font-bold'>We will not refund the song in case of</h2>

            <ul className='list-disc ms-7'>
                <li>Forced takedown by uploader</li>
                <li>Takedown by the third party in case of infringement of rights</li>
                <li>Misbehaviour or use of inappropriate words.</li>
                <li>After 1 month of All subscriptions</li>
                <li>if this is a cover song then cancel this order with no refund</li>
                <li>Takedown in case of unauthorized upload or upload of the cover song without having appropriate rights</li>
                <li>As per the content guidelines from Atlantis CRBT any content which has the brand name, prank, political, advertisement, corporate song/tone, National Anthem, Current Affairs, Delhi Farmers Protest, Objectionable Word or IVRS won’t go live, as these are considered as non-compliance on Atlantis CRBT</li>
            </ul>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Refunds