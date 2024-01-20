import CouponTable from "../../components/Table/CouponTable";
import useGetCoupons from "../../hooks/useGetCoupons";

export default function ManageCoupon() {
  const [coupons, refetch] = useGetCoupons();

  return (
    <div className="text-gray-700">
      <h1 className="text-center mb-6 text-xl font-bold">Manage Coupon</h1>
      <div className="overflow-x-auto">
        <table className="w-full ">
          <thead>
            <tr>
              <th>SI</th>
              <th>Coupon Code</th>
              <th>Discount</th>
              <th>Expiration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.map((coupon, index) => (
              <CouponTable
                key={coupon._id}
                coupon={coupon}
                index={index}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
        <button
          //   onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-xl mt-4 text-white font-semibold"
        >
          Add Coupon
        </button>
      </div>
    </div>
  );
}
