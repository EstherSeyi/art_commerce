import { useModal } from "../custom-hooks/use-modal";

import Close from "../assets/close.svg";

import { FilterInner } from "./FilterSection";

const FilterModal = () => {
  const { handleModal } = useModal();
  return (
    <div className="bg-white pt-4  h-5/6 mb-auto mt-16">
      <div className="w-[95%] mx-auto">
        <div className="flex justify-between">
          <h3 className="text-2xl">Filter</h3>
          <button onClick={() => handleModal()}>
            <Close className="w-5 h-5" />
          </button>
        </div>
        <FilterInner />
      </div>
    </div>
  );
};

export default FilterModal;
