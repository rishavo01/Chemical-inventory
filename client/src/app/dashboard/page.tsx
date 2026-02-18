"use client";

import {
  AlertTriangle,
  Beaker,
  ClipboardList,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      {/* Frequently Used Chemicals */}
      <CardPopularProducts />

      {/* Chemical Consumption Summary */}
      <CardSalesSummary />

      {/* Chemical Procurement Summary */}
      <CardPurchaseSummary />

      {/* Chemical Cost / Disposal Summary */}
      <CardExpenseSummary />

      {/* Lab Usage & Cost Overview */}
      <StatCard
        title="Lab Usage & Costs"
        primaryIcon={<Beaker className="text-blue-600 w-6 h-6" />}
        dateRange="1 - 30 Feb 2026"
        details={[
          {
            title: "Chemical Usage Growth",
            amount: "175.00",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Lab Expenses",
            amount: "10.00",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />

      {/* Pending Procurement & Requests */}
      <StatCard
        title="Pending Procurement & Requests"
        primaryIcon={<ClipboardList className="text-blue-600 w-6 h-6" />}
        dateRange="1 - 30 Feb 2026"
        details={[
          {
            title: "Pending Requests",
            amount: "250",
            changePercentage: 131,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending Chemical Orders",
            amount: "147",
            changePercentage: -56,
            IconComponent: TrendingDown,
          },
        ]}
      />

      {/* Usage & Waste Analysis */}
      <StatCard
        title="Usage & Waste Analysis"
        primaryIcon={<AlertTriangle className="text-blue-600 w-6 h-6" />}
        dateRange="1 - 30 Feb 2026"
        details={[
          {
            title: "Chemical Usage",
            amount: "1000.00",
            changePercentage: 20,
            IconComponent: TrendingUp,
          },
          {
            title: "Chemical Waste / Loss",
            amount: "200.00",
            changePercentage: -10,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;