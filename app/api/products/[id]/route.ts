import { NextRequest, NextResponse } from "next/server";
import { ProductRepository } from "@/lib/db/repository";
import { ProductSchema } from "@/lib/db/schema";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = ProductRepository.getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = ProductRepository.getProductById(id);
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const body = await req.json();
    const validated = ProductSchema.parse({ ...existing, ...body, id, updated_at: new Date().toISOString() });
    const saved = ProductRepository.saveProduct(validated);

    return NextResponse.json({ success: true, data: saved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
