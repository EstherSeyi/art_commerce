import React from "react";
import Head from "next/head";
import Image from "next/image";
// import useClickOutside from "use-click-outside";

import Logo from "../assets/logo.svg";
import Cart from "../assets/cart.svg";

import { i18nCurrencyFormat } from "../helpers/format-curency";
import useCart from "../custom-hooks/use-cart";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { cart, cartIsOpen, setCartOpen } = useCart();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

const CartSection = ({
  cartOpen,
  setCartOpen,
}: {
  cartOpen: boolean;
  setCartOpen: any;
}) => {
  const { cart, clearCart } = useCart();
  // const cartRef = useRef<HTMLDivElement>(null);
  // useClickOutside(cartRef, () => cartOpen && setCartOpen(false));
  return (
    <div
      data-test-id="cart-section"
      className={`${
        !cartOpen ? "hidden" : "block"
      } absolute bg-white p-6 border border-grey-50 z-[2] right-0 top-7 sm:top-[37px]`}
      // ref={cartRef}
    >
      {cart?.items?.length ? (
        <ul className="mb-4 overflow-y-scroll max-h-[80px]">
          {cart?.items?.map((item, index) => (
            <li
              className="flex pb-2 mb-2 border-b border-grey-50 justify-between"
              key={`${item?.name}_${index}`}
            >
              <div className="mr-4">
                <p>{item.name}</p>
                <p className="font-light text-grey-100">
                  {i18nCurrencyFormat(item?.price)}
                </p>
              </div>
              <div className="w-[50px] h-[50px]  relative">
                <Image
                  className="absolute"
                  layout="fill"
                  objectFit="cover"
                  alt={item?.image?.alt}
                  src={item?.image?.src}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-grey-50 text-center py-2">No items yet</p>
      )}
      <button
        data-test-id="clear-cart-button"
        className="w-full border-2 border-black py-2"
        type="button"
        onClick={() => {
          clearCart();
          setCartOpen(false);
        }}
      >
        CLEAR
      </button>
    </div>
  );
};

export default Layout;
