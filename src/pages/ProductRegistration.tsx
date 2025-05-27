
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Upload, Plus, Save } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ProductRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    initialStock: "",
    threshold: "",
    sku: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Product Added Successfully!",
        description: `${formData.name} has been added to your inventory.`,
      });
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        initialStock: "",
        threshold: "",
        sku: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Register a new product in your inventory system.</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Product Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku" className="text-sm font-medium text-gray-700">
                    SKU
                  </Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    placeholder="e.g., WBH-001"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter product description"
                  rows={3}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="office-supplies">Office Supplies</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                    Price ($) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="initialStock" className="text-sm font-medium text-gray-700">
                    Initial Stock Level *
                  </Label>
                  <Input
                    id="initialStock"
                    type="number"
                    value={formData.initialStock}
                    onChange={(e) => handleInputChange("initialStock", e.target.value)}
                    placeholder="0"
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold" className="text-sm font-medium text-gray-700">
                    Low Stock Threshold *
                  </Label>
                  <Input
                    id="threshold"
                    type="number"
                    value={formData.threshold}
                    onChange={(e) => handleInputChange("threshold", e.target.value)}
                    placeholder="10"
                    required
                    className="w-full"
                  />
                </div>
              </div>

              {/* Product Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Product Image
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                  <Button type="button" variant="outline" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                >
                  {isSubmitting ? (
                    "Adding Product..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Add Product
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" className="px-8">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        <Card className="mt-6 hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              💡 Tips for Better Inventory Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Set realistic low stock thresholds to avoid stockouts</li>
              <li>• Use clear, descriptive product names for easy identification</li>
              <li>• Add detailed descriptions to help with customer inquiries</li>
              <li>• Upload high-quality images to improve product presentation</li>
              <li>• Keep SKUs consistent and organized for efficient tracking</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductRegistration;
