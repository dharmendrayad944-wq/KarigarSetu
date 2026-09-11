import { NextRequest, NextResponse } from "next/server";
import { ProductRepository } from "@/lib/db/repository";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const published = ProductRepository.publishProduct(id);

    return NextResponse.json({ success: true, data: published });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
