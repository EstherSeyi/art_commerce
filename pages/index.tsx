import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "react-query";
import queryString from "query-string";

import FeatureItem from "../components/FeatureItem";
import FilterSection from "../components/FilterSection";
import SortIcon from "../assets/sort.svg";
import Filter from "../assets/filter.svg";
import VectorLeft from "../assets/vector-left.svg";
import VectorRight from "../assets/vector-right.svg";

import { i18nCurrencyFormat } from "../helpers/format-curency";
import useCart from "../custom-hooks/use-cart";
import request from "../lib/request";
import { Cart } from "../types/cart";

import nocontent from "../public/nocontent.png";

const getPage = (start = 0) => {
  return start / 6;
};

export default function Home() {
  const { query, push, pathname } = useRouter();
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

  const [queryStringValue, setQueryStringValue] = useState("");

  useEffect(() => {
    query["_limit"] = query._limit ?? "6";
    query["_start"] = query._start ?? "0";
    query["_sort"] = query._sort ?? "price:ASC";
    setQueryStringValue(`${queryString.stringify(query)}`);
  }, [query._limit, query._start, query._sort]);

  const { data, isLoading } = useQuery(`products_${queryStringValue}`, () =>
    request.get(`/products?${queryStringValue}`)
  );
  const { data: count } = useQuery("product-count", () =>
    request.get(`/products/count`)
  );

  const handleNext = () => {
    if (data?.data.length >= 6) {
      query["_start"] = `${Number(query._start ?? "0") + 6}`;
      push(`${pathname}?${queryString.stringify(query)}`, undefined, {
        shallow: true,
      });
    }
    return;
  };
  const handlePrev = () => {
    if (query._start !== "0") {
      query["_start"] = `${Number(query._start ?? "0") - 6}`;
      push(`${pathname}?${queryString.stringify(query)}`, undefined, {
        shallow: true,
      });
    }

    return;
  };

  const handleSortOption = ({ target }: any) => {
    const { value } = target;
    query["_sort"] = `${value}`;
    push(`${pathname}?${queryString.stringify(query)}`, undefined, {
      shallow: true,
    });
  };
  const toggleSortDirection = () => {
    const [value, direction] = query["_sort"]
      ? `${query["_sort"]}`.split(":")
      : ["price", "ASC"];

    query["_sort"] = `${value}:${direction === "ASC" ? "DESC" : "ASC"}`;

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
            <button onClick={toggleSortDirection}>
              <SortIcon className="h-3 w-3 mr-2" />
            </button>
            <span className="mr-2 text-grey-150">Sort By</span>
            <div className="flex items-center">
              <select
                className="mr-1 focus:outline-none font-thin"
                onChange={handleSortOption}
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
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[100px] md:min-h-[500px]">
                <p className="italic font-light">Loading...</p>
              </div>
            ) : data?.data?.length ? (
              <div
                className={` grid ${
                  data?.data?.length > 1 && data?.data?.length < 3
                    ? "grid-cols-automax"
                    : "grid-cols-auto"
                }  gap-12
          `}
              >
                {data?.data?.map((item: Cart, index: number, array: any) => {
                  const isLast = index === array.length - 1;

                  return (
                    <div
                      key={`${item.name}_${item.id}`}
                      className={`w-full md:max-w-[250px] ${
                        !isLast ? "md:mr-12" : ""
                      }`}
                      onMouseEnter={() => handleShowingATC(true, index)}
                      onMouseLeave={() => handleShowingATC(false, index)}
                    >
                      <div className="w-full h-[300px] relative mb-2">
                        <Image
                          src={item.image.src ?? nocontent}
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
              <div className="min-h-[100px] md:min-h-[500px] items-center justify-center">
                <p>No items left.</p>
              </div>
            )}
            <div className="mt-16 mb-8">
              <ul className="flex gap-2 w-full justify-center items-center">
                <button
                  className={`self-center  ${
                    Number(query._start) <= 0
                      ? "text-grey-200 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={handlePrev}
                >
                  <VectorLeft className="w-2.5 h-2.5" />
                </button>

                {count?.data
                  ? new Array(Math.ceil(count?.data / 6))
                      ?.fill(0, 0)
                      .map((_, index) => (
                        <li
                          className={`${
                            getPage(Number(query._start)) === index
                              ? "text-black"
                              : "text-grey-200"
                          }`}
                          key={`pag_${index + 1}`}
                        >
                          {index + 1}
                        </li>
                      ))
                  : null}
                <button
                  className={`self-center  ${
                    data?.data?.length < 6
                      ? "text-grey-200 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={handleNext}
                >
                  <VectorRight className="w-2.5 h-2.5 self-center" />
                </button>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
