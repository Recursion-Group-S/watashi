import React from "react";
import '../index.css';

import Header from "./Header";

const App = () => {
    return (
        <div className="bg-slate-100 h-screen">
            <Header />
            {/* <div className="container mx-auto">
                <div className="flex">
                    <div className="basis-2/3">
                        <WorkTable />
                    </div>
                    <div className="basis-1/3">
                        <Sidebar />
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default App;