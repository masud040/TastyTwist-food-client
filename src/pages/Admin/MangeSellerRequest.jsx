import { Helmet } from "react-helmet-async";
import ApproveTable from "../../components/AdminPanel/ApproveTable";
import SellerRequestTable from "../../components/AdminPanel/Table/SellerRequestTable";
import useGetSellerRequest from "../../hooks/useGetSellerRequest";

export default function ManageSellerRequest() {
  const { requestedList, pendingList, refetch } = useGetSellerRequest();

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Seller Request</title>
      </Helmet>
      <SellerRequestTable requestedList={requestedList} refetch={refetch} />
      <div className="border-t-2 my-10 border-primary/[70%]"></div>

      <ApproveTable pendingList={pendingList} refetch={refetch} />
    </>
  );
}
