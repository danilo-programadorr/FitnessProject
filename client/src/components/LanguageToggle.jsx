import { useTranslation } from 'react-i18next'

export const LanguageToggle = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex space-x-2">
      {['en', 'pt', 'es', 'fr', 'de', 'zh'].map((lng) => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={`px-2 py-1 text-sm rounded ${i18n.language === lng ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}