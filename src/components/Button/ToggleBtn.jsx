const ToggleBtn = ({ placeRef, selectedPlace }) => {
  return (
    <>
      <label
        htmlFor="Toggle3"
        className="inline-flex w-full j items-center  rounded-md cursor-pointer gap-4 text-gray-800"
      >
        <input
          id="Toggle3"
          type="checkbox"
          className="hidden peer"
          ref={placeRef}
          defaultChecked={selectedPlace}
        />
        <span className="px-4 text-center flex-1 text-sm py-2.5 rounded-md bg-indigo-200 shadow-lg peer-checked:bg-gray-300">
          Home
        </span>
        <span className="px-4 text-center text-sm flex-1 py-2.5 rounded-md bg-gray-300 peer-checked:bg-indigo-200">
          Office
        </span>
      </label>
    </>
  );
};

export default ToggleBtn;
