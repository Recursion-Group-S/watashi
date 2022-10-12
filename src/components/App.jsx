import React from "react";
import '../index.css';

import Header from "./Header";
import { RouterConfig } from "./RouterConfig";

const App = () => {
    return (
        <div className="bg-slate-100 h-screen">
            <Header />
            <div className="grid p-0 place-items-center" style={{ height: 'calc(100vh - 72px)' }}>
                <div style={{ Width: 1110, Height: 696 }}>
                    <RouterConfig />
                </div>
            </div>
        </div>
    )
}

export default App;