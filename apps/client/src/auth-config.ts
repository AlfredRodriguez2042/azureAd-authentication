import {
  AccountInfo,
  PublicClientApplication,
  type Configuration,
  type PopupRequest,
} from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: `${import.meta.env.VITE_AZURE_CLIENT_ID}`,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_AZURE_TENANT_ID
    }`,
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    allowNativeBroker: false,
  },
};
export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};
export const msalInstance = new PublicClientApplication(msalConfig);
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
export const callMsGraph = async () => {
  const account = msalInstance.getActiveAccount();
  if (!account) {
    throw Error(
      "No active account! Verify a user has been signed in and setActiveAccount has been called."
    );
  }
  const response = await msalInstance.acquireTokenSilent({
    scopes: [`api://${import.meta.env.VITE_AZURE_CLIENT_ID}/.default`],
    account: account as AccountInfo,
  });
  const headers = new Headers();
  const bearer = `Bearer ${response.accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
