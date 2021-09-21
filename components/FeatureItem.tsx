import Image from "next/image";

import useCart from "../custom-hooks/use-cart";

const featureItem = {
  name: "Samurai King Resting",
  category: "Pets",
  price: 100,
  currency: "USD",
  image: {
    src: "https://res.cloudinary.com/estherseyi/image/upload/v1632157233/bejamas_assessment/jzy9b3gfumz0caurfoyo.jpg",
    alt: "dog sitting",
  },
  bestseller: false,
  featured: true,
  dimension: {
    width: 1020,
    height: 1020,
  },
  size: "15 mb",
  details:
    "So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book. So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.So how did the classical Latin become so incoherent? According to McClintock.",
};

const FeatureItem = () => {
  const { addToCart } = useCart();
  return (
    <section>
      <div className="flex justify-between mb-8">
        <h2 className="font-semibold text-3xl">{featureItem.name}</h2>
        <button
          className="bg-black py-1 px-4 font-medium hidden md:block"
          onClick={() => addToCart(featureItem)}
        >
          <span className="text-xl text-white">ADD TO CART</span>
        </button>
      </div>
      <div>
        <div className="w-full h-[200px] md:h-[400px] relative">
          <Image
            src={featureItem.image.src}
            layout="fill"
            objectFit="cover"
            alt={featureItem.image.alt}
            // unoptimized
          />
          <p className="bg-white text-black px-4 py-2 md:px-6 md:py-3 absolute bottom-0 left-0 text-sm">
            Photo of the day
          </p>
        </div>
      </div>
      <div className="flex md:justify-between flex-col md:flex-row mt-8">
        <div className="md:flex-45">
          <h3 className="mb-2 text-xl font-bold">
            About the {featureItem.name}
          </h3>
          <p className="mb-2 text-grey-100 text-xl capitalize">
            {featureItem.category}
          </p>
          <p className="font-thin text-justify">{featureItem.details}</p>
        </div>
        <div className="md:flex-40 md:text-right mt-8 md:mt-0">
          <h3 className="text-xl font-bold mb-4">People also buy</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2.5 md:gap-2">
            <div className="w-full h-[150px] relative mr-4">
              <Image
                src="https://res.cloudinary.com/estherseyi/image/upload/v1632166063/bejamas_assessment/p7321vbh5vgo0tklalwh.jpg"
                layout="fill"
                objectFit="cover"
                alt="dog sitting"
                // unoptimized
              />
            </div>
            <div className="w-full h-[150px] relative mr-4">
              <Image
                src="https://res.cloudinary.com/estherseyi/image/upload/v1632166081/bejamas_assessment/k5gvlvv5faws0vvvosci.jpg"
                layout="fill"
                objectFit="cover"
                alt="dog sitting"
                // unoptimized
              />
            </div>
            <div className="w-full h-[150px] relative">
              <Image
                src="https://res.cloudinary.com/estherseyi/image/upload/v1632166074/bejamas_assessment/iscktycv8ohw6u1ht4x1.jpg"
                layout="fill"
                objectFit="cover"
                alt="dog sitting"
                // unoptimized
              />
            </div>
          </div>
          <div className="font-thin mt-6 md:mt-10">
            <p className="font-bold text-xl mb-2 ">Details</p>

            <p>
              Dimension: {featureItem.dimension.height} x{" "}
              {featureItem.dimension.width}
            </p>
            <p>Size: {featureItem.size}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureItem;
