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
        <div className="flex justify-between w-11/12 mx-auto border-b border-grey-50 pb-3">
          <Logo className="w-20" />
          <div className="relative">
            <Cart className="w-4 sm:w-6" />

            <span className="text-white bg-black text-center absolute px-1 -right-1 -bottom-2 text-[7px] sm:text-[9px]">
              1
            </span>
          </div>
        </div>
      </header>
      <main className="w-11/12 mx-auto pt-5">{children}</main>
    </>
  );
};

export default Layout;
