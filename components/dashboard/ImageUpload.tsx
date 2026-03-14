"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB.");
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(10);

    try {
      // 1. Get signed upload params from our API
      const sigRes = await fetch("/api/upload", { method: "POST" });
      if (!sigRes.ok) throw new Error("Failed to get upload signature");
      const { signature, timestamp, folder, cloudName, apiKey } = await sigRes.json();

      setProgress(30);

      // 2. Upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      if (!uploadRes.ok) throw new Error("Upload to Cloudinary failed");

      setProgress(90);
      const data = await uploadRes.json();
      onChange(data.secure_url);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  };

  return (
    <div>
      {/* Preview */}
      {value && (
        <div style={{ marginBottom: "12px", position: "relative" }}>
          <img
            src={value}
            alt="Featured"
            style={{ width: "100%", maxHeight: "220px", objectFit: "cover", borderRadius: "6px", border: "1px solid #e8e6e1" }}
          />
          <button
            onClick={() => onChange("")}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "rgba(26,26,24,0.8)",
              color: "#faf9f7",
              cursor: "pointer",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Drop zone */}
      {!value && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          style={{
            border: "2px dashed #e8e6e1",
            borderRadius: "6px",
            padding: "32px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#faf9f7",
            transition: "border-color 0.15s ease",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🖼</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", color: "#6b6b67", marginBottom: "4px" }}>
            Drop an image here, or click to browse
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.775rem", color: "#9b9b97" }}>
            JPG, PNG, WebP — max 10 MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />

      {/* Progress bar */}
      {uploading && (
        <div style={{ marginTop: "10px", height: "3px", backgroundColor: "#e8e6e1", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#1a1a18", transition: "width 0.3s ease" }} />
        </div>
      )}

      {error && (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#eb5757", marginTop: "8px" }}>{error}</p>
      )}

      {/* Or paste URL */}
      <div style={{ marginTop: "12px" }}>
        <input
          type="url"
          placeholder="Or paste an image URL..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "9px 14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            color: "#1a1a18",
            border: "1px solid #e8e6e1",
            borderRadius: "6px",
            outline: "none",
            backgroundColor: "#fff",
          }}
        />
      </div>
    </div>
  );
}
