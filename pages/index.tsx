import { useState, useEffect } from "react";
import Image from "next/image";

import FeatureItem from "../components/FeatureItem";
import FilterSection from "../components/FilterSection";
import SortIcon from "../assets/sort.svg";
import Filter from "../assets/filter.svg";
import VectorLeft from "../assets/vector-left.svg";
import VectorRight from "../assets/vector-right.svg";

import { i18nCurrencyFormat } from "../helpers/format-curency";
import useCart from "../custom-hooks/use-cart";
import { getProducts } from "../services/firebase";
import { useRouter } from "next/dist/client/router";

export default function Home() {
  const { push, query } = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [sortDir, setSortDir] = useState("desc");
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

  useEffect(() => {
    const returnProducts = async () => {
      const data = await getProducts(query.last, query.by, query.direction);
      setProducts(data);
    };
    returnProducts();
  }, [query.last]);

  const handleNext = () => {
    push(`/?last=${products[products.length - 1].name}`, undefined, {
      shallow: true,
    });
  };

  const handleSort = (by = "name") => {
    setSortDir((prevState) => {
      return prevState === "asc" ? "desc" : "asc";
    });
    console.log(by, "dtfghj");
    push(`/?by=${by}&direction=${sortDir}`, undefined, {
      shallow: true,
    });
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
            <SortIcon
              className="h-3 w-3 mr-2 cursor-pointer"
              onClick={() => handleSort("name")}
            />
            <span className="mr-2 text-grey-150">Sort By</span>
            <div className="flex items-center">
              <select className="mr-1 focus:outline-none font-thin">
                <option value="price">Price</option>
                <option value="a-z">A - Z</option>
              </select>
            </div>
          </div>

          <Filter className="w-6 h-6 md:hidden" />
        </div>

        <div className="flex md:justify-between">
          <FilterSection />
          <div className="w-full md:flex-75">
            <div
              className={` grid ${
                products?.length > 1 && products?.length < 3
                  ? "grid-cols-automax"
                  : "grid-cols-auto"
              }  gap-12
          `}
            >
              {products.map((item, index, array) => {
                const isLast = index === array.length - 1;

                return (
                  <div
                    key={item.docId}
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
            <div className="mt-16 mb-8">
              <ul className="flex gap-2 w-full justify-center items-center">
                <VectorLeft className="w-2.5 h-2.5 self-center" />
                <li className="cursor-pointer">1</li>
                <li className="cursor-pointer">2</li>
                <li className="cursor-pointer">3</li>
                <li className="cursor-pointer">4</li>
                <VectorRight
                  className="w-2.5 h-2.5 self-center"
                  onClick={handleNext}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
