import Image from "next/image";

import { i18nCurrencyFormat } from "../helpers/format-curency";
import useCart from "../custom-hooks/use-cart";

const CartSection = ({
  cartOpen,
  setCartOpen,
}: {
  cartOpen: boolean;
  setCartOpen: any;
}) => {
  const { cart, clearCart } = useCart();

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
                  sizes="100px"
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

export default CartSection;
