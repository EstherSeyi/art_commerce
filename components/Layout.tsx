import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Logo from "../assets/logo.svg";
import Cart from "../assets/cart.svg";

import useCart from "../custom-hooks/use-cart";

const CartSection = dynamic(() => import("../components/CartSection"));

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { cart, cartIsOpen, setCartOpen } = useCart();

  return (
    <>
      <header className="pt-4">
        <div className="flex justify-between w-11/12 sm:w-10/12 max-w-[1440px] mx-auto border-b border-grey-50 pb-3 relative">
          <Logo className="w-20" />
          <div className="relative">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              data-test-id="cart-button"
            >
              <Cart className="w-4 sm:w-6" />
            </button>

            <span
              data-test-id="total-cart-items"
              className="text-white bg-black text-center absolute px-1 -right-1 -bottom-0.5 text-[7px] sm:text-[9px]"
            >
              {cart?.total ?? 0}
            </span>
          </div>
          <CartSection setCartOpen={setCartOpen} cartOpen={cartIsOpen} />
        </div>
      </header>
      <main className="w-full h-full overflow-hidden">
        <div className="w-full box-content pr-[17px] overflow-y-scroll">
          <div className="w-11/12 sm:w-10/12 max-w-[1440px] mx-auto pt-5 min-h-main h-main">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
