// app/api/admin/products/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all products (admin, no pagination)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// CREATE new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, categoryId, categoryName, images, brand, status, featured } = body;

    let finalCategoryId = categoryId;

    // If categoryName is provided, create it
    if (!finalCategoryId && categoryName) {
      const newCategory = await prisma.category.create({
        data: { name: categoryName, slug: categoryName.toLowerCase().replace(/\s+/g, "-") },
      });
      finalCategoryId = newCategory.id;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price, // already in cents
        categoryId: finalCategoryId || undefined,
        brand,
        status,
        featured,
        images: {
          create: images?.map((url: string) => ({ url })) || [],
        },
      },
      include: { category: true, images: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// UPDATE existing product
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, price, categoryId, categoryName, images, brand, status, featured } = body;

    if (!id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    let finalCategoryId = categoryId;

    // If categoryName is provided, create it
    if (!finalCategoryId && categoryName) {
      const newCategory = await prisma.category.create({
        data: { name: categoryName, slug: categoryName.toLowerCase().replace(/\s+/g, "-") },
      });
      finalCategoryId = newCategory.id;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        categoryId: finalCategoryId || undefined,
        brand,
        status,
        featured,
        images: {
          deleteMany: {}, // clear old images
          create: images?.map((url: string) => ({ url })) || [],
        },
      },
      include: { category: true, images: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
