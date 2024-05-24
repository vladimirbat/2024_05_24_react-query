import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css';
import './reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start();
}

const queryClient = new QueryClient()
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode> // Eliminado para evitar doble montado del componente en desarrollo para explicar mejor las peticiones antes de react query.
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    // </React.StrictMode>,
  );
});
