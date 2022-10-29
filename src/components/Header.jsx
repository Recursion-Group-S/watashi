import { useAtomValue } from "jotai";
import React from "react";
import { authUserAtom } from "../atoms/authUser";

const Header = () => {
  const userAuth = useAtomValue(authUserAtom);

  return (
    <header>
      <div className="mx-auto max-w-screen-xl px-4 py-2 sm:py-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Watashi
            </h1>
          </div>
          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <a href="/gallery">Gallery</a>
            {userAuth ? (
              <img
                className="w-10 h-10 rounded-full"
                src={userAuth.photoURL}
                alt="Rounded avatar"
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
