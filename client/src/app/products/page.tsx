"use client";
import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  rating?: number | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm) as {
    data: Product[] | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  const [createProduct] = useCreateProductMutation();

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData).unwrap();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium tracking-wide">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl px-8 py-6 text-center">
          <p className="text-red-600 font-semibold text-lg">Failed to load products</p>
          <p className="text-red-400 text-sm mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto pb-10 w-full px-1">

      {/* TOP BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Header name="Products" />
          <p className="text-sm text-gray-400 mt-0.5">{products.length} items in inventory</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-150 text-white font-semibold py-2.5 px-5 rounded-xl shadow-md shadow-blue-200"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add Chemical
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 placeholder-gray-400 transition"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* PRODUCTS GRID */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <SearchIcon className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden"
            >
              {/* Image Area */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6">
                <Image
                  src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="w-28 h-28 object-contain rounded-xl group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Info Area */}
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-base truncate mb-1">
                  {product.name}
                </h3>

                <p className="text-blue-600 font-bold text-lg mb-3">
                  Rs. {product.price.toFixed(2)}
                </p>

                <div className="flex items-center justify-between">
                  {/* Stock Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                      product.stock > 20
                        ? "bg-green-100 text-green-700"
                        : product.stock > 5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        product.stock > 20
                          ? "bg-green-500"
                          : product.stock > 5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
                    {product.stock} in stock
                  </span>

                  {/* Rating */}
                  {product.rating !== null && product.rating !== undefined && (
                    <div className="flex items-center">
                      <Rating rating={product.rating} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;