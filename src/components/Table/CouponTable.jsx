const CouponTable = ({ coupon, index }) => {
  return (
    <tr>
      <td className="px-3  py-5 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-3  py-5 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {coupon?.coupon_code}
        </p>
      </td>
      <td className="px-3  py-5 border-b border-gray-200 bg-white text-sm text-center">
        <p className="text-gray-900 whitespace-no-wrap">
          {coupon?.discount_percentage}
        </p>
      </td>
    </tr>
  );
};

export default CouponTable;
