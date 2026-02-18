"use client";

import { useGetUsersQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

/* ---------- Columns ---------- */
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
];

/* ---------- Component ---------- */
const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch users
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        autoHeight
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;