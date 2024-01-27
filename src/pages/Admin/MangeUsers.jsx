import Swal from "sweetalert2";
import NoData from "../../components/NoData/NoData";
import SellerRequestTableRow from "../../components/Table/SellerRequestTableRow";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetSellerRequest from "../../hooks/useGetSellerRequest";

export default function ManageUsers() {
  const [requesteUsers, refetch] = useGetSellerRequest();
  const axiosSecure = useAxiosSecure();
  const handleAction = async (email, statusToChange) => {
    Swal.fire({
      title: `Are you sure ${statusToChange}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(statusToChange);
      }
    });
    // const { data } = await axiosSecure.patch(
    //   `/user/status/${email}?status=Accepted`
    // );
    // console.log(data);
  };
  const handleCanceled = async (email) => {
    const { data } = await axiosSecure.patch(
      `/user/status/${email}?status=Canceled`
    );
    console.log(data);
  };
  return (
    <>
      <h1 className="text-center text-xl text-primary font-semibold mb-5">
        Seller Request
      </h1>

      {requesteUsers?.length > 0 ? (
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
              {requesteUsers?.map((user) => (
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
