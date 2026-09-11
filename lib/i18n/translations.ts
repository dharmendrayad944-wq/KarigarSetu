export type Language = "en" | "hi";

export interface Translations {
  appName: string;
  tagline: string;
  heroSubtitle: string;
  startSelling: string;
  exploreCatalogue: string;
  demoModeBadge: string;
  
  // Pillars
  pillarAccessTitle: string;
  pillarAccessDesc: string;
  pillarIncomeTitle: string;
  pillarIncomeDesc: string;
  pillarHeritageTitle: string;
  pillarHeritageDesc: string;

  // Nav
  navHome: string;
  navDashboard: string;
  navCatalogue: string;
  navVault: string;
  navAddProduct: string;
  navLogout: string;
  navLogin: string;

  // Dashboard
  dashboardTitle: string;
  dashboardSubtitle: string;
  statProductsListed: string;
  statProductsSold: string;
  statEstimatedRevenue: string;
  statHeritageVerified: string;
  recentProducts: string;
  noProductsYet: string;
  noProductsAction: string;

  // Add Product
  addProductTitle: string;
  addProductSubtitle: string;
  stepPhotoTitle: string;
  stepPhotoDesc: string;
  stepVoiceTitle: string;
  stepVoiceDesc: string;
  chooseSamplePhoto: string;
  clickToUpload: string;
  orDragDrop: string;
  recordVoice: string;
  recordingInProgress: string;
  stopRecording: string;
  voiceRecorded: string;
  rerecord: string;
  textFallbackPrompt: string;
  textFallbackPlaceholder: string;
  generateListingButton: string;
  analyzingCraft: string;

  // AI Understanding
  aiUnderstandingTitle: string;
  aiUnderstandingSubtitle: string;

  // AI Review
  aiReviewTitle: string;
  aiReviewSubtitle: string;
  aiInferredBanner: string;
  fieldTitle: string;
  fieldDescription: string;
  fieldCategory: string;
  fieldCraft: string;
  fieldRegion: string;
  fieldMaterials: string;
  fieldMotifs: string;
  fieldPriceRange: string;
  pricingRationaleTitle: string;
  pricingRationaleSubtitle: string;
  fieldArtisanStory: string;
  fieldHeritageProfile: string;
  fieldTechnique: string;
  fieldSignificance: string;
  
  // Buttons
  btnSaveDraft: string;
  btnRegenerate: string;
  btnApprovePublish: string;
  btnPublishSuccess: string;
  exportOndcBtn: string;

  // Verification & Heritage
  provenanceTitle: string;
  artisanProvided: string;
  aiInferred: string;
  verifiedOfficial: string;
  requiresVerification: string;
  statusUnverified: string;
  statusVerified: string;
  statusRejected: string;
  giTagLabel: string;
  giRegistered: string;
  giCandidate: string;
  odopTagLabel: string;

  // Heritage Vault
  vaultTitle: string;
  vaultSubtitle: string;

  // Catalogue
  catalogueTitle: string;
  catalogueSubtitle: string;
  searchPlaceholder: string;
  allCategories: string;
  allRegions: string;
  filterByCraft: string;
  filterByState: string;
  priceEstimate: string;
  viewHeritage: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "KarigarSetu",
    tagline: "Your craft. Your voice. Your digital marketplace.",
    heroSubtitle: "An AI onboarding companion for India's artisans. Speak in your own language to create market-ready listings and preserve your craft in the National Digital Heritage Vault.",
    startSelling: "Start AI Onboarding",
    exploreCatalogue: "Explore Market Catalogue",
    demoModeBadge: "Demo AI Active",

    pillarAccessTitle: "Voice-First AI Access",
    pillarAccessDesc: "No complex forms or English required. Simply speak in your mother tongue and upload a picture of your creation to generate a listing.",
    pillarIncomeTitle: "Transparent Fair Pricing",
    pillarIncomeDesc: "Transparent AI algorithm calculates fair price ranges based on raw material costs, handcrafting hours, and fair living wage standards.",
    pillarHeritageTitle: "Verified Heritage Vault",
    pillarHeritageDesc: "Every product gets a digital heritage passport with GI provenance and technique documentation you own.",

    navHome: "Home",
    navDashboard: "Artisan Studio",
    navCatalogue: "Market Listings",
    navVault: "Heritage Vault",
    navAddProduct: "Add Product",
    navLogout: "Sign Out",
    navLogin: "Artisan Sign In",

    dashboardTitle: "Namaste, Artisan Sathi",
    dashboardSubtitle: "Manage your craft listings, inspect AI understanding, and safeguard your heritage in the national vault.",
    statProductsListed: "Products Onboarded",
    statProductsSold: "External Market Inquiries",
    statEstimatedRevenue: "Artisan Value Generated",
    statHeritageVerified: "Verified Heritage Records",
    recentProducts: "Your Craft Catalog & Heritage Records",
    noProductsYet: "You have not listed any crafts yet.",
    noProductsAction: "List your first handcrafted item now with voice!",

    addProductTitle: "AI Artisan Onboarding",
    addProductSubtitle: "Just take a photo and tell us its story in your own voice. Our AI listens, extracts craft features, and prepares your listing.",
    stepPhotoTitle: "1. Product Photograph",
    stepPhotoDesc: "Capture or upload a clear photo of your handcrafted item.",
    stepVoiceTitle: "2. Spoken Voice Story",
    stepVoiceDesc: "Speak naturally about the materials, purpose, technique, and your family lineage.",
    chooseSamplePhoto: "Or choose an authentic craft sample to test:",
    clickToUpload: "Click or tap to upload photo",
    orDragDrop: "PNG, JPG, or WebP up to 10MB",
    recordVoice: "Tap to Speak & Record",
    recordingInProgress: "Listening... Speak about your craft",
    stopRecording: "Stop Recording",
    voiceRecorded: "Voice recording captured! Ready for AI processing.",
    rerecord: "Record Again",
    textFallbackPrompt: "Prefer to write or paste instead? (Optional fallback)",
    textFallbackPlaceholder: "e.g. This is a handmade brass Dokra bell metal figurine of an elephant, made using the lost wax method in Bastar...",
    generateListingButton: "Analyze Craft with Multimodal AI",
    analyzingCraft: "Transcribing speech & analyzing visual craft morphology...",

    aiUnderstandingTitle: "What the AI Understood",
    aiUnderstandingSubtitle: "Review acoustic keywords and visual craft features extracted from your voice and photo before finalizing.",

    aiReviewTitle: "Review AI Generated Listing & Heritage Profile",
    aiReviewSubtitle: "Check the AI analysis. All AI suggestions are marked below. You retain 100% control to edit, verify, or decline any claim.",
    aiInferredBanner: "AI suggestions are clearly tagged below. Unverified cultural claims require your confirmation before publication.",
    fieldTitle: "Product Title",
    fieldDescription: "Story & Description",
    fieldCategory: "Craft Category",
    fieldCraft: "Traditional Craft Name",
    fieldRegion: "State & District",
    fieldMaterials: "Materials Used",
    fieldMotifs: "Motifs & Symbols",
    fieldPriceRange: "Suggested Fair Price Range (₹)",
    pricingRationaleTitle: "AI Fair Price Rationale Breakdown",
    pricingRationaleSubtitle: "Transparent calculation based on materials, craft hours, and fair living wages",
    fieldArtisanStory: "Artisan Legacy & Story",
    fieldHeritageProfile: "Digital Heritage Profile",
    fieldTechnique: "Traditional Technique",
    fieldSignificance: "Cultural Significance",

    btnSaveDraft: "Save as Draft",
    btnRegenerate: "Regenerate with AI",
    btnApprovePublish: "Approve & Publish to Vault & Market",
    btnPublishSuccess: "Product Approved & Onboarded to Heritage Vault!",
    exportOndcBtn: "Export to ONDC & Marketplaces",

    provenanceTitle: "Heritage Provenance & Verification Audit",
    artisanProvided: "Artisan-Provided",
    aiInferred: "AI-Inferred",
    verifiedOfficial: "Verified Official",
    requiresVerification: "Requires Verification",
    statusUnverified: "Unverified Claim",
    statusVerified: "Verified Heritage",
    statusRejected: "Flagged",
    giTagLabel: "Geographical Indication (GI)",
    giRegistered: "GI Registered (Verified)",
    giCandidate: "GI Candidate (Requires Verification)",
    odopTagLabel: "One District One Product (ODOP)",

    vaultTitle: "National Living Heritage Vault",
    vaultSubtitle: "A verified institutional repository preserving India's indigenous craft traditions, generational lineage, and living craft blueprints.",

    catalogueTitle: "Marketplace-Ready Craft Catalogue",
    catalogueSubtitle: "Authentic, artisan-approved listings structured for export to national digital commerce networks (ONDC, GeM, Etsy).",
    searchPlaceholder: "Search crafts, materials, regions, or artisans...",
    allCategories: "All Craft Categories",
    allRegions: "All States & Regions",
    filterByCraft: "Filter by Craft",
    filterByState: "Filter by State",
    priceEstimate: "Fair Price Estimate",
    viewHeritage: "View Heritage Passport",
  },
  hi: {
    appName: "कारीगर सेतु",
    tagline: "आपका शिल्प। आपकी आवाज़। आपका डिजिटल बाज़ार।",
    heroSubtitle: "भारतीय कारीगरों के लिए AI डिजिटल साथी। अपनी भाषा में बोलकर बाज़ार-तैयार लिस्टिंग बनाएं और राष्ट्रीय धरोहर संग्रहालय में अपनी कला को संरक्षित करें।",
    startSelling: "AI ऑनबोर्डिंग शुरू करें",
    exploreCatalogue: "बाज़ार कैटलॉग देखें",
    demoModeBadge: "डेमो AI सक्रिय",

    pillarAccessTitle: "आवाज़-आधारित AI पहुँच",
    pillarAccessDesc: "कोई जटिल फॉर्म या अंग्रेजी की आवश्यकता नहीं। बस अपनी मातृभाषा में बोलें और अपने शिल्प की फोटो खींचें।",
    pillarIncomeTitle: "पारदर्शी उचित मूल्य",
    pillarIncomeDesc: "पारदर्शी AI एल्गोरिदम कच्ची सामग्री की लागत, हस्तशिल्प के घंटे और उचित जीवन निर्वाह पारिश्रमिक के आधार पर मूल्य तय करता है।",
    pillarHeritageTitle: "प्रमाणित धरोहर संग्रहालय",
    pillarHeritageDesc: "प्रत्येक उत्पाद को एक डिजिटल धरोहर पासपोर्ट मिलता है जिसमें GI प्रमाणीकरण और पारंपरिक तकनीक का विवरण सुरक्षित रहता है।",

    navHome: "मुख्य पृष्ठ",
    navDashboard: "कारीगर स्टूडियो",
    navCatalogue: "बाज़ार लिस्टिंग",
    navVault: "धरोहर संग्रहालय",
    navAddProduct: "नया उत्पाद जोड़ें",
    navLogout: "लॉग आउट",
    navLogin: "कारीगर प्रवेश",

    dashboardTitle: "नमस्ते, शिल्पकार साथी",
    dashboardSubtitle: "अपने शिल्प उत्पादों का प्रबंधन करें, AI समझ जांचें और राष्ट्रीय धरोहर संग्रहालय में अपनी विरासत सुरक्षित करें।",
    statProductsListed: "कुल ऑनबोर्ड उत्पाद",
    statProductsSold: "बाज़ार पूछताछ",
    statEstimatedRevenue: "सृजित कारीगर मूल्य",
    statHeritageVerified: "प्रमाणित धरोहर रिकॉर्ड",
    recentProducts: "आपकी शिल्प सूची एवं धरोहर रिकॉर्ड",
    noProductsYet: "आपने अभी तक कोई उत्पाद सूचीबद्ध नहीं किया है।",
    noProductsAction: "अपनी आवाज़ से अभी पहला उत्पाद जोड़ें!",

    addProductTitle: "AI कारीगर ऑनबोर्डिंग",
    addProductSubtitle: "बस एक फोटो खींचें और अपनी आवाज़ में इसकी कहानी बताएं। AI सुनकर आपकी कला की विशेषताएं निकालता है।",
    stepPhotoTitle: "१. उत्पाद की तस्वीर",
    stepPhotoDesc: "अपने हाथ से बने उत्पाद की स्पष्ट फोटो लें या अपलोड करें।",
    stepVoiceTitle: "२. बोलकर बताएं (आवाज़)",
    stepVoiceDesc: "सामग्री, उपयोग, तकनीक और अपने परिवार की परंपरा के बारे में स्वाभाविक रूप से बोलें।",
    chooseSamplePhoto: "या त्वरित परीक्षण के लिए नमूना चुनें:",
    clickToUpload: "फोटो अपलोड करने के लिए टैप करें",
    orDragDrop: "PNG, JPG या WebP (10MB तक)",
    recordVoice: "बोलने के लिए माइक दबाएं",
    recordingInProgress: "सुन रहे हैं... अपने शिल्प के बारे में बोलें",
    stopRecording: "रिकॉर्डिंग रोकें",
    voiceRecorded: "आवाज़ रिकॉर्ड हो गई! AI विश्लेषण के लिए तैयार।",
    rerecord: "फिर से रिकॉर्ड करें",
    textFallbackPrompt: "लिखना या पेस्ट करना चाहते हैं? (वैकल्पिक)",
    textFallbackPlaceholder: "उदा. यह बस्तर की पारंपरिक ढोकरा घंटी धातु से बनी हाथी की मूर्ति है, जिसे लॉस्ट-वैक्स विधि से बनाया गया है...",
    generateListingButton: "मल्टीमॉडल AI से शिल्प का विश्लेषण करें",
    analyzingCraft: "वाणी का प्रतिलेखन एवं शिल्प संरचना का विश्लेषण जारी है...",

    aiUnderstandingTitle: "AI ने क्या समझा (अवलोकन)",
    aiUnderstandingSubtitle: "अंतिम रूप देने से पहले अपनी आवाज़ और फोटो से निकाले गए मुख्य शब्दों और दृश्य विशेषताओं की समीक्षा करें।",

    aiReviewTitle: "AI विश्लेषण एवं धरोहर प्रोफ़ाइल की समीक्षा",
    aiReviewSubtitle: "विवरण जांचें। AI द्वारा सुझाए गए सभी विवरण नीचे स्पष्ट रूप से चिह्नित हैं। आपके पास बदलने और सत्यापित करने का पूरा अधिकार है।",
    aiInferredBanner: "AI सुझाव नीचे चिह्नित हैं। अप्रमाणित सांस्कृतिक दावों को प्रकाशित करने से पहले आपकी पुष्टि आवश्यक है।",
    fieldTitle: "उत्पाद का नाम / शीर्षक",
    fieldDescription: "कहानी और विवरण",
    fieldCategory: "शिल्प श्रेणी",
    fieldCraft: "पारंपरिक शिल्प का नाम",
    fieldRegion: "राज्य और जिला",
    fieldMaterials: "प्रयुक्त सामग्री",
    fieldMotifs: "प्रतीक / रूपांकन",
    fieldPriceRange: "उचित अनुमानित मूल्य सीमा (₹)",
    pricingRationaleTitle: "AI उचित मूल्य निर्धारण का पारदर्शी विवरण",
    pricingRationaleSubtitle: "सामग्री लागत, निर्माण के घंटे और उचित दैनिक पारिश्रमिक पर आधारित गणना",
    fieldArtisanStory: "कारीगर की परंपरा और कहानी",
    fieldHeritageProfile: "डिजिटल धरोहर प्रोफ़ाइल",
    fieldTechnique: "पारंपरिक निर्माण तकनीक",
    fieldSignificance: "सांस्कृतिक महत्व",

    btnSaveDraft: "ड्राफ्ट सहेजें",
    btnRegenerate: "पुनः AI से बनाएं",
    btnApprovePublish: "स्वीकृत करें और संग्रहालय में प्रकाशित करें",
    btnPublishSuccess: "उत्पाद स्वीकृत होकर धरोहर संग्रहालय में प्रकाशित हुआ!",
    exportOndcBtn: "ONDC और डिजिटल बाज़ारों में निर्यात करें",

    provenanceTitle: "धरोहर स्रोत और सत्यापन ऑडिट",
    artisanProvided: "कारीगर द्वारा बताया गया",
    aiInferred: "AI द्वारा अनुमानित",
    verifiedOfficial: "प्रमाणित आधिकारिक",
    requiresVerification: "सत्यापन अपेक्षित",
    statusUnverified: "अप्रमाणित दावा",
    statusVerified: "प्रमाणित धरोहर",
    statusRejected: "पुनर्विचार आवश्यक",
    giTagLabel: "भौगोलिक संकेतक (GI)",
    giRegistered: "GI पंजीकृत (प्रमाणित)",
    giCandidate: "GI संभावित (सत्यापन अपेक्षित)",
    odopTagLabel: "एक जिला एक उत्पाद (ODOP)",

    vaultTitle: "राष्ट्रीय जीवंत धरोहर संग्रहालय",
    vaultSubtitle: "भारत की पारंपरिक शिल्प कलाओं, पुश्तैनी ज्ञान और निर्माण विधियों को समर्पित संस्थागत पुरालेख।",

    catalogueTitle: "बाज़ार-तैयार शिल्प कैटलॉग",
    catalogueSubtitle: "ONDC, GeM और ई-कॉमर्स प्लेटफॉर्म्स पर निर्यात के लिए तैयार कारीगर-स्वीकृत प्रामाणिक हस्तशिल्प।",
    searchPlaceholder: "शिल्प, सामग्री, राज्य या कारीगर खोजें...",
    allCategories: "सभी शिल्प श्रेणियां",
    allRegions: "सभी राज्य एवं क्षेत्र",
    filterByCraft: "शिल्प अनुसार",
    filterByState: "राज्य अनुसार",
    priceEstimate: "उचित मूल्य अनुमान",
    viewHeritage: "धरोहर पासपोर्ट देखें",
  },
};
