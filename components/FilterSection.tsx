const FilterSection = () => {
  return (
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
  );
};

export default FilterSection;
