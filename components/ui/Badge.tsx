import React from "react";
import { Sparkles, User, ShieldCheck, AlertCircle, CheckCircle2, XCircle, AlertTriangle, FileText, Database } from "lucide-react";
import { SourceType, VerificationStatus, ProductStatus, GIStatus } from "@/lib/db/schema";
import { useLanguage } from "@/components/providers/LanguageContext";

export type ProvenanceBadgeType =
  | "Artisan Provided"
  | "Artisan Attested"
  | "AI Generated"
  | "AI Suggested"
  | "Verified Source"
  | "GI Registered Craft"
  | "GI Candidate — Verification Required"
  | "Requires Verification"
  | "Demo Data";

interface ProvenanceBadgeProps {
  label: ProvenanceBadgeType | string;
  className?: string;
  size?: "sm" | "md";
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ label, className = "", size = "md" }) => {
  const isSm = size === "sm";
  const sizeClasses = isSm ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  switch (label) {
    case "Artisan Provided":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-medium bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs ${sizeClasses} ${className}`}
          title="Directly shared by the artisan via voice or native input"
        >
          <User className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-amber-700`} />
          <span>Artisan Provided</span>
        </span>
      );

    case "Artisan Attested":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-semibold bg-purple-50 text-purple-900 border border-purple-300 shadow-2xs ${sizeClasses} ${className}`}
          title="This information comes from the artisan's own oral knowledge."
        >
          <User className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-purple-700`} />
          <span>Artisan Attested</span>
        </span>
      );

    case "AI Generated":
    case "AI Suggested":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-medium bg-indigo-50 text-indigo-900 border border-indigo-200 shadow-2xs ${sizeClasses} ${className}`}
          title="Synthesized or inferred by Multimodal AI — requires artisan review"
        >
          <Sparkles className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-indigo-600`} />
          <span>{label}</span>
        </span>
      );

    case "Verified Source":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-semibold bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs ${sizeClasses} ${className}`}
          title="Backed by verified cultural documentation or government artisan guild records"
        >
          <ShieldCheck className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-emerald-700`} />
          <span>Verified Source</span>
        </span>
      );

    case "GI Registered Craft":
    case "GI-Registered Craft":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-bold bg-emerald-700 text-white shadow-2xs ${sizeClasses} ${className}`}
          title="Officially recognized craft cluster with Geographical Indication registration"
        >
          <ShieldCheck className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-emerald-200`} />
          <span>GI-Registered Craft</span>
        </span>
      );

    case "GI Information Available":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-semibold bg-sky-50 text-sky-900 border border-sky-300 shadow-2xs ${sizeClasses} ${className}`}
          title="Geographical and historical lineage documented from official craft gazetteers"
        >
          <FileText className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-sky-700`} />
          <span>GI Information Available</span>
        </span>
      );

    case "GI Verification Pending":
    case "GI Candidate — Verification Required":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-semibold bg-amber-100 text-amber-950 border border-amber-400 shadow-2xs ${sizeClasses} ${className}`}
          title="Craft community matches geo-cluster; artisan-level GI certification requires verification"
        >
          <AlertTriangle className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-amber-800`} />
          <span>GI Verification Pending</span>
        </span>
      );

    case "Requires Verification":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-medium bg-rose-50 text-rose-900 border border-rose-200 shadow-2xs ${sizeClasses} ${className}`}
          title="Preliminary claim pending review and field verification"
        >
          <AlertCircle className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-rose-600`} />
          <span>Requires Verification</span>
        </span>
      );

    case "Demo Data":
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-medium bg-stone-100 text-stone-700 border border-stone-300 shadow-2xs ${sizeClasses} ${className}`}
          title="Simulated evaluation record for SIH demonstration"
        >
          <Database className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} text-stone-500`} />
          <span>Demo Data</span>
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-medium bg-stone-100 text-stone-700 border border-stone-200 ${sizeClasses} ${className}`}
        >
          <span>{label}</span>
        </span>
      );
  }
};

export const AIReviewDisclaimer: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2 ${className}`}>
    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
    <span>
      <strong>AI Transparency:</strong> AI suggestions are reviewed by the artisan. Cultural claims are not treated as verified without source evidence.
    </span>
  </div>
);

// Backwards-compatible SourceTypeBadge
export const SourceTypeBadge: React.FC<{ sourceType: SourceType | string; className?: string }> = ({
  sourceType,
  className = "",
}) => {
  if (sourceType === "artisan") {
    return <ProvenanceBadge label="Artisan Provided" className={className} />;
  }
  if (sourceType === "official") {
    return <ProvenanceBadge label="Verified Source" className={className} />;
  }
  return <ProvenanceBadge label="AI Suggested" className={className} />;
};

// Backwards-compatible VerificationBadge
export const VerificationBadge: React.FC<{ status: VerificationStatus | string; className?: string }> = ({
  status,
  className = "",
}) => {
  const { t } = useLanguage();

  if (status === "verified") {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-green-100 text-green-800 border border-green-200 ${className}`}>
        <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
        <span>{t.statusVerified || "Verified Source"}</span>
      </span>
    );
  }

  if (status === "requires_verification") {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400 ${className}`}>
        <AlertTriangle className="w-3.5 h-3.5 text-amber-800" />
        <span>Requires Verification</span>
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800 border border-red-200 ${className}`}>
        <XCircle className="w-3.5 h-3.5 text-red-700" />
        <span>{t.statusRejected || "Rejected"}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200 ${className}`}>
      <AlertCircle className="w-3.5 h-3.5 text-stone-500" />
      <span>{t.statusUnverified || "Unverified"}</span>
    </span>
  );
};

// Updated GICandidacyBadge with no fake registration numbers
interface GICandidacyBadgeProps {
  status: GIStatus | "candidate_unverified" | "applied" | "registered_verified" | string;
  registryNumber?: string | null;
  demoReference?: string | null;
  className?: string;
}

export const GICandidacyBadge: React.FC<GICandidacyBadgeProps> = ({
  status,
  registryNumber,
  demoReference,
  className = "",
}) => {
  if (status === "registered_verified" || status === "gi_registered") {
    const refText = registryNumber
      ? `GI Registration Verified`
      : demoReference && !demoReference.includes("#")
      ? demoReference
      : "GI-Registered Craft";

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-700 text-white shadow-2xs ${className}`}
        title="Officially recognized Geographical Indication craft"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
        <span>{refText}</span>
      </span>
    );
  }

  if (status === "candidate_unverified" || status === "gi_candidate_unverified") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs ${className}`}
        title="Candidate craft community; artisan GI verification pending"
      >
        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
        <span>GI Verification Pending</span>
      </span>
    );
  }

  if (status === "applied" || status === "gi_applied") {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200 ${className}`}
      >
        <FileText className="w-3.5 h-3.5 text-blue-600" />
        <span>GI Information Available</span>
      </span>
    );
  }

  return null;
};

// Updated ProductStatusBadge with strict approval lifecycle
interface ProductStatusBadgeProps {
  status: ProductStatus | string;
  className?: string;
}

export const ProductStatusBadge: React.FC<ProductStatusBadgeProps> = ({ status, className = "" }) => {
  const styles: Record<string, { bg: string; label: string }> = {
    draft: { bg: "bg-stone-100 text-stone-700 border-stone-200", label: "Draft" },
    ai_generated: { bg: "bg-indigo-50 text-indigo-800 border-indigo-200", label: "AI Generated" },
    artisan_review: { bg: "bg-amber-100 text-amber-900 border-amber-300", label: "Awaiting Artisan Approval" },
    artisan_edited: { bg: "bg-sky-50 text-sky-800 border-sky-200", label: "Artisan Edited" },
    approved: { bg: "bg-emerald-50 text-emerald-800 border-emerald-300", label: "Artisan Approved" },
    published: { bg: "bg-emerald-100 text-emerald-900 border-emerald-400 font-semibold", label: "Catalogue Ready" },
    archived: { bg: "bg-stone-100 text-stone-600 border-stone-200", label: "Archived" },
  };

  const item = styles[status] || styles.draft;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.bg} ${className}`}
    >
      {item.label}
    </span>
  );
};
