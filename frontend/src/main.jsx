import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { isMobile } from 'react-device-detect';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isMobile ? (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center', 
        fontFamily: 'sans-serif' 
      }}>
        <h2>This site is not designed for mobile devices</h2>
        <p>Please open on a laptop or PC for the best experience.</p>
      </div>
    ) : (
      <App />
    )}
  </StrictMode>,
);
