import NoData from "../NoData/NoData";
import ApprovedTableRow from "../Table/ApprovedTableRow";

export default function ApproveTable({ pendingList, refetch }) {
  return (
    <>
      <h1 className="text-center text-xl text-primary font-semibold mb-5">
        Approved User
      </h1>

      {pendingList?.length > 0 ? (
        <div className="relative overflow-x-auto">
          <table className="w-full text-left">
            <thead className=" text-gray-700 text-sm text-center">
              <tr>
                <th className="px-3">Name</th>
                <th className="px-3">Email</th>
                <th className="px-3">Restaurant Details</th>
              </tr>
            </thead>
            <tbody>
              {pendingList?.map((data) => (
                <ApprovedTableRow key={data._id} data={data} />
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
