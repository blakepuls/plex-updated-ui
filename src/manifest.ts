import type { Manifest } from "webextension-polyfill";
import pkg from "../package.json";

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: pkg.displayName,
  version: pkg.version,
  description: pkg.description,
  // options_ui: {
  //   page: "src/pages/options/index.html",
  // },
  background: {
    service_worker: "src/pages/background/index.js",
    type: "module",
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png",
  },
  icons: {
    "128": "icon-128.png",
  },
  permissions: ["activeTab", "storage"],
  content_scripts: [
    // {
    //   // Matches any domain with the Plex port 32400, for both HTTP and HTTPS
    //   matches: ["http://*:*32400/*", "https://*:*32400/*"],
    //   js: ["src/pages/content/index.js"],
    //   css: ["contentStyle.css"],
    // },
    {
      // Matches Plex web app
      matches: ["https://app.plex.tv/*"],
      js: ["src/pages/content/index.js"],
      css: ["contentStyle.css"],
    },
  ],
  // devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-34.png"],
      matches: [],
    },
  ],
};

export default manifest;
