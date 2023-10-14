import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { msalInstance } from "./auth-config.ts";
import "./index.css";
msalInstance.initialize().then(() => {
  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      msalInstance.setActiveAccount(payload.account);
    }
  });
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </React.StrictMode>
  );
});
