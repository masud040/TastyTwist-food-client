import StatsCard from "../../components/SellerStats/StatsCard";
import StatsChart from "../../components/SellerStats/StatsChart";
import useAuth from "../../hooks/useAuth";
import useGetSellerStats from "../../hooks/useGetSellerStats";
export default function SellerAnalytics() {
  const { user } = useAuth();

  const [stats] = useGetSellerStats();

  return (
    <div>
      <h2 className="text-3xl text-primary font-semibold mb-6 ">
        Hi, Welcome {(user && user.displayName) || "Back!"}
      </h2>
      <StatsCard stats={stats} />
      <StatsChart />
    </div>
  );
}
