import { ScaleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="text-center h-40 flex justify-center items-center">
      <ScaleLoader color="#ec407a" />
    </div>
  );
};

export default Spinner;
