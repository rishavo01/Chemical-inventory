"use client";

import { useGetProductsQuery, useDeleteProductMutation } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/* ---------- DEMO ADMIN MODE ---------- */
const isAdmin = true;

/* ---------- COMPONENT ---------- */
const Inventory = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  /* ---------- TABLE COLUMNS ---------- */
const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 240,
  },
  {
    field: "name",
    headerName: "Chemical Name",
    width: 220,
  },
  {
    field: "price",
    headerName: "Price (NPR)",
    width: 140,
    renderCell: (params) => <span>Rs. {params.value}</span>,
  },
  {
    field: "stock",
    headerName: "Stock Quantity",
    width: 160,
  },
  {
    field: "unit",
    headerName: "Unit",
    width: 120,
  },
  {
    field: "hazardLevel",
    headerName: "Hazard Level",
    width: 160,
  },
  {
    field: "storageLocation",
    headerName: "Storage Location",
    width: 200,
  },
  {
    field: "expiryDate",
    headerName: "Expiry Date",
    width: 160,
    renderCell: (params) =>
      params.value
        ? new Date(params.value).toLocaleDateString()
        : "—",
  },
  {
    field: "supplier",
    headerName: "Supplier",
    width: 180,
    renderCell: (params) => params.value || "—",
  },
  {
    field: "notes",
    headerName: "Notes",
    width: 220,
    renderCell: (params) => params.value || "—",
  },

  /* ---------- ADMIN ACTIONS ---------- */
  ...(isAdmin
    ? [
        {
          field: "actions",
          headerName: "Actions",
          width: 140,
          sortable: false,
          renderCell: (params) => (
            <button
              onClick={() => {
                const confirmed = confirm(
                  "Are you sure you want to delete this chemical?"
                );
                if (confirmed) {
                  deleteProduct(params.row.id);
                }
              }}
              className="text-red-600 font-medium hover:underline"
            >
              Delete
            </button>
          ),
        },
      ]
    : []),
];

  /* ---------- STATES ---------- */
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch inventory
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />

      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;