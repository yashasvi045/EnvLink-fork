
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Service Worker Registration for PWA
if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("✅ Service Worker registered successfully:", registration.scope);

      // Check for updates periodically
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New version available
              const shouldUpdate = window.confirm(
                "🎉 New version available! Would you like to update now?"
              );
              if (shouldUpdate) {
                window.location.reload();
              }
            }
          });
        }
      });
    } catch (error) {
      console.error("❌ Service Worker registration failed:", error);
    }
  });
}

// Performance monitoring
if (process.env.NODE_ENV === "development") {
  console.log("🚀 AirGuard - Development Mode");
}

// Error boundary for uncaught errors
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

// Render app
const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  