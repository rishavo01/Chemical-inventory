"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/* ---------- Columns ---------- */
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    valueGetter: (_, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 120,
    valueGetter: (_, row) =>
      row.rating !== null && row.rating !== undefined ? row.rating : "N/A",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 160,
  },
];

/* ---------- Component ---------- */
const Inventory = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        autoHeight
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;