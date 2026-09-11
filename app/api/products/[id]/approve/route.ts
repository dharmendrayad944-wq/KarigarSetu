import { NextRequest, NextResponse } from "next/server";
import { ProductRepository } from "@/lib/db/repository";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const approved = ProductRepository.approveProduct(id, body.edited_fields);

    return NextResponse.json({ success: true, data: approved });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
