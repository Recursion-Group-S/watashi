import React from "react";
import { useAtomValue } from 'jotai'
import { authUserAtom } from "../atoms/authUser";

const Header = () => {
    const authUser = useAtomValue(authUserAtom);

    return (
        <header>
            <div className="mx-auto max-w-screen-xl px-4 py-2 sm:py-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left">
                        <img className="w-36" src="/images/watashi_header_logo.png" alt="watashi_logo" />
                    </div>

                    {console.log(authUserAtom === null)}
                    <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center" style={{ display: authUser ? "" : "none" }}>
                        <a href="/gallery">Gallery</a>
                        <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/300" alt="Rounded avatar"></img>
                    </div>
                </div>
            </div>
        </header>

    );
}

export default Header;