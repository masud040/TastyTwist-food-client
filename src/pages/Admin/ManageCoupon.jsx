import { useState } from "react";
import { Helmet } from "react-helmet-async";
import CouponModal from "../../components/Modal/Coupon/CouponModal";
import CouponTable from "../../components/Table/CouponTable";
import useGetCoupons from "../../hooks/useGetCoupons";

export default function ManageCoupon() {
  const [coupon, refetch] = useGetCoupons();
  const [isOpen, setIsOpen] = useState(false);
  const [couponToUpdate, setCouponToUpdate] = useState(null);
  const openEditModal = (couponData) => {
    setCouponToUpdate(couponData);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCouponToUpdate(null);
  };
  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Manage Coupons</title>
      </Helmet>
      <div className="text-gray-700">
        <h1 className="text-center mb-6 text-xl font-bold">Manage Coupon</h1>
        {coupon ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sm">
                  <th>Coupon Code</th>
                  <th>Discount</th>
                  <th>Expiration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <CouponTable coupon={coupon} onOpen={openEditModal} />
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 mt-4 p-2 px-5 border border-primary rounded-lg hover:bg-primary/[7%] hover:border-transparent transition duration-500 ease-in-out text-primary "
            >
              Add Coupon
            </button>
          </div>
        )}
      </div>
      {isOpen && (
        <CouponModal
          isOpen={isOpen}
          onClose={closeModal}
          refetch={refetch}
          couponToUpdate={couponToUpdate}
        />
      )}
    </>
  );
}
