import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  Package,
  AlertTriangle,
  TrendingUp,
  Edit,
} from "lucide-react";
import { useState } from "react";
import {
  mockInventoryData as initialInventoryData,
  getProductStatus,
} from "@/data/inventoryData";
import { SellProductDialog } from "@/components/SellProductDialog";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // For new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    threshold: "",
    description: "",
  });

  // For editing product
  const [editProduct, setEditProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    threshold: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New product:", newProduct);

    // New product object
    const productToAdd = {
      id: inventoryData.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      threshold: parseInt(newProduct.threshold),
      status: getProductStatus(
        parseInt(newProduct.stock),
        parseInt(newProduct.threshold)
      ),
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    // Add to inventory
    setInventoryData([...inventoryData, productToAdd]);

    // Reset form and close dialog
    setIsDialogOpen(false);
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      threshold: "",
      description: "",
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Editing product:", editProduct);

    // Update product in inventory
    const updatedInventory = inventoryData.map((item) => {
      if (item.id === editingProduct.id) {
        return {
          ...item,
          name: editProduct.name,
          category: editProduct.category,
          price: parseFloat(editProduct.price),
          stock: parseInt(editProduct.stock),
          threshold: parseInt(editProduct.threshold),
          status: getProductStatus(
            parseInt(editProduct.stock),
            parseInt(editProduct.threshold)
          ),
          lastUpdated: new Date().toISOString().split("T")[0],
        };
      }
      return item;
    });

    setInventoryData(updatedInventory);

    // Reset form and close dialog
    setIsEditDialogOpen(false);
    setEditingProduct(null);
    setEditProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      threshold: "",
      description: "",
    });
  };

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setEditProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      threshold: product.threshold.toString(),
      description: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleSale = (productId: number, quantitySold: number) => {
    console.log("Processing sale:", { productId, quantitySold });

    // Update inventory by reducing stock
    const updatedInventory = inventoryData.map((item) => {
      if (item.id === productId) {
        const newStock = item.stock - quantitySold;
        return {
          ...item,
          stock: newStock,
          status: getProductStatus(newStock, item.threshold),
          lastUpdated: new Date().toISOString().split("T")[0],
        };
      }
      return item;
    });

    setInventoryData(updatedInventory);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Out of Stock":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Inventory Management
            </h1>
            <p className="text-gray-600">
              Monitor and manage your product inventory levels.
            </p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) =>
                    setNewProduct({ ...newProduct, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Office Supplies">
                      Office Supplies
                    </SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Initial Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold">Low Stock Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={newProduct.threshold}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, threshold: e.target.value })
                  }
                  placeholder="10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Add Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={editProduct.category}
                  onValueChange={(value) =>
                    setEditProduct({ ...editProduct, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Office Supplies">
                      Office Supplies
                    </SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    step="0.01"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editProduct.stock}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, stock: e.target.value })
                    }
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-threshold">Low Stock Threshold</Label>
                <Input
                  id="edit-threshold"
                  type="number"
                  value={editProduct.threshold}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      threshold: e.target.value,
                    })
                  }
                  placeholder="10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description (Optional)</Label>
                <Textarea
                  id="edit-description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Update Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {inventoryData.length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Active products</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              In Stock
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {
                inventoryData.filter((item) => item.status === "In Stock")
                  .length
              }
            </div>
            <p className="text-xs text-green-600 mt-1">
              {Math.round(
                (inventoryData.filter((item) => item.status === "In Stock")
                  .length /
                  inventoryData.length) *
                  100
              )}
              % of products
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Low Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {
                inventoryData.filter((item) => item.status === "Low Stock")
                  .length
              }
            </div>
            <p className="text-xs text-yellow-600 mt-1">Need restocking</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Out of Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {
                inventoryData.filter((item) => item.status === "Out of Stock")
                  .length
              }
            </div>
            <p className="text-xs text-red-600 mt-1">
              Need immediate attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Product Inventory
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Office Supplies">
                    Office Supplies
                  </SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900">
                    Product Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Category
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Price
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Stock
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Last Updated
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-gray-900 font-medium">
                      ${item.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {item.stock}
                        </span>
                        {item.stock <= item.threshold && item.stock > 0 && (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        {item.stock === 0 && (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {item.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-gray-100"
                          onClick={() => handleEditClick(item)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <SellProductDialog product={item} onSale={handleSale} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
