import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import "./index.css";
import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";

// Set favicon - deferred to avoid blocking render
import logoUrl from "./assets/logo.jpeg";

function setFavicon(href: string) {
  const head = document.getElementsByTagName("head")[0];
  let link: HTMLLinkElement | null = head.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    head.appendChild(link);
  }
  link.type = "image/jpeg";
  link.href = href;
}

// Defer favicon setting to after first paint
requestAnimationFrame(() => {
  setFavicon(`${logoUrl}?v=${Date.now()}`);
});

const appElement = (
  <BrowserRouter>
    <HelmetProvider>
      <AnalyticsProvider>
        <App />
      </AnalyticsProvider>
    </HelmetProvider>
  </BrowserRouter>
);

const container = document.getElementById("root")!;

if (container.hasChildNodes()) {
  hydrateRoot(container, appElement);
} else {
  createRoot(container).render(appElement);
}
