import useAuth from "../../../../hooks/useAuth";
import useGetRestaurant from "../../../../hooks/useGetRestaurant";
import Restaurant from "./Restaurant";

const SellerProfile = () => {
  const { user } = useAuth();
  const [restaurant] = useGetRestaurant(user.email);

  return (
    <>
      <Restaurant restaurant={restaurant} />
    </>
  );
};

export default SellerProfile;
