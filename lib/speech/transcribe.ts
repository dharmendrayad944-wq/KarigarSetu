import { ISpeechService } from "@/lib/ai/interface";

export class MockSpeechService implements ISpeechService {
  async transcribeAudio(
    _audioBase64OrBuffer: string | ArrayBuffer,
    _mimeType: string,
    language: string = "hi"
  ): Promise<string> {
    // Deterministic mock speech transcript in Hindi or English
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (language === "en") {
      return "This is a handmade brass bell metal Dokra elephant crafted using the 4000-year-old lost wax method in Bastar. We used beeswax coils and riverbed clay.";
    }

    return "यह बस्तर का पारंपरिक ढोकरा घंटी धातु से बना नंदी बैल है, जिसे 4000 वर्ष पुरानी मोम ढलाई विधि से प्राकृतिक मधुमक्खी के मोम और मिट्टी का उपयोग करके बनाया गया है।";
  }
}

export function getSpeechService(): ISpeechService {
  return new MockSpeechService();
}
