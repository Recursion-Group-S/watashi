import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import React from "react";
import "../index.css";

import { RouterConfig } from "./RouterConfig";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Provider scope={Symbol()} >
      <RouterConfig />
    </Provider>
    </QueryClientProvider>
  );
};

export default App;
