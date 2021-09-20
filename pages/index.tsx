import Image from "next/image";

import FeatureItem from "../components/FeatureItem";
import SortIcon from "../assets/sort.svg";
import CaretDown from "../assets/caret-down.svg";
import Filter from "../assets/filter.svg";

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
          <div className="hidden md:block md:flex-20">
            <div className="mb-6">
              <p className="mb-4">Category</p>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
            </div>
            <div className="mt-4 border-t border-grey-50 pt-6">
              <p className="mb-4">Price Rage</p>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
              <label className="flex items-center mb-3">
                <input type="checkbox" className="mr-2" />
                <span>People</span>
              </label>
            </div>
          </div>
          <div className="w-full md:flex-75 grid grid-cols-automax gap-2.5">
            <div>
              <div className="w-full h-[300px] relative mb-2">
                <Image
                  src="https://res.cloudinary.com/estherseyi/image/upload/v1632166074/bejamas_assessment/iscktycv8ohw6u1ht4x1.jpg"
                  layout="fill"
                  objectFit="cover"
                  alt="dog sitting"
                  // unoptimized
                />
                <p
                  aria-roledescription="button"
                  className="absolute bg-black text-white left-0 right-0 text-center uppercase font-thin bottom-0 py-1 cursor-pointer"
                >
                  Add to card
                </p>
              </div>
              <p className="text-sm text-grey-100">People</p>
              <p className="text-lg">Red Bench</p>
              <p className="text-base text-grey-100 font-thin">$3.89</p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
