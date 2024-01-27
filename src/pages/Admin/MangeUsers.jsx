import ApproveTable from "../../components/AdminPanel/ApproveTable";
import SellerRequestTable from "../../components/AdminPanel/Table/SellerRequestTable";
import useGetSellerRequest from "../../hooks/useGetSellerRequest";

export default function ManageUsers() {
  const { requestedList, pendingList, refetch } = useGetSellerRequest();

  return (
    <>
      <SellerRequestTable requestedList={requestedList} refetch={refetch} />
      <div className="border-t-2 my-10 border-primary/[70%]"></div>

      <ApproveTable pendingList={pendingList} refetch={refetch} />
    </>
  );
}
