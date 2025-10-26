import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient(); 
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
       <Toaster />
    <QueryClientProvider client={queryClient}>
    <App />
    
    </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
)
