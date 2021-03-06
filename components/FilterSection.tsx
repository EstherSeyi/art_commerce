import { useRouter } from "next/router";
import queryString from "query-string";
import { useState } from "react";

const computeFilter = (
  filterValue: string,
  field: string,
  query: any,
  checkedFilters: any
) => {
  const newValue = filterValue.toLowerCase();

  if (field === "price") {
    return queryString.stringify({
      ...query,
      _start: 0,
      price_gte: 20,
      price_lte: 100,
    });
  } else {
    return queryString.stringify({
      ...query,
      _start: 0,
      category_in: checkedFilters.category.map((item: any) => {
        return item;
      }),
    });
  }
};

const FilterSection = () => {
  return (
    <div className="hidden md:block md:flex-20">
      <FilterInner />
    </div>
  );
};

export const FilterInner = () => {
  const [checkedFilters, setCheckedFilters] = useState<{
    [category: string]: string[];
    price: string[];
  }>({
    category: [],
    price: [],
  });

  const { query, push, pathname } = useRouter();
  const handleCheckbox = (
    { target }: any,
    range: string,
    id: string,
    field: string
  ) => {
    let qs = "";
    if (target.checked) {
      field === "category"
        ? setCheckedFilters((prevState) => ({
            ...prevState,
            category: [...checkedFilters.category, range],
          }))
        : setCheckedFilters((prevState) => ({
            ...prevState,
            price: [...checkedFilters.price, range],
          }));
      qs = computeFilter(range, field, query, checkedFilters);
    } else {
      setCheckedFilters((prevState) => ({
        ...prevState,
        [field]: prevState[`${field}`].filter((item: string) => item !== range),
      }));
    }

    push(`${pathname}?${qs}`, undefined, {
      shallow: true,
    });
  };
  return (
    <>
      <div className="mb-6">
        <p className="mb-4">Category</p>
        {categoryFilter.map((category, index) => (
          <label
            className="flex items-center mb-3"
            htmlFor={category}
            key={category}
          >
            <input
              id={category}
              type="checkbox"
              className="mr-2"
              onChange={(e) =>
                handleCheckbox(e, category, `category-${index}`, "category")
              }
              checked={checkedFilters.category.some(
                (id: string) => id === category
              )}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 border-t border-grey-50 pt-6">
        <p className="mb-4">Price Rage</p>
        {priceRangeFilter.map((range, index) => (
          <label htmlFor={range} className="flex items-center mb-3" key={range}>
            <input
              id={range}
              type="checkbox"
              className="mr-2"
              onChange={(e) =>
                handleCheckbox(e, range, `range-${index}`, "price")
              }
              checked={checkedFilters.price.some((id: string) => id === range)}
            />
            <span>{range}</span>
          </label>
        ))}
      </div>
    </>
  );
};

const categoryFilter = [
  "people",
  "premium",
  "pets",
  "food",
  "landmarks",
  "cities",
  "nature",
];

const priceRangeFilter = ["$20 - $100"];

export default FilterSection;
