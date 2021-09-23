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
    if (newValue === "lower than $20") {
      return queryString.stringify({
        ...query,
        price_lt: 20,
      });
    } else if (newValue === "$20 - $100") {
      return queryString.stringify({
        ...query,
        price_gte: 20,
        price_lte: 100,
      });
    } else if (newValue === "$100 - $200") {
      return queryString.stringify({
        ...query,
        price_gte: 100,
        price_lte: 200,
      });
    } else {
      return queryString.stringify({
        ...query,
        price_gte: 200,
      });
    }
  } else {
    return queryString.stringify({
      ...query,
      category_in: checkedFilters.category.map((item: any) => {
        return item;
      }),
    });
  }
};

const FilterSection = () => {
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
    <div className="hidden md:block md:flex-20">
      <div className="mb-6">
        <p className="mb-4">Category</p>
        {categoryFilter.map((category, index) => (
          <label className="flex items-center mb-3" key={category}>
            <input
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
          <label className="flex items-center mb-3" key={range}>
            <input
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
    </div>
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

const priceRangeFilter = [
  "Lower than $20",
  "$20 - $100",
  "$100 - $200",
  "More than $200",
];

export default FilterSection;
