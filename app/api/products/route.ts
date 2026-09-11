import { NextRequest, NextResponse } from "next/server";
import { ProductRepository } from "@/lib/db/repository";
import { ProductSchema } from "@/lib/db/schema";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const state = searchParams.get("state");
    const status = searchParams.get("status");

    let products = ProductRepository.getProducts();

    if (category && category !== "all") {
      products = products.filter((p) => p.category === category);
    }
    if (state && state !== "all") {
      products = products.filter((p) => p.state.toLowerCase() === state.toLowerCase());
    }
    if (status) {
      products = products.filter((p) => p.status === status);
    }

    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = ProductSchema.parse(body);
    const saved = ProductRepository.saveProduct(validated);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
