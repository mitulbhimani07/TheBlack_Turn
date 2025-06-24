import React from 'react'

function Privacy() {
  return (
     <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg mt-8 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Privacy Policy
      </h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
            SECTION 1 – WHAT DO WE DO WITH YOUR INFORMATION?
          </h2>
          <p className=" text-gray-700">
            When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address, and email address.
          </p>

           <p className=" text-gray-700 mt-4">
            When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
          </p>

          <p className=" text-gray-700 mt-4">
            Email marketing (if applicable): With your permission, we may send you emails about our store, new products, and other updates.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl uppercase font-medium text-gray-800 mb-4">
            Section 2 - General Conditions
          </h2>
          <p className=" text-gray-700">
            <p className=" text-gray-700">
            We reserve the right to refuse service to anyone for any reason at any time.
          </p>
          </p>
          <p className="mt-4 text-gray-700">
            You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to the technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
          </p>
          <p className="mt-4 text-gray-700">
            You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
          </p>
          <p className="mt-4 text-gray-700">
            The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
          </p>
        </div>
      </div>


    </div>
  )
}

export default Privacy
