export interface SaleRecord {
  id: number;
  productId: number;
  productName: string;
  quantitySold: number;
  unitPrice: number;
  totalAmount: number;
  saleDate: string;
  category: string;
}

export let mockSalesData: SaleRecord[] = [
  {
    id: 1,
    productId: 1,
    productName: "Wireless Bluetooth Headphones",
    quantitySold: 15,
    unitPrice: 79.99,
    totalAmount: 1199.85,
    saleDate: "2024-01-15",
    category: "Electronics",
  },
  {
    id: 2,
    productId: 2,
    productName: "Ergonomic Laptop Stand",
    quantitySold: 8,
    unitPrice: 49.99,
    totalAmount: 399.92,
    saleDate: "2024-01-14",
    category: "Accessories",
  },
  {
    id: 3,
    productId: 4,
    productName: "Wireless Mouse",
    quantitySold: 22,
    unitPrice: 34.99,
    totalAmount: 769.78,
    saleDate: "2024-01-13",
    category: "Electronics",
  },
];

export const addSaleRecord = (sale: Omit<SaleRecord, "id">) => {
  const newSale: SaleRecord = {
    ...sale,
    id: mockSalesData.length + 1,
  };
  mockSalesData.push(newSale);
  return newSale;
};

const filterSalesByCategory = (sales: SaleRecord[], categoryFilter: string) => {
  if (categoryFilter === "all") return sales;

  const categoryMap: { [key: string]: string } = {
    electronics: "Electronics",
    accessories: "Accessories",
    office: "Office Supplies",
    software: "Software",
  };

  const targetCategory = categoryMap[categoryFilter] || categoryFilter;
  return sales.filter((sale) => sale.category === targetCategory);
};

export const calculateRevenueMetrics = (categoryFilter: string = "all") => {
  const filteredSales = filterSalesByCategory(mockSalesData, categoryFilter);
  const totalRevenue = filteredSales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0
  );
  const totalOrders = filteredSales.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Assuming 30% profit margin on average
  const totalProfit = totalRevenue * 0.3;
  const profitMargin =
    totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    profitMargin,
    totalProfit,
  };
};

export const getSalesDataByMonth = (
  timeFilter: string = "monthly",
  categoryFilter: string = "all"
) => {
  const filteredSales = filterSalesByCategory(mockSalesData, categoryFilter);
  const salesByPeriod: {
    [key: string]: { revenue: number; orders: number; profit: number };
  } = {};

  filteredSales.forEach((sale) => {
    const date = new Date(sale.saleDate);
    let period: string;

    switch (timeFilter) {
      case "daily":
        period = date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        break;
      case "weekly":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        period = `Week of ${weekStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`;
        break;
      case "annually":
        period = date.getFullYear().toString();
        break;
      default: // monthly
        period = date.toLocaleDateString("en-US", { month: "short" });
    }

    if (!salesByPeriod[period]) {
      salesByPeriod[period] = { revenue: 0, orders: 0, profit: 0 };
    }
    salesByPeriod[period].revenue += sale.totalAmount;
    salesByPeriod[period].orders += 1;
    salesByPeriod[period].profit += sale.totalAmount * 0.3; // 30% profit margin
  });

  return Object.entries(salesByPeriod).map(([period, data]) => ({
    period,
    ...data,
  }));
};

export const getSalesByCategory = (categoryFilter: string = "all") => {
  const filteredSales =
    categoryFilter === "all"
      ? mockSalesData
      : filterSalesByCategory(mockSalesData, categoryFilter);
  const salesByCategory: { [key: string]: number } = {};

  filteredSales.forEach((sale) => {
    if (!salesByCategory[sale.category]) {
      salesByCategory[sale.category] = 0;
    }
    salesByCategory[sale.category] += sale.totalAmount;
  });

  return Object.entries(salesByCategory).map(([name, value]) => ({
    name,
    value,
    color:
      name === "Electronics"
        ? "#3b82f6"
        : name === "Accessories"
        ? "#10b981"
        : name === "Office Supplies"
        ? "#f59e0b"
        : "#ef4444",
  }));
};
