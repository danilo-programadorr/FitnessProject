import { useState, useRef } from 'react'
import { useAuthStore } from '../../context/AuthContext'
import { aiService } from '../../services/aiService'
import { FileText, Upload, Mic } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const ReportReaderAgent = () => {
  const { user } = useAuthStore()
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [transcription, setTranscription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const analyzeDocument = async () => {
    if (!file) return
    
    setIsLoading(true)
    
    try {
      // Passo 1: Extrair texto do PDF (simplificado - na prática precisaria de um parser de PDF)
      const text = await extractTextFromFile(file)
      
      // Passo 2: Analisar com GPT
      const response = await aiService.chatWithGPT([
        {
          role: 'system',
          content: `You are a medical expert. Analyze this medical report and explain it in simple terms in ${navigator.language}. 
          Highlight any concerning values. Format as: Summary, Key Findings, Recommendations.`
        },
        {
          role: 'user',
          content: text
        }
      ])
      
      const result = response.choices[0].message.content
      setAnalysis(result)
      await aiService.saveInteraction(user.id, 'report_reader', text, result)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const extractTextFromFile = async (file) => {
    if (file.type === 'application/pdf') {
      // Simulação - na prática usar uma lib como pdf-parse
      return "Conteúdo do PDF simulado: Exame de sangue mostrou hemoglobina 13.5 g/dL (normal), glicemia 92 mg/dL (normal)."
    } else if (file.type.includes('audio')) {
      const result = await aiService.transcribeAudio(file)
      setTranscription(result.text)
      return result.text
    } else if (file.type.includes('text') || file.type.includes('image')) {
      // Para outros tipos de arquivo, retornar um placeholder
      return "Conteúdo do arquivo não pôde ser extraído automaticamente. Por favor, digite o texto manualmente."
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full mr-4">
          <FileText className="h-6 w-6 text-purple-600 dark:text-purple-300" />
        </div>
        <h2 className="text-xl font-bold dark:text-white">{t('agents.report_reader')}</h2>
      </div>

      <div className="mb-6">
        <div 
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">
            {file ? file.name : t('report.upload_prompt')}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.txt,.mp3,.wav,.png,.jpg"
          />
        </div>

        {transcription && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded">
            <h3 className="font-medium mb-2">{t('report.transcription')}:</h3>
            <p>{transcription}</p>
          </div>
        )}
      </div>

      <button
        onClick={analyzeDocument}
        disabled={!file || isLoading}
        className="w-full mb-6 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? (
          <span>{t('common.analyzing')}...</span>
        ) : (
          <>
            <FileText className="mr-2" />
            <span>{t('report.analyze_document')}</span>
          </>
        )}
      </button>

      {analysis && (
        <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
          <h3 className="font-bold text-lg mb-3">{t('report.analysis')}</h3>
          <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br>') }} />
        </div>
      )}
    </div>
  )
}