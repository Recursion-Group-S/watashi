import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import React from "react";
import { authUserAtom } from "../atoms/authUser";
import "../index.css";

import { RouterConfig } from "./RouterConfig";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Provider scope={Symbol()} initialValues={[[authUserAtom, null]]}>
      <RouterConfig />
    </Provider>
    </QueryClientProvider>
  );
};

export default App;
