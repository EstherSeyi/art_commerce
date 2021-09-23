import Image from "next/image";
import { useQuery } from "react-query";

import useCart from "../custom-hooks/use-cart";
import request from "../lib/request";
import { Cart } from "../types/cart";

import nocontent from "../public/nocontent.png";

const FeatureItem = () => {
  const { addToCart } = useCart();

  const { data } = useQuery("featured-product", () =>
    request.get(`/products?featured=${true}`)
  );

  return (
    <section data-test-id="feature-section">
      <div className="flex justify-between mb-8">
        <h2 className="font-semibold text-3xl">{data?.data?.[0].name}</h2>
        <button
          data-test-id="add-to-cart"
          className="bg-black py-1 px-4 font-medium hidden md:block disabled:cursor-not-allowed"
          onClick={() => addToCart(data?.data?.[0])}
          disabled={!data?.data?.length}
        >
          <span className="text-xl text-white">ADD TO CART</span>
        </button>
      </div>
      <div>
        <div className="w-full h-[200px] md:h-[400px] relative">
          <Image
            src={data?.data[0].image.src ?? nocontent}
            layout="fill"
            objectFit="cover"
            alt={data?.data?.[0].image.alt}
          />
          <p className="bg-white text-black px-4 py-2 md:px-6 md:py-3 absolute bottom-0 left-0 text-sm">
            Photo of the day
          </p>
        </div>
      </div>
      <div className="flex md:justify-between flex-col md:flex-row mt-8">
        <div className="md:flex-45">
          <h3 className="mb-2 text-xl font-bold">
            About the {data?.data?.[0].name}
          </h3>
          <p className="mb-2 text-grey-100 text-xl capitalize">
            {data?.data?.[0].category}
          </p>
          <p className="font-thin text-justify">{data?.data?.[0].details}</p>
        </div>
        <div className="md:flex-40 md:text-right mt-8 md:mt-0">
          <h3 className="text-xl font-bold mb-4">People also buy</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2.5 md:gap-2">
            {data?.data?.map((item: Cart, index: number) => {
              return index === 0 ? null : (
                <div className="w-full h-[150px] relative mr-4">
                  <Image
                    src={item.image.src ?? nocontent}
                    layout="fill"
                    objectFit="cover"
                    alt={item.image.alt}
                  />
                </div>
              );
            })}
          </div>
          <div className="font-thin mt-6 md:mt-10">
            <p className="font-bold text-xl mb-2 ">Details</p>

            <p>
              Dimension: {data?.data?.[0].dimension.height} x{" "}
              {data?.data?.[0].dimension.width}
            </p>
            <p>Size: {data?.data?.[0].size}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureItem;
