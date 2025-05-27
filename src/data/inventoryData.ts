export const mockInventoryData = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 79.99,
    stock: 45,
    threshold: 20,
    status: "In Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: 2,
    name: "Ergonomic Laptop Stand",
    category: "Accessories",
    price: 49.99,
    stock: 8,
    threshold: 15,
    status: "Low Stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: 3,
    name: "USB-C Charging Cable",
    category: "Electronics",
    price: 24.99,
    stock: 0,
    threshold: 25,
    status: "Out of Stock",
    lastUpdated: "2024-01-13",
  },
  {
    id: 4,
    name: "Wireless Mouse",
    category: "Electronics",
    price: 34.99,
    stock: 67,
    threshold: 30,
    status: "In Stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: 5,
    name: "Office Desk Organizer",
    category: "Office Supplies",
    price: 29.99,
    stock: 23,
    threshold: 10,
    status: "In Stock",
    lastUpdated: "2024-01-14",
  },
];

export const getProductStatus = (stock: number, threshold: number) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= threshold) return "Low Stock";
  return "In Stock";
};
