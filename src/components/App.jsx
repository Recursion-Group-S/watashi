import { Provider } from "jotai";
import React from "react";
import { authUserAtom } from "../atoms/authUser";
import "../index.css";

import { RouterConfig } from "./RouterConfig";

const App = () => {
  return (
    <Provider scope={Symbol()} initialValues={[[authUserAtom, null]]}>
      <RouterConfig />
    </Provider>
  );
};

export default App;
