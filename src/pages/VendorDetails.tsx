import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoProductCard } from "@/components/vendor/VideoProductCard";
import { supabase } from "@/integrations/supabase/client";
import { CustomerDetailsDialog } from "@/components/CustomerDetailsDialog";

const CURRENCY_RATES = {
  NGN: 460.0,
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
};

type Currency = keyof typeof CURRENCY_RATES;

export default function VendorDetails() {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  useEffect(() => {
    async function fetchVendorAndProducts() {
      try {
        // Fetch vendor details
        const { data: vendorData, error: vendorError } = await supabase
          .from("vendors")
          .select("*")
          .eq("id", vendorId)
          .single();

        if (vendorError) throw vendorError;
        setVendor(vendorData);

        // Fetch vendor's products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select(`
            *,
            video_content (
              video_url,
              thumbnail_url,
              likes_count,
              shares_count
            )
          `)
          .eq("vendor_id", vendorId);

        if (productsError) throw productsError;

        const formattedProducts = productsData.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          videoUrl: product.video_content?.video_url || "",
          thumbnailUrl: product.video_content?.thumbnail_url || "",
          category: product.category,
          stats: {
            likes: product.video_content?.likes_count || 0,
            shares: product.video_content?.shares_count || 0,
          }
        }));

        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (vendorId) {
      fetchVendorAndProducts();
    }
  }, [vendorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        {vendor?.business_name}'s Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <VideoProductCard
            key={product.id}
            product={product}
            currency={currency}
            currencyRate={CURRENCY_RATES[currency]}
            onPurchase={() => {
              setSelectedProduct(product);
              setShowPurchaseDialog(true);
            }}
          />
        ))}
      </div>

      {selectedProduct && (
        <CustomerDetailsDialog
          open={showPurchaseDialog}
          onOpenChange={setShowPurchaseDialog}
          productId={selectedProduct.id}
          amount={selectedProduct.price * CURRENCY_RATES[currency]}
          vendorName={vendor?.business_name}
        />
      )}
    </div>
  );
}