import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import queryString from "query-string";

import FeatureItem from "../components/FeatureItem";
import FilterSection from "../components/FilterSection";
import SortIcon from "../assets/sort.svg";
import Filter from "../assets/filter.svg";
import VectorLeft from "../assets/vector-left.svg";
import VectorRight from "../assets/vector-right.svg";

import { i18nCurrencyFormat } from "../helpers/format-curency";
import useCart from "../custom-hooks/use-cart";
import { getProducts } from "../services/firebase";

export default function Home() {
  const { push, query, pathname } = useRouter();
  const [products, setProducts] = useState<any[]>([]);
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
      const data = await getProducts(
        query.last,
        query.by,
        query.direction,
        query.first,
        query.type
      );
      setProducts(data);
    };
    returnProducts();
  }, [query.last, query.by, query.direction, query.first]);

  const handleNext = () => {
    if (products?.length === 6) {
      query["last"] =
        query.by === "name"
          ? products[products.length - 1].name
          : query.by === "price"
          ? products[products.length - 1].price
          : products[products.length - 1].name;
      query["type"] = "next";
      push(`${pathname}?${queryString.stringify(query)}`, undefined, {
        shallow: true,
      });
    }
    return;
  };
  const handlePrev = () => {
    query["type"] = "prev";
    query["first"] =
      query.by === "name"
        ? products[0].name
        : query.by === "price"
        ? products[0].price
        : products[0].name;
    push(`${pathname}?${queryString.stringify(query)}`, undefined, {
      shallow: true,
    });
  };

  const handleSort = () => {
    query["direction"] = query.direction === "asc" ? "desc" : "asc";
    push(`${pathname}?${queryString.stringify(query)}`, undefined, {
      shallow: true,
    });
  };

  const handleSortByChange = (e: any) => {
    // console.log(e.target.value);
    query["by"] = e.target.value;
    query["direction"] = query.direction === "asc" ? "desc" : "asc";
    push(`${pathname}?${queryString.stringify(query)}`, undefined, {
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
              onClick={() => handleSort()}
            />
            <span className="mr-2 text-grey-150">Sort By</span>
            <div className="flex items-center">
              <select
                className="mr-1 focus:outline-none font-thin"
                onChange={handleSortByChange}
              >
                <option value="price">Price</option>
                <option value="name">A - Z</option>
              </select>
            </div>
          </div>

          <Filter className="w-6 h-6 md:hidden" />
        </div>

        <div className="flex md:justify-between">
          <FilterSection />
          <div className="w-full md:flex-75">
            {products?.length ? (
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
            ) : (
              <div className="min-h-[500px] flex items-center justify-center">
                <p className="text-center">No Products left!</p>
              </div>
            )}
            <div className="mt-16 mb-8">
              <ul className="flex gap-2 w-full justify-center items-center">
                <button className="self-center " onClick={handlePrev}>
                  <VectorLeft className="w-2.5 h-2.5" />
                </button>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <button
                  className={`self-center  ${
                    products?.length < 6
                      ? "text-grey-200 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={handleNext}
                >
                  <VectorRight
                    className="w-2.5 h-2.5 self-center"
                    onClick={handleNext}
                  />
                </button>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
