import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Importar traduções
import en from '../locales/en.json'
import pt from '../locales/pt.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'
import de from '../locales/de.json'
import zh from '../locales/zh.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
    fr: { translation: fr },
    de: { translation: de },
    zh: { translation: zh }
  },
  lng: navigator.language || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n