import React, { ChangeEvent, FormEvent, useState } from "react";
import Header from "@/app/(components)/Header";

/* ---------- TYPES ---------- */
type ProductFormData = {
  name: string;
  formula?: string;
  price: number;
  stock: number;
  unit?: string;
  hazardLevel?: string;
  storageLocation?: string;

  // Optional metadata
  expiryDate?: string;
  supplier?: string;
  notes?: string;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

/* ---------- COMPONENT ---------- */
const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    formula: "",
    price: 0,
    stock: 0,
    unit: "",
    hazardLevel: "",
    storageLocation: "",
    expiryDate: "",
    supplier: "",
    notes: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stock" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Header name="Create New Chemical" />

        <form onSubmit={handleSubmit} className="mt-5">
          {/* CHEMICAL NAME */}
          <label className={labelCssStyles}>Chemical Name</label>
          <input
            type="text"
            name="name"
            placeholder="Chemical Name"
            value={formData.name}
            onChange={handleChange}
            className={inputCssStyles}
            required
          />

          {/* CHEMICAL FORMULA */}
          <label className={labelCssStyles}>Chemical Formula</label>
          <input
            type="text"
            name="formula"
            placeholder="e.g. H2SO4"
            value={formData.formula}
            onChange={handleChange}
            className={inputCssStyles}
          />

          {/* PRICE */}
          <label className={labelCssStyles}>Price (Rs.)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={inputCssStyles}
            required
          />

          {/* STOCK */}
          <label className={labelCssStyles}>Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className={inputCssStyles}
            required
          />

          {/* UNIT */}
          <label className={labelCssStyles}>Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className={inputCssStyles}
          >
            <option value="">Select Unit</option>
            <option value="ml">ml</option>
            <option value="L">L</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
          </select>

          {/* HAZARD LEVEL */}
          <label className={labelCssStyles}>Hazard Level</label>
          <select
            name="hazardLevel"
            value={formData.hazardLevel}
            onChange={handleChange}
            className={inputCssStyles}
          >
            <option value="">Select Hazard Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* STORAGE LOCATION */}
          <label className={labelCssStyles}>Storage Location</label>
          <input
            type="text"
            name="storageLocation"
            placeholder="Lab A – Shelf 2"
            value={formData.storageLocation}
            onChange={handleChange}
            className={inputCssStyles}
          />

          {/* EXPIRY DATE */}
          <label className={labelCssStyles}>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={inputCssStyles}
          />

          {/* SUPPLIER */}
          <label className={labelCssStyles}>Supplier</label>
          <input
            type="text"
            name="supplier"
            placeholder="Supplier Name"
            value={formData.supplier}
            onChange={handleChange}
            className={inputCssStyles}
          />

          {/* NOTES */}
          <label className={labelCssStyles}>Notes</label>
          <textarea
            name="notes"
            placeholder="Additional notes"
            value={formData.notes}
            onChange={handleChange}
            className={inputCssStyles}
          />

          {/* ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;