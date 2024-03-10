import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './context/AppContext.tsx'
import { ThemeContextProvider } from './context/ThemeContext.tsx'
import { StockContextProvider } from './context/StockContext.tsx'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:0,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ThemeContextProvider>
          <StockContextProvider>
            <App />
          </StockContextProvider>
        </ThemeContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
