import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/index';
import './app/style/global.scss'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@material-tailwind/react";
import { SpeedInsights} from '@vercel/speed-insights/next';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SpeedInsights/>
          <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);


