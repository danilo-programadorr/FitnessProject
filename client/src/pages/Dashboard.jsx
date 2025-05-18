import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useAuthStore } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { PersonalTrainerAgent } from '../components/Agents/PersonalTrainer';
import { NutritionistAgent } from '../components/Agents/Nutritionist';
import { ReportReaderAgent } from '../components/Agents/ReportReader'; // NOVO AGENTE
import { DeviceMobileIcon, ChevronDownIcon } from '@heroicons/react/outline'; // Ícones para mobile

export const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  // Configuração das abas (com novo agente)
  const tabs = [
    { id: 'overview', label: t('dashboard.overview'), icon: 'home' },
    { id: 'trainer', label: t('agents.personal_trainer'), icon: 'dumbbell' },
    { id: 'nutrition', label: t('agents.nutritionist'), icon: 'utensils' },
    { id: 'reports', label: 'Leitor de Laudos', icon: 'file-text' }, // NOVO AGENTE
  ];

  const AgentCard = ({ title, description, icon, onClick }) => (
    <div onClick={onClick} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition hover:scale-[1.02]">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
          <span className="text-blue-600 dark:text-blue-300">[{icon}]</span>
        </div>
        <h3 className="text-lg font-semibold dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold dark:text-white">
            {t('dashboard.welcome')}, {user?.user_metadata?.name || user?.email}
          </h1>
          
          <div className="flex gap-3 w-full md:w-auto">
            {/* Seletor Mobile (visível apenas em telas pequenas) */}
            <div className="block md:hidden relative w-full">
              <select
                onChange={(e) => setActiveTab(e.target.value)}
                value={activeTab}
                className="appearance-none w-full pl-3 pr-8 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                {tabs.map(tab => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition whitespace-nowrap"
            >
              {t('auth.logout')}
            </button>
          </div>
        </div>

        {/* Navegação por abas (visível apenas em desktop) */}
        <div className="hidden md:flex border-b border-gray-200 dark:border-gray-700 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              <span>[{tab.icon}]</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="animate-fade-in">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <AgentCard
                title={t('agents.personal_trainer')}
                description={t('agents.personal_trainer_desc')}
                icon="dumbbell"
                onClick={() => setActiveTab('trainer')}
              />
              <AgentCard
                title={t('agents.nutritionist')}
                description={t('agents.nutritionist_desc')}
                icon="utensils"
                onClick={() => setActiveTab('nutrition')}
              />
              {/* Card para o novo agente */}
              <AgentCard
                title="Leitor de Laudos"
                description="Analise seus exames médicos"
                icon="file-text"
                onClick={() => setActiveTab('reports')}
              />
            </div>
          )}

          {activeTab === 'trainer' && <PersonalTrainerAgent />}
          {activeTab === 'nutrition' && <NutritionistAgent />}
          {activeTab === 'reports' && <ReportReaderAgent />} {/* NOVO AGENTE */}
        </div>
      </div>
    </div>
  );
};