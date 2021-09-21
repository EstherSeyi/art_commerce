import React, { LegacyRef, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import useClickOutside from "use-click-outside";

import Logo from "../assets/logo.svg";
import Cart from "../assets/cart.svg";

import { i18nCurrencyFormat } from "../helpers/format-curency";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="pt-4">
        <div className="flex justify-between w-11/12 sm:w-10/12 max-w-[1440px] mx-auto border-b border-grey-50 pb-3 relative">
          <Logo className="w-20" />
          <div className="relative">
            <button type="button" onClick={() => setCartOpen(true)}>
              <Cart className="w-4 sm:w-6" />
            </button>

            <span className="text-white bg-black text-center absolute px-1 -right-1 -bottom-2 text-[7px] sm:text-[9px]">
              1
            </span>
          </div>
          <CartSection setCartOpen={setCartOpen} cartOpen={cartOpen} />
        </div>
      </header>
      <main className="w-full h-full overflow-hidden">
        <div className="w-full box-content pr-[17px] overflow-y-scroll">
          <div className="w-11/12 sm:w-10/12 max-w-[1440px] mx-auto pt-5 h-main">
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
  const cartRef = useRef<HTMLDivElement>(null);
  useClickOutside(cartRef, () => cartOpen && setCartOpen(false));
  return (
    <div
      className={`${
        !cartOpen ? "hidden" : "block"
      } absolute bg-white p-6 border border-grey-50 z-[2] right-0 top-7 sm:top-[37px]`}
      ref={cartRef}
    >
      <ul className="mb-4 overflow-y-scroll max-h-[80px]">
        {cartItems.map((item, index) => (
          <li
            className="flex pb-2 mb-2 border-b border-grey-50 justify-between"
            key={`${item.name}_${index}`}
          >
            <div className="mr-4">
              <p>{item.name}</p>
              <p className="font-light text-grey-100">
                {i18nCurrencyFormat(item.price)}
              </p>
            </div>
            <div className="w-[50px] h-[50px]  relative">
              <Image
                layout="fill"
                objectFit="cover"
                alt={item.image.alt}
                src={item.image.src}
              />
            </div>
          </li>
        ))}
      </ul>
      <button className="w-full border-2 border-black py-2">CLEAR</button>
    </div>
  );
};

const cartItems = [
  {
    name: "Samurai King Resting",
    category: "people",
    price: 100,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632157233/bejamas_assessment/jzy9b3gfumz0caurfoyo.jpg",
      alt: "dog sitting",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    name: "Samurai King Resting",
    category: "people",
    price: 100,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632157233/bejamas_assessment/jzy9b3gfumz0caurfoyo.jpg",
      alt: "dog sitting",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    name: "Samurai King Resting",
    category: "people",
    price: 100,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632157233/bejamas_assessment/jzy9b3gfumz0caurfoyo.jpg",
      alt: "dog sitting",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
];

export default Layout;
