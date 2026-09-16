"use client";

import React, { useState } from "react";
import { Share2, Check, Copy, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return url || window.location.href;
    }
    return url || "https://asaanshaadi.com/blog";
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnWhatsApp = () => {
    const shareUrl = getShareUrl();
    const message = encodeURIComponent(`${title}\n\nRead on Asaan Shaadi: ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  };

  const shareOnTwitter = () => {
    const shareUrl = getShareUrl();
    const text = encodeURIComponent(`"${title}" — Matrimonial guidance on Asaan Shaadi`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  return (
    <div className="flex items-center flex-wrap gap-2">
      <span className="text-xs text-stone-400 font-sans-modern hidden sm:inline-flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5 text-[#b9965b]" />
        Share:
      </span>

      {/* WhatsApp */}
      <button
        type="button"
        onClick={shareOnWhatsApp}
        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] text-[11px] sm:text-xs transition-colors"
        title="Share on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>

      {/* Twitter / X */}
      <button
        type="button"
        onClick={shareOnTwitter}
        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 text-[11px] sm:text-xs transition-colors"
        title="Share on X (Twitter)"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X / Twitter</span>
      </button>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#b9965b]/15 hover:bg-[#b9965b]/25 border border-[#b9965b]/30 text-[#e5d2b0] text-[11px] sm:text-xs transition-colors"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};
