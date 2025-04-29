import React, { useEffect } from "react";
import { useProductsStore } from "../store/useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCcwIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, error, loading, fetchProducts } = useProductsStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products, error, loading, "products,error,loading");
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 w-full">
        <button className="btn btn-primary rounded-full">
          <PlusCircleIcon className="size5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCcwIcon className="size5" />
        </button>
      </div>
      {error && <div className="alert alert-error mb-8">{error}</div>}
      {products.length == 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-200 rounded-full p-6">
            <PackageIcon className="size12" />
          </div>
          <div className="text-center py-2">
            <h3 className="text-2xl font-semibold">No Products Found</h3>
            <p className="text-gray-500 max-w-sm">
              Get statred by adding yout first product to the inventory
            </p>
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
