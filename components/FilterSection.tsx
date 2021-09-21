const FilterSection = () => {
  return (
    <div className="hidden md:block md:flex-20">
      <div className="mb-6">
        <p className="mb-4">Category</p>
        {categoryFilter.map((category) => (
          <label className="flex items-center mb-3" key={category}>
            <input type="checkbox" className="mr-2" />
            <span>{category}</span>
          </label>
        ))}
      </div>
      <div className="mt-4 border-t border-grey-50 pt-6">
        <p className="mb-4">Price Rage</p>
        {priceRangeFilter.map((range) => (
          <label className="flex items-center mb-3" key={range}>
            <input type="checkbox" className="mr-2" />
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
