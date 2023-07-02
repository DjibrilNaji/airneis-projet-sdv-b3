import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

const SwitchLanguage = () => {
  const router = useRouter()
  const { i18n } = useTranslation()

  const handleChangeLanguage = (event) => {
    const newLocale = event.target.value
    i18n.changeLanguage(newLocale).then(() => {
      router.push(router.asPath, `${router.asPath}`, { locale: newLocale })
    })
  }

  return (
    <div>
      <select value={router.locale} onChange={handleChangeLanguage}>
        {i18n.options?.locales &&
          i18n.options.locales.map((lng) => (
            <option key={lng} value={lng}>
              {lng.toUpperCase()}
            </option>
          ))}
      </select>
    </div>
  )
}

export default SwitchLanguage
