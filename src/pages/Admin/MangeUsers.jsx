import NoData from "../../components/NoData/NoData";
import SellerRequestTableRow from "../../components/Table/SellerRequestTableRow";
import useGetSellerRequest from "../../hooks/useGetSellerRequest";

export default function ManageUsers() {
  const [requesteUsers, refetch] = useGetSellerRequest();

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
                <SellerRequestTableRow key={user._id} user={user} />
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
