import Swal from "sweetalert2";

const CouponTable = ({ coupon, onOpen }) => {
  const { _id, code, discountPercentage, expirationDate } = coupon || {};

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Hekki");
      }
    });
  };
  return (
    <tr className="text-sm text-center border-b border-gray-200">
      <td className="px-3  py-5  ">
        <p className="text-gray-900 whitespace-no-wrap">{code}</p>
      </td>
      <td className="px-3  py-5 ">
        <p className="text-gray-900 whitespace-no-wrap">{discountPercentage}</p>
      </td>
      <td className="px-3  py-5 ">
        <p className="text-gray-900 whitespace-no-wrap">{expirationDate}</p>
      </td>
      <td className="px-3 flex justify-center text-black  gap-4 py-5 text-xs  ">
        <button
          onClick={() => onOpen(coupon)}
          className="bg-[#3498db] px-2 py-[2px] rounded-xl"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(_id)}
          className="bg-[#e74c3c] px-2 py-[2px] rounded-xl"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CouponTable;
