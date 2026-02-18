import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/products
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error("PRODUCT FETCH ERROR:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: String(error),
    });
  }
};

/**
 * POST /api/products
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      formula,
      price,
      stock,
      unit,
      hazardLevel,
      storageLocation,
      expiryDate,
      supplier,
      notes,
    } = req.body;

    const product = await prisma.products.create({
      data: {
        name,
        formula,
        price: Number(price),
        stock: Number(stock),
        unit,
        hazardLevel,
        storageLocation,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        supplier,
        notes,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);
    res.status(500).json({
      message: "Error creating chemical",
      error: String(error),
    });
  }
};

/**
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.products.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Chemical deleted successfully",
    });
  } catch (error) {
    console.error("PRODUCT DELETE ERROR:", error);
    res.status(500).json({
      message: "Error deleting product",
      error: String(error),
    });
  }
};