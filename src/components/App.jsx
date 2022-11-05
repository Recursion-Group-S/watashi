import { Provider } from "jotai";
import React from "react";
import "../index.css";

import { RouterConfig } from "./RouterConfig";

const App = () => {
  return (
    <Provider>
      <RouterConfig />
    </Provider>
  );
};

export default App;
