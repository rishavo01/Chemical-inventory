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
    const { name, price, stockQuantity } = req.body;

    const product = await prisma.products.create({
      data: {
        name,
        price,
        stockQuantity,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);
    res.status(500).json({
      message: "Error creating product",
      error: String(error),
    });
  }
};