import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../components/Home-Access/Home/Home.jsx";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return <Login onLogin={setUser} />;
  //put the above back in to handle auto render login or user home. I may need to live on home component

  return (

        <Switch>

          <Route path="/">
            <Home />
          </Route>

        </Switch>

  );
}

export default App;
