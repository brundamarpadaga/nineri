"use client";

import { useState } from "react";
import { EMAIL } from "@/lib/site";
import { IconCopy } from "./icons";

export function CopyEmail() {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      const el = document.getElementById("join-email");
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const s = window.getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
    }
  }

  return (
    <span className="copy-email">
      <a id="join-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <button type="button" id="copy-email" className="copy-btn" onClick={copy} aria-label="Copy email address">
        <IconCopy size={16} />
        <span>{done ? "Copied" : "Copy"}</span>
      </button>
    </span>
  );
}
