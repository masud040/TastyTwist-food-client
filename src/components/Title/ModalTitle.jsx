import { Dialog } from "@headlessui/react";

export default function ModalTitle({ title }) {
  return (
    <Dialog.Title
      as="h3"
      className="text-xl font-semibold text-center leading-6 text-primary absolute inset-0 bg-white bg-opacity-70 h-12 flex justify-center items-center hover:bg-transparent transition duration-700 ease-in-out hover:text-white"
    >
      {title}
    </Dialog.Title>
  );
}
