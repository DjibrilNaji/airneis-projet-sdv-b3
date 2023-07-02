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

function Terms() {
  const { locale } = useRouter()
  const { t } = useTranslation("termsprivacy")
  const direction = t("direction", { locale })

  return (
    <div className="p-4 sm:p-6" dir={direction}>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
        {t("GTS_and_GTU")}
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-6 mb-1 sm:mb-2">
        {t("GTS")}
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Preamble")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">{t("Preamble_Text")}</p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Object")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">{t("Object_Text")}</p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Products")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">{t("Products_Text")}</p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Price")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">{t("Price_Text")}</p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Order")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">{t("Order_Text")}</p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Payment_Terms")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("Payment_Terms_Text")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Delivery")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">{t("Delivery_Text")}</p>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-6 mb-1 sm:mb-2">
        {t("GTU")}
      </h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Acceptance_of_the_conditions")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("Acceptance_of_the_conditions_Text")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Intellectual_Property")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("Intellectual_Property_Text")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Personal_Data")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">
        {t("Personal_Data_Text")}
      </p>
      <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-1 sm:mb-2">
        {t("Cookies")}
      </h3>
      <p className="text-sm sm:text-base mb-2 sm:mb-4">{t("Cookies_Text")}</p>
    </div>
  )
}

export default Terms

Terms.isPublic = true
