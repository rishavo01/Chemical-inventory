import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* ---------- TYPES ---------- */
export interface Product {
  id: string;
  name: string;
  price: number;
  rating?: number | null;
  stockQuantity: number;
}

export interface NewProduct {
  name: string;
  price: number;
  rating?: number | null;
  stockQuantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

/* ----- Dashboard Types ----- */
export interface SalesSummary {
  id: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  id: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  id: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  id: string;
  category: string;
  amount: number;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

/* ---------- API ---------- */
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["Dashboard", "Products", "Users", "Expenses"],
  endpoints: (build) => ({
    /* ----- DASHBOARD ----- */
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/api/dashboard",
      providesTags: ["Dashboard"],
    }),

    /* ----- PRODUCTS ----- */
    getProducts: build.query<Product[], string | void>({
      query: (search) => ({
        url: "/api/products",
        params: search ? { search } : {},
      }),
      providesTags: ["Products"],
    }),

    createProduct: build.mutation<Product, NewProduct>({
      query: (newProduct) => ({
        url: "/api/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    /* ----- USERS ----- */
    getUsers: build.query<User[], void>({
      query: () => "/api/users",
      providesTags: ["Users"],
    }),

    /* ----- EXPENSES ----- */
    getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
      query: () => "/api/expenses",
      providesTags: ["Expenses"],
    }),
  }),
});

/* ---------- HOOK EXPORTS ---------- */
export const {
  useGetDashboardMetricsQuery, // ✅ FIX
  useGetProductsQuery,
  useCreateProductMutation,
  useGetUsersQuery,
  useGetExpensesByCategoryQuery,
} = api;