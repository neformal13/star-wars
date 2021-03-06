import React, {createContext} from "react";
import {useAsync} from "react-use";
import "./App.css";
import BEM from "../../utils/BEM.js";
import People from "../People/People.js";
import {starWarsAPI} from "../../services/starWars.js";
import ResourceResolver from "../ResourceResolver/ResourceResolver.js";

const b = BEM("App");

export const ApiContext = createContext(null);

const App = () => {
  const {loading, error, value: api} = useAsync(() => starWarsAPI(), []);

  return (<>
    <main className={b()}>

      <section className={b("section")}>
        <h1>A long time ago in a galaxy far, far away....</h1>
        {loading && "Loading"}
        {!loading && error && <div>Error: {error.message}</div>}
        {!loading && api && (
          <ApiContext.Provider value={api}>
            <People/>
          </ApiContext.Provider>
        )}
      </section>

      <section className={b("section")}>
        <h1>Resource resolver.<br/> Click on "load data" button, to see magic....</h1>
        <ResourceResolver/>
      </section>

    </main>
  </>);
};

export default App;
