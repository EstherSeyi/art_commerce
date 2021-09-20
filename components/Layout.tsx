import React from "react";
import Head from "next/head";

import Logo from "../assets/logo.svg";
import Cart from "../assets/cart.svg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="pt-4">
        <div className="flex justify-between w-11/12 lg:w-[98%] mx-auto border-b-2 border-grey-50 pb-3">
          <Logo className="w-20" />
          <div className="relative">
            <Cart className="w-6 sm:w-8" />

            <span className="text-white bg-black text-center absolute py-0.5 px-1 -right-1 -bottom-3 text-[7px] sm:text-[9px]">
              1
            </span>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        {children}
      </main>
    </>
  );
};

export default Layout;
