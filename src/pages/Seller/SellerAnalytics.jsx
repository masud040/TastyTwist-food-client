import { useQuery } from "@tanstack/react-query";
import StatsBarChart from "../../components/SellerStats/StatsBarChart";
import StatsCard from "../../components/SellerStats/StatsCard";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetSellerStats from "../../hooks/useGetSellerStats";
export default function SellerAnalytics() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats] = useGetSellerStats();

  const { data: sellerStats } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["sellerStats", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/order-stats/${user?.email}`);
      return data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl text-primary font-semibold mb-6 ">
        Hi, Welcome {(user && user.displayName) || "Back!"}
      </h2>
      <StatsCard stats={stats} />
      <div>
        <StatsBarChart chartInfo={sellerStats} />
      </div>
    </div>
  );
}
