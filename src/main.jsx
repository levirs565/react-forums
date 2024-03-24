import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import '@fontsource-variable/montserrat';
import './index.css';
import store from './store';
import I8nProvider from './provider/i8n';
import ThemeProvider from './provider/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <I8nProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </I8nProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
