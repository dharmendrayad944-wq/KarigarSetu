import { NextRequest, NextResponse } from "next/server";
import { getSpeechService } from "@/lib/speech/transcribe";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as Blob | null;
    const language = (formData.get("language") as string) || "hi";

    if (!audioFile) {
      return NextResponse.json(
        { error: "Audio file is required" },
        { status: 400 }
      );
    }

    const buffer = await audioFile.arrayBuffer();
    const speechService = getSpeechService();
    const transcript = await speechService.transcribeAudio(buffer, audioFile.type, language);

    return NextResponse.json({
      success: true,
      transcript,
    });
  } catch (error: any) {
    console.error("Speech transcription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to transcribe speech" },
      { status: 500 }
    );
  }
}
