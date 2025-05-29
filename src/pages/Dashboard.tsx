import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, AlertTriangle, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockInventoryData, getProductStatus } from "@/data/inventoryData";

const mockRevenueData = [
  { month: "Jan", revenue: 45000, orders: 320 },
  { month: "Feb", revenue: 52000, orders: 380 },
  { month: "Mar", revenue: 48000, orders: 350 },
  { month: "Apr", revenue: 61000, orders: 420 },
  { month: "May", revenue: 55000, orders: 390 },
  { month: "Jun", revenue: 67000, orders: 450 },
];

const Dashboard = () => {
  // Calculate metrics from inventory data
  const totalProducts = mockInventoryData.length;
  const inStockProducts = mockInventoryData.filter((item) => {
    const status = getProductStatus(item.stock, item.threshold);
    return status === "In Stock";
  });
  const lowStockProducts = mockInventoryData.filter((item) => {
    const status = getProductStatus(item.stock, item.threshold);
    return status === "Low Stock";
  });
  const outOfStockProducts = mockInventoryData.filter((item) => {
    const status = getProductStatus(item.stock, item.threshold);
    return status === "Out of Stock";
  });

  // Calculate total inventory value
  const totalInventoryValue = mockInventoryData.reduce((total, item) => {
    return total + item.price * item.stock;
  }, 0);

  // Calculate total units in stock
  const totalUnitsInStock = mockInventoryData.reduce((total, item) => {
    return total + item.stock;
  }, 0);

  // low stock items alerts
  const lowStockItems = mockInventoryData
    .filter(
      (item) => getProductStatus(item.stock, item.threshold) === "Low Stock"
    )
    .slice(0, 3); // Display just starting 3

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back! Here's your inventory overview.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Inventory Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              ${totalInventoryValue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-1">Total stock value</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Units in Stock
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {totalUnitsInStock}
            </div>
            <p className="text-xs text-gray-500 mt-1">Total units available</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Products in Stock
            </CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {inStockProducts.length}
            </div>
            <p className="text-xs text-green-600 mt-1">
              {Math.round((inStockProducts.length / totalProducts) * 100)}% of
              products
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Low Stock Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {lowStockProducts.length}
            </div>
            <p className="text-xs text-red-600 mt-1">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.length > 0 ? (
                lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-yellow-80 rounded-lg border border-yellow-100"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Current stock: {item.stock}
                      </p>
                    </div>
                    <Badge
                      variant="destructive"
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-300"
                    >
                      Low Stock
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center p-6 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No low stock alerts</p>
                  <p className="text-sm">All products are well stocked!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Status Overview */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Stock Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">In Stock</p>
                  <p className="text-2xl font-bold text-green-900">
                    {inStockProducts.length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Low Stock
                  </p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {lowStockProducts.length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Out of Stock
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    {outOfStockProducts.length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
