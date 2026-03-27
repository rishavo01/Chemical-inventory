"use client";
import { useGetProductsQuery, useDeleteProductMutation } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import {
  FlaskConical,
  Trash2,
  ShieldAlert,
  Package,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";



/* ---------- DEMO ADMIN MODE ---------- */
const isAdmin = true;

/* ---------- HAZARD BADGE ---------- */
const HazardBadge = ({ level }: { level: string }) => {
  const map: Record<string, { color: string; icon: React.ReactNode }> = {
    High: {
      color: "bg-red-100 text-red-700 border border-red-200",
      icon: <AlertTriangle className="w-3 h-3" />,
    },
    Medium: {
      color: "bg-amber-100 text-amber-700 border border-amber-200",
      icon: <ShieldAlert className="w-3 h-3" />,
    },
    Low: {
      color: "bg-green-100 text-green-700 border border-green-200",
      icon: <CheckCircle2 className="w-3 h-3" />,
    },
  };
  const style = map[level] ?? {
    color: "bg-gray-100 text-gray-500 border border-gray-200",
    icon: null,
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${style.color}`}
    >
      {style.icon}
      {level || "—"}
    </span>
  );
};

/* ---------- STOCK BADGE ---------- */
const StockBadge = ({ qty }: { qty: number }) => {
  const color =
    qty > 50
      ? "bg-emerald-100 text-emerald-700"
      : qty > 10
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-600";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${color}`}>
      {qty}
    </span>
  );
};

/* ---------- DELETE CONFIRM DIALOG ---------- */
const DeleteButton = ({
  id,
  name,
  onDelete,
}: {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}) => {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => {
            onDelete(id);
            setConfirming(false);
          }}
          className="text-xs bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition font-semibold"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 transition px-2 py-1 rounded-md text-xs font-medium"
    >
      <Trash2 className="w-3.5 h-3.5" />
      Delete
    </button>
  );
};

/* ---------- COMPONENT ---------- */
const Inventory = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Chemical Name",
      width: 220,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="font-medium text-gray-800">{params.value}</span>
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price (NPR)",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <span className="font-semibold text-gray-700">
          Rs.{" "}
          <span className="text-blue-700">
            {Number(params.value).toFixed(2)}
          </span>
        </span>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 110,
      renderCell: (params) => <StockBadge qty={params.value} />,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <span className="text-gray-500 text-sm">{params.value || "—"}</span>
      ),
    },
    {
      field: "hazardLevel",
      headerName: "Hazard",
      width: 140,
      renderCell: (params) => <HazardBadge level={params.value} />,
    },
    {
      field: "storageLocation",
      headerName: "Storage Location",
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Package className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {params.value || "—"}
        </div>
      ),
    },
    {
      field: "expiryDate",
      headerName: "Expiry Date",
      width: 140,
      renderCell: (params) => {
        if (!params.value) return <span className="text-gray-400">—</span>;
        const d = new Date(params.value);
        const isExpiringSoon =
          (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24) < 30;
        return (
          <span
            className={`text-sm font-medium ${
              isExpiringSoon ? "text-red-500" : "text-gray-600"
            }`}
          >
            {d.toLocaleDateString()}
          </span>
        );
      },
    },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 170,
      renderCell: (params: GridRenderCellParams) => (
        <span className="text-gray-600 text-sm">{params.value || "—"}</span>
      ),
    },
    {
      field: "notes",
      headerName: "Notes",
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <span className="text-gray-400 text-xs italic truncate">
          {params.value || "—"}
        </span>
      ),
    },
    ...(isAdmin
      ? [
          {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
              <DeleteButton
                id={params.row.id}
                name={params.row.name}
                onDelete={(id) => deleteProduct(id)}
              />
            ),
          },
        ]
      : []),
  ];

  /* ---------- STATES ---------- */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium tracking-wide">
            Loading inventory...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="bg-red-50 border border-red-200 rounded-xl px-8 py-6 text-center">
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-red-600 font-semibold">Failed to load inventory</p>
          <p className="text-red-400 text-sm mt-1">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  const totalStock = products.reduce((sum, p) => sum + (p.stock ?? 0), 0);
  const highHazard = 0;
  const lowStock = products.filter((p) => p.stock <= 10).length;

  /* ---------- UI ---------- */
  return (
    <div className="flex flex-col gap-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <Header name="Inventory" />
          <p className="text-sm text-gray-400 mt-0.5">
            {products.length} chemicals tracked
          </p>
        </div>
      </div>

      {/* Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Chemicals",
            value: products.length,
            color: "bg-blue-50 border-blue-100 text-blue-700",
            dot: "bg-blue-400",
          },
          {
            label: "Total Stock",
            value: totalStock,
            color: "bg-emerald-50 border-emerald-100 text-emerald-700",
            dot: "bg-emerald-400",
          },
          {
            label: "High Hazard",
            value: highHazard,
            color: "bg-red-50 border-red-100 text-red-700",
            dot: "bg-red-400",
          },
          {
            label: "Low Stock",
            value: lowStock,
            color: "bg-amber-50 border-amber-100 text-amber-700",
            dot: "bg-amber-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`rounded-xl border px-4 py-3 flex items-center gap-3 ${stat.color}`}
          >
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${stat.dot}`} />
            <div>
              <p className="text-xl font-bold leading-none">{stat.value}</p>
              <p className="text-xs mt-0.5 opacity-75">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DataGrid */}
      <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white">
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          sx={{
            border: "none",
            fontFamily: "inherit",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#94a3b8",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid #f1f5f9",
              "&:hover": {
                backgroundColor: "#f8fafc",
              },
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #e2e8f0",
              backgroundColor: "#f8fafc",
            },
            "& .MuiCheckbox-root": {
              color: "#94a3b8",
              "&.Mui-checked": { color: "#3b82f6" },
            },
            "& .MuiDataGrid-columnSeparator": { display: "none" },
          }}
        />
      </div>
    </div>
  );
};

export default Inventory;