import useAuth from "../../../../hooks/useAuth";
import useGetRestaurant from "../../../../hooks/useGetRestaurant";
import Restaurant from "./Restaurant";

const SellerProfile = () => {
  const { user } = useAuth();
  const [restaurant, , refetch] = useGetRestaurant(user.email);

  return (
    <>
      <Restaurant restaurant={restaurant} refetch={refetch} />
    </>
  );
};

export default SellerProfile;
