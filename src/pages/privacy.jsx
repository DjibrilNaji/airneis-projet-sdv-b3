import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React from "react"

export async function getServerSideProps(context) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "navigation",
        "termsprivacy",
      ])),
    },
  }
}

const PrivacyPolicy = () => {
  const { locale } = useRouter()
  const { t } = useTranslation("termsprivacy")
  const direction = t("direction", { locale })

  return (
    <div className="p-4 sm:p-6" dir={direction}>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
        {t("Detailed_privacy_policy")}
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-6 mb-1 sm:mb-2">
        {t("Privacy_policy")}
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("User_data")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("User_data_paragraph")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("CookiesPrivacy")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("Cookies_paragraph")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Third_party_services")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("Third_party_services_paragraph")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Security_measures")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("Security_measures_paragraph")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("User_rights")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("User_rights_paragraph")}
      </p>
    </div>
  )
}

export default PrivacyPolicy

PrivacyPolicy.isPublic = true
