import { useQuery } from "@tanstack/react-query";

import StatsCard from "../../components/SellerStats/StatsCard";
import StatsChart from "../../components/SellerStats/StatsChart";
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
      <h3 className="text-center mb-5 text-primary">
        Your Restaurant Stats & Analytics
      </h3>
      <StatsCard stats={stats} />
      <StatsChart stats={stats} />
    </div>
  );
}
