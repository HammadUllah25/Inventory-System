import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import { addSaleRecord } from "@/data/salesData";

interface SellProductDialogProps {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
  };
  onSale: (productId: number, quantitySold: number) => void;
}

export const SellProductDialog = ({
  product,
  onSale,
}: SellProductDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantitySold, setQuantitySold] = useState("");

  const handleSell = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(quantitySold);

    if (quantity > 0 && quantity <= product.stock) {
      // For adding record
      addSaleRecord({
        productId: product.id,
        productName: product.name,
        quantitySold: quantity,
        unitPrice: product.price,
        totalAmount: quantity * product.price,
        saleDate: new Date().toISOString().split("T")[0],
        category: product.category,
      });

      // Updating inventory
      onSale(product.id, quantity);

      // For Reset and close
      setQuantitySold("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-green-50 hover:border-green-200"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Sell
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sell Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Product</Label>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">
                Available: {product.stock} units
              </p>
            </div>
          </div>

          <form onSubmit={handleSell} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity to Sell</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantitySold}
                onChange={(e) => setQuantitySold(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </div>

            {quantitySold && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900">
                  Total Sale Amount: $
                  {(parseInt(quantitySold) * product.price).toFixed(2)}
                </p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Complete Sale
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
