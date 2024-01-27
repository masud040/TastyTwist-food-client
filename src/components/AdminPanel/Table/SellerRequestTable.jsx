import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import NoData from "../../NoData/NoData";
import SellerRequestTableRow from "../../Table/SellerRequestTableRow";

export default function SellerRequestTable({ requestedList, refetch }) {
  const axiosSecure = useAxiosSecure();
  const handleAction = async (email, statusToChange) => {
    Swal.fire({
      title: `Are you want to sure ${statusToChange}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(
          `/user/status/${email}?status=${statusToChange}`
        );
        if (data.modifiedCount > 0) {
          toast.success(`Seller Request ${statusToChange} successfully`);
        }
        refetch();
      }
    });
  };
  return (
    <>
      <h1 className="text-center text-xl text-primary font-semibold mb-5">
        Seller Request
      </h1>

      {requestedList?.length > 0 ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-left">
            <thead className=" text-gray-700 text-sm text-center">
              <tr>
                <th className="px-3">Name</th>
                <th className="px-3">Email</th>
                <th className="px-3">Status</th>
                <th className="px-3">Details</th>
                <th className="px-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {requestedList?.map((user) => (
                <SellerRequestTableRow
                  key={user._id}
                  user={user}
                  onHandleAction={handleAction}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoData content=" No seller request on you site." />
      )}
    </>
  );
}
