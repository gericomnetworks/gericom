import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
// ...existing code...

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price } = body;

    // Normalize images: accept `image` (string or array) or `images` (string or array)
    let imagesArray: string[] | undefined;
    if (Array.isArray(body.image)) imagesArray = body.image.map(String);
    else if (Array.isArray(body.images)) imagesArray = body.images.map(String);
    else if (typeof body.image === "string") imagesArray = [body.image];
    else if (typeof body.images === "string") imagesArray = [body.images];

    if (!name || price == null) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const data: any = {
      name,
      price: Number(price),
    };
    if (imagesArray) data.images = imagesArray;

    const product = await prisma.product.create({
      data,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
// ...existing code...