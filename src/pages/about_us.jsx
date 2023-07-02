//import Images from "@/web/components/AboutUSImg"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about", "common"])),
    },
  }
}

const About = () => {
  const { t } = useTranslation("about")

  return (
    <div className="w-full mx-auto">
      <h1 className="font-semibold text-2xl text-center uppercase mt-14">
        {t("title")}
      </h1>
      <div className="flex justify-center mt-10 mb-10 mx-5">
        <p>
          {t("first_paragraph")}
          <br></br>
          <div className="flex jusify-center m-24 gap-x-24">
            <div>
              <div>
                <p className="flex justify-center">{t("company_creation")}</p>
                <div className="flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-slate-500"></div>
                </div>
              </div>
            </div>
            <div className="gap-2">
              <p>{t("scottland_expansion")}</p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-500"></div>
              </div>
            </div>
            <div className="gap-2">
              <p>{t("airnes_participation")}</p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-500"></div>
              </div>
            </div>
            <div className="gap-2">
              <p>{t("digital_tranformation")}</p>
              <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-slate-500"></div>
              </div>
            </div>
          </div>
          <br></br>
          {t("second_paragraph")}
        </p>
      </div>
    </div>
  )
}

About.isPublic = true

export default About
