import React from "react";

export function renderMultiline(text: string, className?: string): React.ReactElement[] {
  const lines = text.split("\n").filter((line) => line.trim() !== "");
  return lines.map((line, i) => (
    <p key={i} className={[i < lines.length - 1 ? "mb-4" : "", className].filter(Boolean).join(" ") || undefined}>
      {line}
    </p>
  ));
}
