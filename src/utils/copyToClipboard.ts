"use client";

import { toast } from "sonner";

export default async function copyToClipboard(textToCopy: string) {
  try {
    if (window.isSecureContext && navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);

      setTimeout(() => {
        toast.success("Copied to clipboard!");
      }, 0);
    } else {
      toast.error("Unable to copy because of unsecure origin: HTTP");
    }
  } catch (err) {
    console.error("Failed to copy text:", err);
  }
}
