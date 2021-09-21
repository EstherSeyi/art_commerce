import Image from "next/image";

import FeatureItem from "../components/FeatureItem";
import FilterSection from "../components/FilterSection";
import SortIcon from "../assets/sort.svg";
import CaretDown from "../assets/caret-down.svg";
import Filter from "../assets/filter.svg";

import { i18nCurrencyFormat } from "../helpers/format-curency";

export default function Home() {
  return (
    <section className="text-xs sm:text-sm md:text-base">
      <FeatureItem />
      <section className="border-t border-grey-50 mt-10">
        <div className="flex justify-between my-10">
          <nav className="flex">
            <span className="font-bold">Photography</span>
            <span className="mx-1">/</span>
            <span className="text-grey-150">Premium Photos</span>
          </nav>
          <div className="hidden md:flex items-center font-light">
            <SortIcon className="h-3 w-3 mr-2" />
            <span className="mr-2 text-grey-150">Sort By</span>
            <div className="flex items-center">
              <span className="mr-1">Price</span>
              <CaretDown className="h-3 w-3" />
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
                      className="absolute bg-black text-white left-0 right-0 text-center uppercase font-thin bottom-0 py-1 cursor-pointer"
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
  // {
  //   name: "Man",
  //   category: "people",
  //   price: 100,
  //   currency: "USD",
  //   image: {
  //     src: "https://res.cloudinary.com/estherseyi/image/upload/v1632166074/bejamas_assessment/iscktycv8ohw6u1ht4x1.jpg",
  //     alt: "man",
  //   },
  //   bestseller: false,
  //   featured: false,
  //   details: null,
  // },
];
