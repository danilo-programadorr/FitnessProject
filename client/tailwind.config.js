/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Adicione esta linha para suporte ao tema escuro
  theme: {
    extend: {
      colors: {
        fitness: {
          primary: '#3B82F6', // Azul Tailwind
          secondary: '#10B981', // Verde Tailwind
          // Adicione cores específicas para dark mode
          dark: {
            primary: '#2563EB', // Azul mais escuro
            secondary: '#059669' // Verde mais escuro
          }
        }
      },
      // Extensões para animações de loading
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: [
    // Plugin para variants do grupo (opcional)
    function({ addVariant }) {
      addVariant('children', '& > *')
    }
  ]
}