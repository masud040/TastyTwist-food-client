export default function FilterSidebar({ isShow }) {
  console.log(isShow);
  return (
    <div
      className={`${
        isShow && "-translate-x-full"
      } z-40 overflow-x-hidden bg-gray-100 w-48 ms-4  px-2 py-4 fixed inset-y-0 rounded-lg  left-0 transform  transition duration-200 ease-in-out top-[310px]`}
    >
      ehee
    </div>
  );
}
