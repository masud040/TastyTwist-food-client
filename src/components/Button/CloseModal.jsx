import { IoIosClose } from "react-icons/io";

export default function CloseModal({ onClose }) {
  return (
    <div className="absolute  rounded-full top-3 z-30 right-3  hover:scale-110  transition-all">
      <span onClick={onClose}>
        <IoIosClose className="text-3xl   text-primary" />
      </span>
    </div>
  );
}
