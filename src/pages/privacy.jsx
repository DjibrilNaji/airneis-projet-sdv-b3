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

const PrivacyPolicy = () => {
  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
        Detailed Privacy Policy
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-6 mb-1 sm:mb-2">
        PRIVACY POLICY
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        1- User Data
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        We collect data provided by users for the sole purpose of improving our
        service. This data will not be shared with any third-party services
        without explicit consent. We implement stringent data protection
        measures to ensure the integrity and confidentiality of user data.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        2- Cookies
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        Our site uses cookies to improve the user experience. These do not
        contain any personal identification information, but they do track user
        interaction for analysis. Users can manage cookie preferences in their
        browser settings.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        3- Third-Party Services
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        We may incorporate third-party services for certain functionalities.
        This policy does not cover data collected by such third parties. Users
        are advised to review the privacy policies of these third-party
        services.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        4- Security Measures
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        We implement robust security measures to protect your data, including
        encryption, anonymization, and secure servers. However, no data
        transmission over the internet can be 100% secure. As such, we cannot
        guarantee the absolute security of your data.
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        5- User Rights
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        Users have certain rights regarding their personal data, such as the
        right to access, correct, or delete their personal data. Users can
        contact us to exercise these rights.
      </p>
    </div>
  )
}

export default PrivacyPolicy

PrivacyPolicy.isPublic = true
