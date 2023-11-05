import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Question from "./pages/question.js";
import Master from "./pages/master.js";
import Leaderboard from "./pages/leaderboard.js";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/Loading";

import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

export default function App() {
  console.log('starting')
    const { isLoading, error } = useAuth0();

    if (error) {
      console.log('error', error)
      return <div>Oops... {error.message}</div>;
    }

    if (isLoading) {
      return <Loading />;
    }

  return (
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="/master">
            <Route index element={<Master />} />
            <Route path="master" element={<Master />} />
          </Route>
          <Route path="/leaderboard">
            <Route index element={<Leaderboard />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Auth0Provider
  {...providerConfig}
>
  <App />
</Auth0Provider>,);