import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource-variable/montserrat";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { I8nProvider } from "./provider/i8n.jsx";
import { ThemeProvider } from "./provider/theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <I8nProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </I8nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
