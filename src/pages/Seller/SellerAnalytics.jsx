import { useQuery } from "@tanstack/react-query";
import StatsBarChart from "../../components/SellerStats/StatsBarChart";
import StatsCard from "../../components/SellerStats/StatsCard";
import StatsPieChart from "../../components/SellerStats/StatsPieChart";
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
      <h2 className="text-3xl text-indigo-500 font-semibold mb-6 ">
        Hi, Welcome {(user && user.displayName) || "Back! "} 😍
      </h2>
      <StatsCard stats={stats} />
      <div className="flex flex-col justify-between items-center lg:flex-row lg:mt-7 space-y-8">
        <StatsBarChart chartInfo={sellerStats} />
        <StatsPieChart chartInfo={sellerStats} />
      </div>
    </div>
  );
}
