"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageContext";
import { ProductRepository } from "@/lib/db/repository";
import { Product } from "@/lib/db/schema";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProvenanceBadge } from "@/components/ui/Badge";
import {
  Camera,
  Mic,
  Square,
  Volume2,
  Sparkles,
  Upload,
  RefreshCw,
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Eye,
  ArrowRight,
  Info,
  Edit3,
  Check,
} from "lucide-react";

// Pre-configured authentic craft samples matching SIH scenarios
const SAMPLE_CRAFTS = [
  {
    name: "Bastar Dhokra Nandi Bull",
    artisan: "Shanti Devi",
    category: "metalwork",
    craft: "Bastar Dhokra",
    region: "Bastar, Chhattisgarh",
    material: "Bell metal alloy / beeswax / core clay",
    motif: "Peacock / Nandi Horns / Filigree",
    language: "Hindi",
    confidence: "96%",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    audioTranscript: "यह बस्तर का पारंपरिक ढोकरा शिल्प है, जिसे घंटी धातु और मधुमक्खी के मोम की लॉस्ट-वैक्स तकनीक से हाथ से ढाला गया है। यह नंदी बैल की पवित्र प्रतिमा है।",
    state: "Chhattisgarh",
    district: "Bastar",
    keywords: ["ढोकरा", "घंटी धातु", "मोम ढलाई", "बस्तर", "नंदी बैल", "पीतल"],
    visualFeatures: ["Twisted wax wire filigree", "Hollow core bronze casting", "Bovine horned silhouette"],
  },
  {
    name: "Jaipur Blue Pottery Vase",
    artisan: "Ramesh Kripal",
    category: "pottery",
    craft: "Jaipur Blue Pottery",
    region: "Jaipur, Rajasthan",
    material: "Ceramic / quartz pottery / multani mitti",
    motif: "Persian Arabesque / Lotus",
    language: "Hindi",
    confidence: "94%",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    audioTranscript: "यह जयपुर की पारंपरिक ब्लू पॉटरी का फूलदान है, जिसे बिना मिट्टी के क्वार्ट्ज़ पत्थर और मुल्तानी मिट्टी से हाथ से बनाया गया है। इस पर कोबाल्ट नीले और फिरोज़ी रंग के बेल-बूटे हैं।",
    state: "Rajasthan",
    district: "Jaipur",
    keywords: ["ब्लू पॉटरी", "क्वार्ट्ज़ पत्थर", "मुल्तानी मिट्टी", "कोबाल्ट नीला", "फिरोज़ी बेल-बूटे"],
    visualFeatures: ["Cobalt blue Persian arabesque", "Single-fire mineral glaze", "Non-thrown mold contour"],
  },
  {
    name: "Madhubani Kohbar Painting",
    artisan: "Sita Devi",
    category: "paintings",
    craft: "Madhubani Painting",
    region: "Madhubani, Bihar",
    material: "Cotton rag paper / vegetable dyes",
    motif: "Matsya / Lotus / Sun & Moon",
    language: "Hindi / Maithili",
    confidence: "97%",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    audioTranscript: "यह मधुबनी की पारंपरिक कोहबर पेंटिंग है, जिसे हाथ से बने कागज़ पर बांस की सींक और हल्दी, नील व गेंदे के प्राकृतिक रंगों से बनाया गया है।",
    state: "Bihar",
    district: "Madhubani",
    keywords: ["कोहबर पेंटिंग", "बांस की सींक", "हल्दी व नील", "प्राकृतिक रंग", "मिथिला"],
    visualFeatures: ["Double-line geometric border", "Fine Kachni hatching", "Matsya symbol profile"],
  },
  {
    name: "Channapatna Stacking Toy",
    artisan: "Syed Mubarak",
    category: "woodwork",
    craft: "Channapatna Toys",
    region: "Channapatna, Karnataka",
    material: "Hale wood / natural button lac",
    motif: "Concentric Rings / Radial Geometry",
    language: "Hindi / Kannada",
    confidence: "98%",
    imageUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    audioTranscript: "यह चन्नापट्टना का पारंपरिक लकड़ी का खिलौना है, जिसे हाले की लकड़ी और प्राकृतिक लाख से बाल-सुरक्षित वनस्पति रंगों में तैयार किया गया है।",
    state: "Karnataka",
    district: "Ramanagara",
    keywords: ["चन्नापट्टना", "हाले लकड़ी", "प्राकृतिक लाख", "हल्दी", "बाल खिलौना"],
    visualFeatures: ["Lathe-turned radial symmetry", "High-gloss friction shellac finish", "Vegetable dyed rings"],
  },
  {
    name: "Banarasi Katan Silk Saree",
    artisan: "Mukhtar Ansari",
    category: "textiles",
    craft: "Banarasi Silk",
    region: "Varanasi, Uttar Pradesh",
    material: "Pure Katan Mulberry Silk / Zari",
    motif: "Floral Jaal / Kadhwa Booti",
    language: "Hindi",
    confidence: "97%",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    audioTranscript: "यह बनारस की कतान सिल्क की शुद्ध हैंडलूम साड़ी है, जिस पर पारंपरिक कढ़वा तकनीक से सोने-चांदी के तारों का ज़री काम किया गया है।",
    state: "Uttar Pradesh",
    district: "Varanasi",
    keywords: ["बनारसी सिल्क", "कतान", "कढ़वा बुनाई", "ज़री", "हथकरघा"],
    visualFeatures: ["Handloom Kadhwa weft interlocking", "Pure mulberry silk sheen", "Floral brocade border"],
  },
  {
    name: "Kutch Suf Mirror Wall Art",
    artisan: "Fatima Bai",
    category: "textiles",
    craft: "Kutch Embroidery",
    region: "Bhuj, Gujarat",
    material: "Cotton canvas / silk floss / glass mirrors",
    motif: "Suf Geometric / Abhala Mirrors",
    language: "Hindi / Gujarati",
    confidence: "95%",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    audioTranscript: "यह कच्छ की सूफ कढ़ाई और अभला का काम है, जिसमें बिना किसी खाके के सुई से धागों की गिनती करके ज्यामितीय पैटर्न और शीशे जड़े गए हैं।",
    state: "Gujarat",
    district: "Kutch",
    keywords: ["कच्छ कढ़ाई", "सूफ", "शीशा काम", "अभला", "भुज"],
    visualFeatures: ["Counting warp-weft Suf stitch", "Circular mirror bezel embroidery", "Chevron border"],
  },
  {
    name: "Tala Pattachitra Scroll",
    artisan: "Prasant Maharana",
    category: "paintings",
    craft: "Pattachitra",
    region: "Raghurajpur, Odisha",
    material: "Treated Palm Leaves (Tala Patra) / natural soot",
    motif: "Krishna Leela / Tree of Life",
    language: "Hindi / Odia",
    confidence: "96%",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    audioTranscript: "यह ओडिशा के रघुराजपुर का ताड़पत्र पट्टचित्र है। सूखे ताड़ के पत्तों पर लोहे की लेखनी से उत्कीर्ण करके प्राकृतिक काजल और रंगों से भरा गया है।",
    state: "Odisha",
    district: "Puri",
    keywords: ["पट्टचित्र", "ताड़पत्र", "रघुराजपुर", "लेखनी", "प्राकृतिक रंग"],
    visualFeatures: ["Palm leaf panel stitching", "Fine iron stylus incised lines", "Conch white & lampblack fill"],
  },
];

// Required 6 Progress States per Section 4 & Pipeline
const PROCESSING_STEPS = [
  "Image received & visual morphology scanned",
  "Voice transcribed & local craft vocabulary mapped",
  "Language & regional cluster detected",
  "Craft technique & material lineage extracted",
  "Comparable market listings retrieved & price range discovered",
  "Digital Heritage Profile & Market Analysis prepared",
];

export default function AddProductPage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_CRAFTS[0].imageUrl);
  const [voiceTranscript, setVoiceTranscript] = useState<string>(SAMPLE_CRAFTS[0].audioTranscript);
  const [isEditingTranscript, setIsEditingTranscript] = useState<boolean>(false);
  const [editedTranscript, setEditedTranscript] = useState<string>(SAMPLE_CRAFTS[0].audioTranscript);
  const [textFallback, setTextFallback] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(SAMPLE_CRAFTS[0].category);
  const [state, setState] = useState<string>(SAMPLE_CRAFTS[0].state);
  const [district, setDistrict] = useState<string>(SAMPLE_CRAFTS[0].district);

  // Extracted preview tokens
  const [previewKeywords, setPreviewKeywords] = useState<string[]>(SAMPLE_CRAFTS[0].keywords);
  const [previewFeatures, setPreviewFeatures] = useState<string[]>(SAMPLE_CRAFTS[0].visualFeatures);

  // Audio recording states
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Processing states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle Recording simulation or real mic
  const startRecording = async () => {
    try {
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);

      if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setVoiceTranscript(transcript);
            setEditedTranscript(transcript);
            const tokens = transcript.split(/\s+/).filter((w: string) => w.length > 3).slice(0, 5);
            setPreviewKeywords(tokens);
          }
        };

        recognition.onerror = (e: any) => {
          console.warn("Speech recognition notice:", e);
        };

        recognition.start();
        (window as any).__currentRecognition = recognition;
      }
    } catch (e) {
      console.warn("Mic access notice:", e);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (typeof window !== "undefined" && (window as any).__currentRecognition) {
      try {
        (window as any).__currentRecognition.stop();
      } catch (e) {}
    }

    if (!voiceTranscript) {
      const defaultSpoken =
        language === "hi"
          ? "यह हाथ से बनाई हुई बस्तर की ढोकरा शिल्प कलाकृति है, जो पीतल और मोम ढलाई से निर्मित है।"
          : "This is a handmade Bastar Dhokra craft creation made with brass bell metal and lost-wax technique.";
      setVoiceTranscript(defaultSpoken);
      setEditedTranscript(defaultSpoken);
      setPreviewKeywords(["ढोकरा", "घंटी धातु", "मोम ढलाई", "बस्तर"]);
    }
  };

  // Handle local image file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
        setPreviewFeatures(["Uploaded user photograph", "Visual texture analysis active"]);
      }
    };
    reader.readAsDataURL(file);
  };

  // Quick pick sample craft
  const selectSample = (sample: (typeof SAMPLE_CRAFTS)[0], idx: number) => {
    setSelectedSampleIndex(idx);
    setImageUrl(sample.imageUrl);
    setVoiceTranscript(sample.audioTranscript);
    setEditedTranscript(sample.audioTranscript);
    setIsEditingTranscript(false);
    setSelectedCategory(sample.category);
    setState(sample.state);
    setDistrict(sample.district);
    setPreviewKeywords(sample.keywords);
    setPreviewFeatures(sample.visualFeatures);
    setErrorMsg(null);
  };

  // Save edited transcript
  const handleSaveEditedTranscript = () => {
    setVoiceTranscript(editedTranscript);
    setIsEditingTranscript(false);
    const tokens = editedTranscript.split(/\s+/).filter((w) => w.length > 3).slice(0, 5);
    if (tokens.length > 0) setPreviewKeywords(tokens);
  };

  // AI Generation Submission
  const handleGenerateListing = async () => {
    const finalDescription = voiceTranscript || textFallback;
    if (!imageUrl) {
      setErrorMsg("Please upload a product photograph or select a sample");
      return;
    }
    if (!finalDescription) {
      setErrorMsg("Please record a voice description or write a short text note");
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setCurrentStepIndex(0);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < PROCESSING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    try {
      const response = await fetch("/api/ai/generate-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          voice_transcript: voiceTranscript,
          text_description: textFallback,
          selected_category: selectedCategory,
          artisan_location: { state, district },
          language,
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        throw new Error("AI Listing generation failed");
      }

      const result = await response.json();
      const aiData = result.data;

      // Save as artisan_review (NOT published automatically!)
      const newProductId = `prod-${Date.now()}`;
      const newProduct: Product = {
        id: newProductId,
        artisan_id: SAMPLE_CRAFTS[selectedSampleIndex]?.artisan || "artisan-shanti-devi",
        title: aiData.title,
        title_hi: aiData.title_hi || aiData.title,
        description: aiData.description,
        description_hi: aiData.description_hi || aiData.description,
        category: aiData.category,
        craft_name: aiData.craft_name,
        state: aiData.state || state,
        district: aiData.district || district,
        materials: aiData.materials,
        motifs: aiData.motifs,
        dimensions: aiData.dimensions || { length: 18, width: 10, height: 16, unit: "cm" },
        inventory: 1,
        additional_images: [],
        is_demo_data: true,
        suggested_min_price: aiData.suggested_price_min,
        suggested_max_price: aiData.suggested_price_max,
        final_price: Math.round((aiData.suggested_price_min + aiData.suggested_price_max) / 2),
        price_analysis: aiData.price_analysis,
        comparison_attributes: aiData.comparison_attributes,
        cost_reference: aiData.cost_reference,
        artisan_price_decision: {
          product_id: newProductId,
          recommended_min: aiData.suggested_price_min,
          recommended_max: aiData.suggested_price_max,
          final_price: Math.round((aiData.suggested_price_min + aiData.suggested_price_max) / 2),
          chosen_by: "recommendation_accepted",
          created_at: new Date().toISOString(),
          pricing_sources: aiData.price_analysis?.comparables ? aiData.price_analysis.comparables.map((c: { marketplace: string }) => c.marketplace) : ["Amazon", "Flipkart", "ONDC"],
        },
        pricing_breakdown: aiData.pricing_breakdown,
        ai_understanding: aiData.ai_understanding,
        artisan_story: aiData.heritage_story_draft,
        status: "artisan_review", // Explicit approval required before publication
        featured_image_url: imageUrl,
        gi_status: aiData.gi_status || "gi_candidate_unverified",
        gi_demo_reference: aiData.gi_demo_reference,
        gi_tag_applicable: aiData.gi_tag_applicable,
        gi_registry_number: null, // Strict: no fake identifiers
        gi_candidacy_status: aiData.gi_candidacy_status || "candidate_unverified",
        odop_product_tag: `${aiData.craft_name} ${aiData.district}`,
        heritage_record: {
          id: `hr-${newProductId}`,
          product_id: newProductId,
          craft_name: aiData.craft_name,
          region: `${aiData.district}, ${aiData.state}`,
          state: aiData.state || state,
          district: aiData.district || district,
          artisan_name: SAMPLE_CRAFTS[selectedSampleIndex]?.artisan || "Master Artisan",
          traditional_technique: aiData.traditional_technique,
          materials: aiData.materials,
          motifs: aiData.motifs,
          cultural_story: aiData.cultural_significance,
          artisan_story: aiData.heritage_story_draft,
          original_language: language === "hi" ? "Hindi" : "English",
          gi_status: aiData.gi_status || "gi_candidate_unverified",
          gi_demo_reference: aiData.gi_demo_reference,
          preservation_urgency: "high",
          sources: [
            {
              title: `${aiData.craft_name} Heritage Guild Documentation`,
              type: "Regional Guild Archive",
              is_demo: true,
            },
          ],
          claims: aiData.heritage_claims,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        heritage_profile: {
          id: `hr-${newProductId}`,
          product_id: newProductId,
          craft_name: aiData.craft_name,
          region: `${aiData.district}, ${aiData.state}`,
          state: aiData.state || state,
          district: aiData.district || district,
          artisan_name: SAMPLE_CRAFTS[selectedSampleIndex]?.artisan || "Master Artisan",
          traditional_technique: aiData.traditional_technique,
          materials: aiData.materials,
          motifs: aiData.motifs,
          cultural_story: aiData.cultural_significance,
          artisan_story: aiData.heritage_story_draft,
          original_language: language === "hi" ? "Hindi" : "English",
          gi_status: aiData.gi_status || "gi_candidate_unverified",
          gi_demo_reference: aiData.gi_demo_reference,
          preservation_urgency: "high",
          sources: [
            {
              title: `${aiData.craft_name} Heritage Guild Documentation`,
              type: "Regional Guild Archive",
              is_demo: true,
            },
          ],
          claims: aiData.heritage_claims,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      ProductRepository.saveProduct(newProduct);
      router.push(`/products/${newProductId}/review`);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsProcessing(false);
      setErrorMsg(err.message || "Failed to process listing. Please try again.");
    }
  };

  const currentSample = SAMPLE_CRAFTS[selectedSampleIndex];

  return (
    <div className="flex-1 bg-[#FAF7F2] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Onboarding Mission Banner */}
        <div className="bg-[#FFF7ED] border border-orange-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-[#C2410C] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            <strong className="text-[#9A3412] font-semibold block sm:inline">
              Artisan Voice → AI Onboarding & Digital Heritage Vault:
            </strong>{" "}
            Photograph your handmade craft and speak naturally in your mother tongue. KarigarSetu synthesizes structured
            commercial listings and preserves traditional techniques in the Living Heritage Vault.
          </div>
        </div>

        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#9A3412] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Voice-First AI Assistant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-stone-900">
            {t.addProductTitle}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            {t.addProductSubtitle}
          </p>
        </div>

        {/* Quick Sample Selector for SIH Hackathon Demo */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl craft-border-subtle shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SIH Demo Crafts (Click to test scenario)
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              Demo Artisan: <strong className="text-stone-700">{currentSample.artisan}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMPLE_CRAFTS.map((sample, idx) => {
              const isSelected = selectedSampleIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectSample(sample, idx)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                    isSelected
                      ? "border-[#C2410C] bg-orange-50/70 ring-2 ring-[#C2410C]/20"
                      : "border-stone-200 hover:border-stone-300 bg-white"
                  }`}
                >
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={sample.imageUrl}
                      alt={sample.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-stone-900 truncate">
                      {sample.name}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {sample.region}
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C2410C] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Step Card: Photo + Voice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Step 1: Product Photo */}
          <Card className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#C2410C] font-bold text-sm">
                  1
                </div>
                <h3 className="text-lg font-bold font-serif text-stone-900">
                  {t.stepPhotoTitle}
                </h3>
              </div>
              <p className="text-xs text-stone-600">
                {t.stepPhotoDesc}
              </p>
            </div>

            {/* Photo Preview & Upload Box */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative h-64 rounded-2xl border-2 border-dashed border-stone-300 hover:border-[#C2410C] bg-[#FAF7F2] flex flex-col items-center justify-center overflow-hidden cursor-pointer group transition-colors"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl}
                    alt="Craft upload preview"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                    <Camera className="w-4 h-4" /> Click to Change Photo
                  </div>
                </>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center mx-auto text-[#C2410C]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-stone-800">
                    {t.clickToUpload}
                  </div>
                  <div className="text-xs text-stone-500">
                    {t.orDragDrop}
                  </div>
                </div>
              )}
            </div>

            {imageUrl && (
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Photo ready for visual morphology AI
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#C2410C] font-semibold hover:underline"
                >
                  Upload New
                </button>
              </div>
            )}
          </Card>

          {/* Step 2: Voice Spoken Description */}
          <Card className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-[#C2410C] font-bold text-sm">
                  2
                </div>
                <h3 className="text-lg font-bold font-serif text-stone-900">
                  {t.stepVoiceTitle}
                </h3>
              </div>
              <p className="text-xs text-stone-600">
                {t.stepVoiceDesc}
              </p>
            </div>

            {/* Voice Recording Box */}
            <div className="bg-[#FAF7F2] rounded-2xl p-5 border border-stone-200 flex flex-col items-center justify-center space-y-4 min-h-[220px]">
              {isRecording ? (
                <div className="text-center space-y-3">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-500 animate-ping absolute opacity-40"></div>
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="relative w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700 cursor-pointer min-h-[64px] min-w-[64px]"
                      aria-label="Stop recording"
                    >
                      <Square className="w-7 h-7 fill-white" />
                    </button>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-red-600 animate-pulse">
                      {t.recordingInProgress} ({recordingSeconds}s)
                    </div>
                    <div className="text-xs text-stone-500 mt-1">
                      Tap the square red button when done speaking
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 w-full">
                  <button
                    type="button"
                    onClick={startRecording}
                    className="w-16 h-16 rounded-full bg-[#C2410C] text-white flex items-center justify-center shadow-md hover:bg-[#9A3412] active:scale-95 transition-all mx-auto cursor-pointer min-h-[64px] min-w-[64px]"
                    aria-label="Start recording"
                  >
                    <Mic className="w-8 h-8" />
                  </button>
                  <div>
                    <div className="text-sm font-bold text-stone-900">
                      {t.recordVoice}
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      Speak freely in Hindi, English, or your regional mother tongue
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Actual Transcript Display with [Edit Transcript] */}
              {voiceTranscript && !isRecording && (
                <div className="w-full bg-white p-3 rounded-xl border border-stone-200 text-xs space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#C2410C] uppercase">
                    <span className="flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" /> Spoken Voice Transcript
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                      className="text-stone-600 hover:text-[#C2410C] flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      {isEditingTranscript ? "Cancel" : "Edit Transcript"}
                    </button>
                  </div>

                  {isEditingTranscript ? (
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        value={editedTranscript}
                        onChange={(e) => setEditedTranscript(e.target.value)}
                        className="w-full p-2 text-xs border border-orange-300 rounded-lg focus:ring-1 focus:ring-[#C2410C] text-stone-800"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={handleSaveEditedTranscript}
                          className="px-3 py-1 bg-[#C2410C] text-white rounded-md text-[11px] font-semibold hover:bg-[#9A3412] flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Save Transcript
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-[11px] text-stone-500 mb-0.5">You said:</div>
                      <p className="text-stone-800 italic font-medium bg-[#FAF7F2] p-2 rounded-lg border border-stone-100">
                        &ldquo;{voiceTranscript}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Text Fallback Accordion */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-stone-600 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-stone-400" />
                {t.textFallbackPrompt}
              </label>
              <textarea
                rows={2}
                value={textFallback}
                onChange={(e) => setTextFallback(e.target.value)}
                placeholder={t.textFallbackPlaceholder}
                className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:ring-1 focus:ring-[#C2410C]"
              />
            </div>
          </Card>
        </div>

        {/* Step 4: What AI Understood Pre-Generation Transparent Display */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 craft-border-subtle shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-700">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-serif">
                  Step 4: What AI Understood
                </h3>
                <p className="text-[11px] text-stone-500">
                  Extracted multimodal craft metadata before final listing & heritage generation
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
              Multimodal Pre-Analysis
            </span>
          </div>

          {/* Structured Key-Value Grid Matching Prompt Specification */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <span className="text-stone-500 font-medium block text-[11px]">Craft:</span>
              <strong className="text-stone-900 text-sm">{currentSample.craft}</strong>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <span className="text-stone-500 font-medium block text-[11px]">Region:</span>
              <strong className="text-stone-900 text-sm">{currentSample.region}</strong>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <span className="text-stone-500 font-medium block text-[11px]">Material:</span>
              <strong className="text-stone-900 text-sm">{currentSample.material}</strong>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <span className="text-stone-500 font-medium block text-[11px]">Motif:</span>
              <strong className="text-stone-900 text-sm">{currentSample.motif}</strong>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <span className="text-stone-500 font-medium block text-[11px]">Language:</span>
              <strong className="text-stone-900 text-sm">{currentSample.language}</strong>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
              <span className="text-stone-500 font-medium block text-[11px]">Confidence:</span>
              <strong className="text-emerald-700 text-sm font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {currentSample.confidence}
              </strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Extracted Speech Keywords */}
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-200 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C2410C] flex items-center gap-1">
                <Mic className="w-3 h-3" /> Spoken Keywords Detected:
              </span>
              <div className="flex flex-wrap gap-1">
                {previewKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white text-stone-800 border border-stone-200 text-xs font-medium"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Extracted Visual Features */}
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-stone-200 space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                <Camera className="w-3 h-3" /> Visual Features Detected:
              </span>
              <div className="flex flex-wrap gap-1">
                {previewFeatures.map((feat, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white text-stone-800 border border-stone-200 text-xs font-medium"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* GI Safety Guard Banner */}
          <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-xl flex items-center gap-2 text-xs text-amber-950">
            <Info className="w-4 h-4 text-amber-800 shrink-0" />
            <span>
              <strong>GI Integrity Guard:</strong> AI never invents official registration numbers. Crafts matching official GI clusters are marked as <em>[GI Candidate — Verification Required]</em> until confirmed by stored guild records.
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center pt-2">
          <Button
            size="lg"
            variant="primary"
            onClick={handleGenerateListing}
            isLoading={isProcessing}
            leftIcon={<Sparkles className="w-5 h-5" />}
            className="w-full sm:w-auto px-12 text-lg font-bold min-h-[56px] shadow-lg hover:shadow-xl"
          >
            {isProcessing ? t.analyzingCraft : "Generate Listing & Heritage Profile"}
          </Button>
          <div className="text-xs text-stone-500 mt-2">
            Step 8 will require explicit artisan review & approval before publication
          </div>
        </div>

        {/* Step 5: AI Processing Modal with Exact 6 Progress States */}
        {isProcessing && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-stone-200 space-y-6 text-center">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-orange-100 border-t-[#C2410C] animate-spin" />
                <Sparkles className="w-8 h-8 text-[#C2410C] absolute inset-0 m-auto" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold font-serif text-stone-900">
                  Step 5: Multimodal AI Processing
                </h3>
                <p className="text-xs text-stone-500">
                  Synthesizing product listing and Living Heritage Vault passport
                </p>
              </div>

              {/* 6 Step Checkmark Progress Checklist */}
              <div className="space-y-2.5 text-left bg-stone-50 p-4 rounded-2xl border border-stone-200">
                {PROCESSING_STEPS.map((stepText, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2.5 text-xs font-medium transition-all ${
                        isDone
                          ? "text-emerald-700 font-semibold"
                          : isCurrent
                          ? "text-[#C2410C] font-bold"
                          : "text-stone-400"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 text-[#C2410C] animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
                      )}
                      <span>
                        {isDone ? "✓ " : ""}
                        {stepText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
