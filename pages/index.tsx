import { useState } from "react";
import Image from "next/image";

import FeatureItem from "../components/FeatureItem";
import FilterSection from "../components/FilterSection";
import SortIcon from "../assets/sort.svg";
import CaretDown from "../assets/caret-down.svg";
import Filter from "../assets/filter.svg";

import { i18nCurrencyFormat } from "../helpers/format-curency";
import useCart from "../custom-hooks/use-cart";

export default function Home() {
  const { addToCart } = useCart();
  const [showATC, setShowATC] = useState<{
    action: boolean;
    index: null | number;
  }>({
    action: false,
    index: null,
  });
  const handleShowingATC = (action: boolean, index: number) => {
    setShowATC((prevState) => ({
      ...prevState,
      action,
      index,
    }));
  };

  return (
    <section>
      <FeatureItem />
      <section className="border-t border-grey-50 mt-10">
        <div className="flex justify-between my-10">
          <nav className="flex">
            <span className="font-bold">Photography</span>
            <span className="mx-1">/</span>
            <span className="text-grey-150">Premium Photos</span>
          </nav>
          <div className="hidden md:flex items-center font-light">
            <SortIcon className="h-3 w-3 mr-2 cursor-pointer" />
            <span className="mr-2 text-grey-150">Sort By</span>
            <div className="flex items-center">
              <select className="mr-1 focus:outline-none font-thin">
                <option value="price">Price</option>
                <option value="a-z">A - Z</option>
              </select>
              {/* <CaretDown className="h-3 w-3" /> */}
            </div>
          </div>

          <Filter className="w-6 h-6 md:hidden" />
        </div>

        <div className="flex md:justify-between">
          <FilterSection />

          <div
            className={`w-full md:flex-75 grid ${
              storeItems.length > 1 && storeItems.length < 3
                ? "grid-cols-automax"
                : "grid-cols-auto"
            }  gap-12
          `}
          >
            {storeItems.map((item, index, array) => {
              const isLast = index === array.length - 1;

              return (
                <div
                  key={`${item.name}_${index}`}
                  className={`w-full md:max-w-[250px] ${
                    !isLast ? "md:mr-12" : ""
                  }`}
                  onMouseEnter={() => handleShowingATC(true, index)}
                  onMouseLeave={() => handleShowingATC(false, index)}
                >
                  <div className="w-full h-[300px] relative mb-2">
                    <Image
                      src={item.image.src}
                      layout="fill"
                      objectFit="cover"
                      alt={item.image.alt}
                      // unoptimized
                    />
                    <p
                      aria-roledescription="button"
                      className={`${
                        showATC.action && showATC.index === index
                          ? "block"
                          : "hidden"
                      } absolute bg-black text-white left-0 right-0 text-center uppercase font-thin bottom-0 py-1 cursor-pointer`}
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      Add to cart
                    </p>
                    {item.bestseller ? (
                      <p className="bg-white text-black absolute top-0 left-0 text-xs px-3 py-1.5">
                        Best Seller
                      </p>
                    ) : null}
                  </div>
                  <p className="text-sm text-grey-100 capitalize">
                    {item.category}
                  </p>
                  <p className="text-lg capitalize">{item.name}</p>
                  <p className="text-base text-grey-100 font-thin">
                    {i18nCurrencyFormat(item.price, item.currency)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}

const storeItems = [
  {
    name: "Red Bench",
    category: "people",
    price: 3.89,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632166063/bejamas_assessment/p7321vbh5vgo0tklalwh.jpg",
      alt: "red bench",
    },
    bestseller: true,
    featured: false,
    details: null,
  },
  {
    name: "Egg Balloon",
    category: "food",
    price: 93.89,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632166081/bejamas_assessment/k5gvlvv5faws0vvvosci.jpg",
      alt: "egg balloon",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    name: "Man",
    category: "people",
    price: 100,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632166074/bejamas_assessment/iscktycv8ohw6u1ht4x1.jpg",
      alt: "man",
    },
    bestseller: false,
    featured: false,
    details: null,
  },

  {
    name: "Fly",
    category: "premium",
    price: 100,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632228230/bejamas_assessment/xxqzbyw3z0pyjqbulnsl.jpg",
      alt: "fly",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    name: "Hands",
    category: "people",
    price: 85,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632228219/bejamas_assessment/bcthiuxljj0v9rq7zi0p.jpg",
      alt: "hands",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
  {
    name: "Happy Eggs",
    category: "food",
    price: 76,
    currency: "USD",
    image: {
      src: "https://res.cloudinary.com/estherseyi/image/upload/v1632228196/bejamas_assessment/oy6p729syptnj1ki33ca.jpg",
      alt: "happy eggs",
    },
    bestseller: false,
    featured: false,
    details: null,
  },
];
