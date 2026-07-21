"use client";

import { useEffect } from "react";

export default function SyncMicrosoftProfile() {
  useEffect(() => {
    fetch("/api/sync-microsoft-profile", {
      method: "POST",
    });
  }, []);

  return null;
}