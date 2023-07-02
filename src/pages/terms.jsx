import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import React from "react"

export async function getServerSideProps(context) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "navigation"])),
    },
  }
}

function Terms() {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
        General Terms of Sale (GTS) and General Terms of Use (GTU)
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-6 mb-1 sm:mb-2">
        GENERAL TERMS OF SALE (GTS)
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        1- Preamble
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        These conditions are concluded between, on the one hand, the company
        AIRNEIS, and on the other hand, people wishing to make a purchase via
        the AIRNEIS Internet site, hereinafter referred to as "the user".
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        2- Object
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        These conditions aim to define the terms of remote sales between AIRNEIS
        and the user, from the order to the services, through payment and
        delivery.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        3- Products
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        The products offered for sale are those listed on the AIRNEIS site on
        the day of the site's consultation by the user, subject to availability.
        In case of product unavailability, AIRNEIS undertakes to inform the
        user.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        4- Price
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        Prices are indicated in euros and are only valid at the date of the
        order dispatch by the user. They do not include delivery costs, charged
        in addition.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        5- Order
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        The buyer wishing to buy a product must: fill out the identification
        form, fill out the online order form, validate his order after having
        checked it, make the payment under the conditions provided and confirm
        his order and its payment.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        6- Payment Terms
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        The price is due at the time of order. Payments will be made by credit
        card or by any other means available on the site.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        7- Delivery
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        Delivery is made to the delivery address indicated by the buyer when
        placing his order. In case of delay, an email will be sent to the buyer
        to inform him of a possible consequence on the delivery time that was
        indicated to him.
      </p>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-6 mb-1 sm:mb-2">
        General Terms of Use (GTU)
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        1- Acceptance of the conditions
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        The user acknowledges having read, while browsing the site, the terms of
        use and undertakes to respect them.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        2- Intellectual Property
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        All elements of the AIRNEIS site, including texts, graphics, logos,
        images, are the exclusive property of AIRNEIS.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        3- Personal Data
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        The information collected by AIRNEIS during any order from the user is
        necessary for the management of his order by AIRNEIS. In accordance with
        the Data Protection Act, the user has a right of access, modification
        and deletion of data concerning him.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        4- Cookies
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        The AIRNEIS site may use "cookies". These "cookies" do not allow the
        identification of the user but are used to record information relating
        to the user's navigation on the Internet site.
      </p>
    </div>
  )
}

export default Terms

Terms.isPublic = true
